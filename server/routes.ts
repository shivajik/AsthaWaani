import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { YouTubeService } from "./youtube.service";
import { insertYoutubeChannelSchema, insertVideoSchema, insertContactInfoSchema, insertCategorySchema, insertOfferingSchema, insertNewsTickerSchema, insertMediaSchema, insertPageSchema, insertAdSchema, insertVaktaApplicationSchema } from "@shared/schema";
import multer from "multer";
import { uploadToCloudinary, deleteFromCloudinary } from "./cloudinary.service";
import { sendContactFormNotification, sendVaktaApplicationNotification } from "./email.service";
import rateLimit from "express-rate-limit";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  const upload = multer({ storage: multer.memoryStorage() });
  
  // Rate limiting for contact form
  const contactRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 requests per hour
    message: "Too many contact form submissions, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Media Upload endpoint (for admin)
  app.post("/api/cms/media/upload", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
      }

      const uploadResponse = await uploadToCloudinary(
        req.file.buffer,
        req.file.originalname
      );

      const mediaItem = await storage.createMedia({
        publicId: uploadResponse.public_id,
        url: uploadResponse.url,
        secureUrl: uploadResponse.secure_url,
        filename: req.file.originalname,
        format: uploadResponse.format,
        width: uploadResponse.width,
        height: uploadResponse.height,
        bytes: uploadResponse.bytes,
        altText: "",
        uploadedBy: undefined,
      });

      res.json(mediaItem);
    } catch (error) {
      console.error("Error uploading media:", error);
      res.status(500).json({ error: "Failed to upload media" });
    }
  });

  // Get all media (admin)
  app.get("/api/cms/media", async (req, res) => {
    try {
      const allMedia = await storage.getAllMedia();
      res.json(allMedia);
    } catch (error) {
      console.error("Error fetching media:", error);
      res.status(500).json({ error: "Failed to fetch media" });
    }
  });

  // Delete media (admin)
  app.delete("/api/cms/media/:id", async (req, res) => {
    try {
      const media = await storage.getMedia(req.params.id);
      if (!media) {
        return res.status(404).json({ error: "Media not found" });
      }

      await deleteFromCloudinary(media.publicId);
      await storage.deleteMedia(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting media:", error);
      res.status(500).json({ error: "Failed to delete media" });
    }
  });

  // Delete from Cloudinary directly (for replacing images)
  app.post("/api/cms/media/delete-cloudinary", async (req, res) => {
    try {
      const { publicId } = req.body;
      if (!publicId) {
        return res.status(400).json({ error: "Missing publicId" });
      }
      await deleteFromCloudinary(publicId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting from Cloudinary:", error);
      res.status(500).json({ error: "Failed to delete image" });
    }
  });

  // Contact Form API
  app.post("/api/contact", contactRateLimit, async (req: any, res: any) => {
    try {
      const { name, email, subject, message, phone } = req.body;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Validate field lengths
      if (name.length > 100 || email.length > 200 || subject.length > 200 || message.length > 2000) {
        return res.status(400).json({ error: "Input exceeds maximum allowed length" });
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      // Save contact to database
      try {
        await storage.createContact({ name, email, phone: phone || "", subject, message });
      } catch (dbError) {
        console.error("Error saving contact to database:", dbError);
      }

      // Check if email service is configured
      if (!process.env.EMAIL || !process.env.PASS) {
        console.error("Email service not configured");
        return res.status(500).json({ error: "Email service is not currently available. Please try again later." });
      }

      // Send email notification to admin
      await sendContactFormNotification(name, email, subject, message, phone);

      res.json({
        success: true,
        message: "Your message has been sent successfully. We will get back to you soon!",
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
  });

  // Get all contacts (admin endpoint)
  app.get("/api/cms/contacts", async (req, res) => {
    try {
      const allContacts = await storage.getAllContacts();
      res.json(allContacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Delete contact (admin endpoint)
  app.delete("/api/cms/contacts/:id", async (req, res) => {
    try {
      await storage.deleteContact(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ error: "Failed to delete contact" });
    }
  });

  // Delete category (admin endpoint)
  app.delete("/api/cms/categories/:id", async (req, res) => {
    try {
      await storage.deleteCategory(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Error deleting category:", error);
      
      // Check if it's a foreign key constraint error
      if (error.message?.includes("violates foreign key constraint") || 
          error.code === "23503" ||
          error.message?.includes("categoryId")) {
        return res.status(409).json({ 
          error: "This category cannot be deleted as it is already used in some blogs. First delete those blogs, then delete this category." 
        });
      }
      
      res.status(500).json({ error: "Failed to delete category" });
    }
  });

  // Page Management Routes
  app.get("/api/cms/pages", async (req, res) => {
    try {
      const pages = await storage.getAllPages();
      res.json(pages);
    } catch (error) {
      console.error("Error fetching pages:", error);
      res.status(500).json({ error: "Failed to fetch pages" });
    }
  });

  app.get("/api/pages/:slug", async (req, res) => {
    try {
      const page = await storage.getPageBySlug(req.params.slug);
      if (!page || !page.isPublished) {
        return res.status(404).json({ error: "Page not found" });
      }
      res.json(page);
    } catch (error) {
      console.error("Error fetching page:", error);
      res.status(500).json({ error: "Failed to fetch page" });
    }
  });

  app.post("/api/cms/pages", async (req, res) => {
    try {
      const data = insertPageSchema.parse(req.body);
      const existing = await storage.getPageBySlug(data.slug);
      if (existing) {
        return res.status(400).json({ error: "A page with this slug already exists" });
      }
      const page = await storage.createPage(data);
      res.json(page);
    } catch (error: any) {
      console.error("Error creating page:", error);
      res.status(400).json({ error: error.message || "Failed to create page" });
    }
  });

  app.put("/api/cms/pages/:id", async (req, res) => {
    try {
      const data = insertPageSchema.partial().parse(req.body);
      if (data.slug) {
        const existing = await storage.getPageBySlug(data.slug);
        if (existing && existing.id !== req.params.id) {
          return res.status(400).json({ error: "A page with this slug already exists" });
        }
      }
      const page = await storage.updatePage(req.params.id, data);
      res.json(page);
    } catch (error: any) {
      console.error("Error updating page:", error);
      res.status(400).json({ error: error.message || "Failed to update page" });
    }
  });

  app.delete("/api/cms/pages/:id", async (req, res) => {
    try {
      await storage.deletePage(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting page:", error);
      res.status(500).json({ error: "Failed to delete page" });
    }
  });

  // Get all videos from database
  app.get("/api/videos", async (req, res) => {
    try {
      const videos = await storage.getAllVideos();
      res.json(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  // News Ticker routes
  app.get("/api/news-tickers", async (req, res) => {
    try {
      const tickers = await storage.getActiveNewsTickers();
      res.json(tickers);
    } catch (error) {
      console.error("Error fetching news tickers:", error);
      res.status(500).json({ error: "Failed to fetch news tickers" });
    }
  });

  app.get("/api/cms/news-tickers", async (req, res) => {
    try {
      const tickers = await storage.getAllNewsTickers();
      res.json(tickers);
    } catch (error) {
      console.error("Error fetching news tickers:", error);
      res.status(500).json({ error: "Failed to fetch news tickers" });
    }
  });

  app.post("/api/cms/news-tickers", async (req, res) => {
    try {
      const data = insertNewsTickerSchema.parse(req.body);
      const ticker = await storage.createNewsTicker(data);
      res.json(ticker);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  app.put("/api/cms/news-tickers/:id", async (req, res) => {
    try {
      const data = insertNewsTickerSchema.partial().parse(req.body);
      const ticker = await storage.updateNewsTicker(req.params.id, data);
      res.json(ticker);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid data" });
    }
  });

  app.delete("/api/cms/news-tickers/:id", async (req, res) => {
    try {
      await storage.deleteNewsTicker(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete news ticker" });
    }
  });

  // Sync videos from YouTube channel
  app.post("/api/sync-youtube", async (req, res) => {
    try {
      let { channelId } = req.body;

      if (!channelId) {
        return res.status(400).json({ error: "Channel ID is required" });
      }

      const apiKey = process.env.YOUTUBE_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "YouTube API key not configured" });
      }

      const youtubeService = new YouTubeService(apiKey);

      // If it's a handle (starts with @), resolve it to a channel ID
      if (channelId.startsWith('@') || !channelId.startsWith('UC')) {
        const resolvedId = await youtubeService.resolveHandle(channelId);
        if (!resolvedId) {
          return res.status(404).json({ error: "Could not find YouTube channel for this handle" });
        }
        channelId = resolvedId;
      }

      // Check if channel exists in database
      let dbChannel = await storage.getChannelByYoutubeId(channelId);

      // If not, fetch channel info and create it
      if (!dbChannel) {
        const channelInfo = await youtubeService.getChannelInfo(channelId);
        if (!channelInfo) {
          return res.status(404).json({ error: "YouTube channel not found" });
        }

        dbChannel = await storage.createChannel({
          channelId: channelInfo.id,
          channelName: channelInfo.title,
          description: channelInfo.description,
          thumbnailUrl: channelInfo.thumbnailUrl,
          subscriberCount: channelInfo.subscriberCount,
          lastSyncedAt: null,
        });
      }

      // Fetch videos from YouTube
      const youtubeVideos = await youtubeService.getChannelVideos(channelId, 50);

      // Insert or update videos in database
      let newVideos = 0;
      let updatedVideos = 0;

      for (const ytVideo of youtubeVideos) {
        const existingVideo = await storage.getVideoByYoutubeId(ytVideo.id);

        if (existingVideo) {
          // Update existing video
          await storage.updateVideo(ytVideo.id, {
            title: ytVideo.title,
            description: ytVideo.description,
            thumbnailUrl: ytVideo.thumbnailUrl,
            duration: ytVideo.duration,
            viewCount: ytVideo.viewCount,
            likeCount: ytVideo.likeCount,
            tags: ytVideo.tags,
            publishedAt: new Date(ytVideo.publishedAt),
            channelId: dbChannel.id,
          });
          updatedVideos++;
        } else {
          // Create new video
          await storage.createVideo({
            videoId: ytVideo.id,
            channelId: dbChannel.id,
            title: ytVideo.title,
            description: ytVideo.description,
            thumbnailUrl: ytVideo.thumbnailUrl,
            duration: ytVideo.duration,
            publishedAt: new Date(ytVideo.publishedAt),
            viewCount: ytVideo.viewCount,
            likeCount: ytVideo.likeCount,
            tags: ytVideo.tags,
          });
          newVideos++;
        }
      }

      // Update channel last synced time
      await storage.updateChannelSyncTime(dbChannel.id);

      res.json({
        success: true,
        channel: dbChannel,
        newVideos,
        updatedVideos,
        totalVideos: youtubeVideos.length,
      });
    } catch (error) {
      console.error("Error syncing YouTube videos:", error);
      res.status(500).json({ error: "Failed to sync YouTube videos" });
    }
  });

  // Get channel info
  app.get("/api/channel", async (req, res) => {
    try {
      const { youtubeChannelId } = req.query;
      
      if (!youtubeChannelId || typeof youtubeChannelId !== 'string') {
        return res.status(400).json({ error: "YouTube channel ID is required" });
      }

      const channel = await storage.getChannelByYoutubeId(youtubeChannelId);
      
      if (!channel) {
        return res.status(404).json({ error: "Channel not found" });
      }

      res.json(channel);
    } catch (error) {
      console.error("Error fetching channel:", error);
      res.status(500).json({ error: "Failed to fetch channel" });
    }
  });

  // Get contact info (public endpoint)
  app.get("/api/cms/public/contact-info", async (req, res) => {
    try {
      const contactInfo = await storage.getContactInfo();
      if (!contactInfo) {
        return res.status(404).json({ error: "Contact info not found" });
      }
      res.json(contactInfo);
    } catch (error) {
      console.error("Error fetching contact info:", error);
      res.status(500).json({ error: "Failed to fetch contact info" });
    }
  });

  // Create or update contact info (admin endpoint)
  app.post("/api/admin/contact-info", async (req, res) => {
    try {
      const validation = insertContactInfoSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid contact info data", issues: validation.error.issues });
      }

      const existingInfo = await storage.getContactInfo();
      
      if (existingInfo) {
        const updated = await storage.updateContactInfo(existingInfo.id, validation.data);
        return res.json(updated);
      }

      const created = await storage.createContactInfo(validation.data);
      res.status(201).json(created);
    } catch (error) {
      console.error("Error saving contact info:", error);
      res.status(500).json({ error: "Failed to save contact info" });
    }
  });

  // Create category (admin endpoint)
  app.post("/api/cms/categories", async (req, res) => {
    try {
      const validation = insertCategorySchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid category data", issues: validation.error.issues });
      }

      const category = await storage.createCategory(validation.data);
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ error: "Failed to create category" });
    }
  });

  // Get all categories (public endpoint)
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Get published posts by category (public endpoint)
  app.get("/api/blog/category/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const category = await storage.getCategoryBySlug(slug);
      
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      const posts = await storage.getPublishedPostsByCategory(category.id);
      res.json({ category, posts });
    } catch (error) {
      console.error("Error fetching posts by category:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  // Get all published posts (public endpoint for blog page)
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const posts = await storage.getPublishedPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching published posts:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  // Get single post with categories and ads
  app.get("/api/blog/post/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getPostBySlug(slug);
      
      if (!post || post.status !== "published") {
        return res.status(404).json({ error: "Post not found" });
      }

      const categories = await storage.getPostCategories(post.id);
      const allAds = await storage.getAllAds();
      
      // Get ads for blog post by placement
      const blogPostAds = {
        top: allAds.filter(a => a.isActive && a.placement === "blog_post_top" && (!a.categoryId || a.categoryId === post.categoryId)).sort((a, b) => a.position - b.position),
        sidebar: allAds.filter(a => a.isActive && a.placement === "blog_post_sidebar" && (!a.categoryId || a.categoryId === post.categoryId)).sort((a, b) => a.position - b.position),
        bottom: allAds.filter(a => a.isActive && a.placement === "blog_post_bottom" && (!a.categoryId || a.categoryId === post.categoryId)).sort((a, b) => a.position - b.position),
      };
      
      res.json({ post, categories, ads: blogPostAds });
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  // Get all published offerings (public endpoint)
  app.get("/api/offerings", async (req, res) => {
    try {
      const offerings = await storage.getPublishedOfferings();
      res.json(offerings);
    } catch (error) {
      console.error("Error fetching offerings:", error);
      res.status(500).json({ error: "Failed to fetch offerings" });
    }
  });

  // Admin: Get all offerings (including unpublished)
  app.get("/api/cms/offerings", async (req, res) => {
    try {
      const offerings = await storage.getAllOfferings();
      res.json(offerings);
    } catch (error) {
      console.error("Error fetching offerings:", error);
      res.status(500).json({ error: "Failed to fetch offerings" });
    }
  });

  // Admin: Create offering
  app.post("/api/cms/offerings", async (req, res) => {
    try {
      const validation = insertOfferingSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
      }
      const offering = await storage.createOffering(validation.data);
      res.status(201).json(offering);
    } catch (error) {
      console.error("Error creating offering:", error);
      res.status(500).json({ error: "Failed to create offering" });
    }
  });

  // Admin: Update offering
  app.put("/api/cms/offerings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log("🔵 [Backend] PUT /api/cms/offerings/:id received");
      console.log("📥 [Backend] Offering ID:", id);
      console.log("📥 [Backend] Request body:", JSON.stringify(req.body, null, 2));
      console.log("📥 [Backend] Request body keys:", Object.keys(req.body));
      
      const validation = insertOfferingSchema.partial().safeParse(req.body);
      console.log("🔍 [Backend] Validation success:", validation.success);
      
      if (!validation.success) {
        console.error("❌ [Backend] Validation failed:", validation.error.errors);
        return res.status(400).json({ error: validation.error.errors });
      }
      
      console.log("✅ [Backend] Validation passed");
      console.log("📤 [Backend] Data to update:", JSON.stringify(validation.data, null, 2));
      
      const offering = await storage.updateOffering(id, validation.data);
      console.log("💾 [Backend] Updated offering from database:", JSON.stringify(offering, null, 2));
      
      res.json(offering);
    } catch (error) {
      console.error("Error updating offering:", error);
      res.status(500).json({ error: "Failed to update offering" });
    }
  });

  // Admin: Delete offering
  app.delete("/api/cms/offerings/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteOffering(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting offering:", error);
      res.status(500).json({ error: "Failed to delete offering" });
    }
  });

  // Seed offerings data
  app.post("/api/seed/offerings", async (req, res) => {
    try {
      const offeringsData = [
        {
          slug: "morning-aarti",
          title: "Morning Aarti",
          titleHi: "प्रातः आरती",
          subtitle: "Start the Day with Blessings",
          subtitleHi: "दिन की शुरुआत आशीर्वाद से करें",
          description: "Begin your day with the divine morning aarti ceremony, connecting with the spiritual energy of Vrindavan.",
          descriptionHi: "वृंदावन की आध्यात्मिक ऊर्जा से जुड़ते हुए प्रातःकालीन आरती समारोह के साथ अपने दिन की शुरुआत करें।",
          keywords: "morning aarti, divine worship, Vrindavan",
          icon: "Sun",
          isPublished: true,
          order: 1,
        },
        {
          slug: "bhajan-kirtan",
          title: "Bhajan Kirtan",
          titleHi: "भजन कीर्तन",
          subtitle: "Devotional Music & Chanting",
          subtitleHi: "भक्तिमय संगीत और गायन",
          description: "Immerse yourself in the soulful bhajans and kirtans that elevate the spirit and connect the heart to divinity.",
          descriptionHi: "आत्मा को ऊंचा करने वाले भजनों और कीर्तनों में खो जाएं जो हृदय को दिव्यता से जोड़ते हैं।",
          keywords: "bhajan, kirtan, devotional music",
          icon: "Music",
          isPublished: true,
          order: 2,
        },
        {
          slug: "daily-satsang",
          title: "Daily Satsang",
          titleHi: "दैनिक सत्संग",
          subtitle: "Spiritual Discourse & Guidance",
          subtitleHi: "आध्यात्मिक प्रवचन और मार्गदर्शन",
          description: "Join our daily satsang sessions for profound spiritual teachings and guidance on the path of bhakti.",
          descriptionHi: "���क्ति के मार्ग पर गहन आध्यात्मिक शिक्षा और मार्गदर्शन के लिए हमारे दैनिक सत्संग में शामिल हों।",
          keywords: "satsang, spiritual discourse, bhakti path",
          icon: "BookOpen",
          isPublished: true,
          order: 3,
        },
        {
          slug: "mantra-jaap",
          title: "Mantra Jaap",
          titleHi: "मंत्र जाप",
          subtitle: "Sacred Chanting & Meditation",
          subtitleHi: "पवित्र मंत्रोच्चार और ध्यान",
          description: "Experience the transformative power of sacred mantras through guided meditation and chanting practices.",
          descriptionHi: "निर्देशित ध्यान और उच्चारण अभ्यास के माध्यम से पवित्र मंत्रों की परिवर्तनकारी शक्ति का अनुभव करें।",
          keywords: "mantra, jaap, meditation, chanting",
          icon: "Sparkles",
          isPublished: true,
          order: 4,
        },
        {
          slug: "katha-pravachan",
          title: "Katha Pravachan",
          titleHi: "कथा प्रवचन",
          subtitle: "Spiritual Stories & Wisdom",
          subtitleHi: "आध्यात्मिक कथाएं और ज्ञान",
          description: "Explore the timeless wisdom through sacred stories from our spiritual traditions.",
          descriptionHi: "हमारी आध्यात्मिक परंपराओं से पवित्र कथाओं के माध्यम से कालजयी ज्ञान का अन्वेषण करें।",
          keywords: "katha, stories, spiritual wisdom",
          icon: "Mic",
          isPublished: true,
          order: 5,
        },
        {
          slug: "community",
          title: "Community Service",
          titleHi: "समुदाय सेवा",
          subtitle: "Grow Together on the Path",
          subtitleHi: "मार्ग पर एक साथ बढ़ें",
          description: "Join our spiritual community for collective healing, growth, and service to others.",
          descriptionHi: "सामूहिक उपचार, वृद्धि और दूसरों की सेवा के लिए हमारे आध्यात्मिक समुदाय में शामिल हों।",
          keywords: "community, service, collective growth",
          icon: "Users",
          isPublished: true,
          order: 6,
        },
      ];

      for (const offering of offeringsData) {
        await storage.createOffering(offering);
      }

      res.json({ success: true, count: offeringsData.length });
    } catch (error) {
      console.error("Error seeding offerings:", error);
      res.status(500).json({ error: "Failed to seed offerings" });
    }
  });

  // Seed sample blog posts and categories
  app.post("/api/seed/blog-data", async (req, res) => {
    try {
      // Create categories
      const spiritualityCategory = await storage.createCategory({
        slug: "spirituality",
        name: "Spirituality",
        nameHi: "आध्यात्मिकता",
        description: "Explore spiritual wisdom and devotional insights",
        descriptionHi: "आध्यात्मिक ज्ञान और भक्ति अंतर्दृष्टि का अन्वेषण करें",
      });

      const devotionCategory = await storage.createCategory({
        slug: "devotion",
        name: "Devotion",
        nameHi: "भक्ति",
        description: "Stories and teachings on devotion",
        descriptionHi: "भक्ति पर कहानियाँ और शिक्षाएं",
      });

      const meditationCategory = await storage.createCategory({
        slug: "meditation",
        name: "Meditation",
        nameHi: "ध्यान",
        description: "Meditation practices and techniques",
        descriptionHi: "ध्यान के अभ्यास और तकनीकें",
      });

      // Create sample posts with featured image and primary category
      const featuredImageUrl = "/attached_assets/image_1766130308405.png";
      
      const post1 = await storage.createPost({
        slug: "krishna-wisdom",
        title: "Ancient Krishna Wisdom",
        titleHi: "प्राचीन कृष्ण ज्ञान",
        excerpt: "Discover the timeless wisdom of Lord Krishna",
        excerptHi: "भगवान कृष्ण के शाश्वत ज्ञान की खोज करें",
        content: "Lord Krishna's teachings in the Bhagavad Gita remain relevant today. His wisdom on dharma, devotion, and life's purpose guides millions.",
        contentHi: "भगवद्गीता में भगवान कृष्ण की शिक्षाएं आज भी प्रासंगिक हैं। धर्म, भक्ति और जीवन के उद्देश्य पर उनका ज्ञान लाखों लोगों को मार्गदर्शन देता है।",
        status: "published",
        publishedAt: new Date(),
        featuredImage: featuredImageUrl,
        categoryId: spiritualityCategory.id,
      });

      const post2 = await storage.createPost({
        slug: "bhakti-yoga-path",
        title: "The Path of Bhakti Yoga",
        titleHi: "भक्ति योग का मार्ग",
        excerpt: "Understanding the yoga of devotion",
        excerptHi: "भक्ति योग को समझना",
        content: "Bhakti Yoga is the path of devotion, one of the four main paths of yoga. It emphasizes love and devotion to the divine.",
        contentHi: "भक्ति योग चार मुख्य योग पथों में से एक है। यह ईश्वर के प्रति प्रेम और भक्ति पर जोर देता है।",
        status: "published",
        publishedAt: new Date(Date.now() - 86400000),
        featuredImage: featuredImageUrl,
        categoryId: devotionCategory.id,
      });

      const post3 = await storage.createPost({
        slug: "meditation-beginners",
        title: "Meditation for Beginners",
        titleHi: "शुरुआती लोगों के लिए ध्यान",
        excerpt: "Start your meditation journey today",
        excerptHi: "आज अपनी ध्यान यात्रा शुरू करें",
        content: "Meditation is a simple yet powerful practice. Start with just 5 minutes daily and gradually increase. Focus on your breath and let thoughts pass.",
        contentHi: "ध्यान एक सरल लेकिन शक्तिशाली अभ्यास है। प्रतिदिन केवल 5 मिनट से शुरू करें। अपनी सांस पर ध्यान दें।",
        status: "published",
        publishedAt: new Date(Date.now() - 172800000),
        featuredImage: featuredImageUrl,
        categoryId: meditationCategory.id,
      });

      const post4 = await storage.createPost({
        slug: "vrindavan-mysteries",
        title: "The Sacred Mysteries of Vrindavan",
        titleHi: "वृंदावन के पवित्र रहस्य",
        excerpt: "Discover the spiritual significance of Vrindavan",
        excerptHi: "वृंदावन के आध्यात्मिक महत्व की खोज करें",
        content: "Vrindavan, the land of Lord Krishna's divine pastimes, holds immense spiritual significance. Every corner resonates with divine energy.",
        contentHi: "वृंदावन, भगवान कृष्ण की दिव्य लीलाओं की भू ��ि, अपार आध्यात्मिक महत्व रखती है। हर कोने में दिव्य ऊर्जा गूँजती है।",
        status: "published",
        publishedAt: new Date(Date.now() - 259200000),
        featuredImage: featuredImageUrl,
        categoryId: spiritualityCategory.id,
      });

      // Add posts to additional categories (if needed for multi-category support)
      await storage.addPostToCategory(post1.id, devotionCategory.id);

      res.json({
        success: true,
        message: "Sample blog data created successfully",
        categories: [spiritualityCategory, devotionCategory, meditationCategory],
        posts: [post1, post2, post3, post4],
      });
    } catch (error) {
      console.error("Error seeding blog data:", error);
      res.status(500).json({ error: "Failed to seed blog data" });
    }
  });

  // Ad management endpoints
  app.get("/api/cms/ads", async (req, res) => {
    try {
      const allAds = await storage.getAllAds();
      res.json(allAds);
    } catch (error) {
      console.error("Error fetching ads:", error);
      res.status(500).json({ error: "Failed to fetch ads" });
    }
  });

  app.get("/api/ads", async (req, res) => {
    try {
      const { placement, categoryId } = req.query;
      const activeAds = await storage.getActiveAds();
      
      let filtered = activeAds;
      if (placement) {
        filtered = filtered.filter(ad => ad.placement === placement);
      }
      if (categoryId) {
        filtered = filtered.filter(ad => !ad.categoryId || ad.categoryId === categoryId);
      }
      
      res.json(filtered);
    } catch (error) {
      console.error("Error fetching active ads:", error);
      res.status(500).json({ error: "Failed to fetch ads" });
    }
  });

  app.post("/api/cms/ads", upload.single("image"), async (req, res) => {
    try {
      let imageUrl = "";
      let imagePublicId = "";

      if (req.file) {
        const uploadResponse = await uploadToCloudinary(
          req.file.buffer,
          req.file.originalname
        );
        imageUrl = uploadResponse.secure_url;
        imagePublicId = uploadResponse.public_id;
      } else {
        imageUrl = req.body.imageUrl || "";
        imagePublicId = req.body.imagePublicId || "";
      }

      const parsedData: any = {
        titleEn: req.body.titleEn || "",
        titleHi: req.body.titleHi || null,
        link: req.body.link || null,
        isActive: req.body.isActive === "true" || req.body.isActive === true,
        placement: req.body.placement || "blog_listing",
        categoryId: req.body.categoryId || null,
        position: parseInt(req.body.position || "0", 10),
        imageUrl,
        imagePublicId,
      };

      if (req.file) {
        const uploadResponse = await uploadToCloudinary(
          req.file.buffer,
          req.file.originalname
        );
        parsedData.imageWidth = uploadResponse.width;
        parsedData.imageHeight = uploadResponse.height;
      }

      const validated = insertAdSchema.parse(parsedData);

      const ad = await storage.createAd(validated);

      res.json(ad);
    } catch (error) {
      console.error("Error creating ad:", error);
      res.status(500).json({ error: "Failed to create ad" });
    }
  });

  app.put("/api/cms/ads/:id", upload.single("image"), async (req, res) => {
    try {
      const allAds = await storage.getAllAds();
      const ad = allAds.find(a => a.id === req.params.id);
      
      if (!ad) {
        return res.status(404).json({ error: "Ad not found" });
      }

      const parsedData: any = {};
      if (req.body.titleEn) parsedData.titleEn = req.body.titleEn;
      if (req.body.titleHi) parsedData.titleHi = req.body.titleHi;
      if (req.body.link) parsedData.link = req.body.link;
      if (req.body.isActive !== undefined) parsedData.isActive = req.body.isActive === "true" || req.body.isActive === true;
      if (req.body.placement) parsedData.placement = req.body.placement;
      if (req.body.categoryId !== undefined) parsedData.categoryId = req.body.categoryId || null;
      if (req.body.position !== undefined) parsedData.position = parseInt(req.body.position, 10);

      if (req.file) {
        if (ad.imagePublicId) {
          await deleteFromCloudinary(ad.imagePublicId);
        }
        const uploadResponse = await uploadToCloudinary(
          req.file.buffer,
          req.file.originalname
        );
        parsedData.imageUrl = uploadResponse.secure_url;
        parsedData.imagePublicId = uploadResponse.public_id;
        parsedData.imageWidth = uploadResponse.width;
        parsedData.imageHeight = uploadResponse.height;
      }

      const validated = insertAdSchema.partial().parse(parsedData);
      const updated = await storage.updateAd(req.params.id, validated);
      res.json(updated);
    } catch (error) {
      console.error("Error updating ad:", error);
      res.status(500).json({ error: "Failed to update ad" });
    }
  });

  app.delete("/api/cms/ads/:id", async (req, res) => {
    try {
      const allAds = await storage.getAllAds();
      const ad = allAds.find(a => a.id === req.params.id);
      
      if (!ad) {
        return res.status(404).json({ error: "Ad not found" });
      }

      if (ad.imagePublicId) {
        await deleteFromCloudinary(ad.imagePublicId);
      }

      await storage.deleteAd(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting ad:", error);
      res.status(500).json({ error: "Failed to delete ad" });
    }
  });

  // Seed Legal Pages (Privacy Policy and Terms of Service)
  app.post("/api/seed/legal-pages", async (req, res) => {
    try {
      // Check if pages already exist
      const privacyExists = await storage.getPageBySlug("privacy-policy");
      const termsExists = await storage.getPageBySlug("terms-of-service");

      const results = [];

      if (!privacyExists) {
        const privacyPage = await storage.createPage({
          slug: "privacy-policy",
          title: "Privacy Policy",
          titleHi: "गोपनीयता नीति",
          content: "<h2>1. Introduction</h2><p>At Asthawaani, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise handle your personal information.</p><h2>2. Information We Collect</h2><p>We may collect information about you in a variety of ways including personal identification information, usage data through cookies and similar technologies.</p><h2>3. Contact Us</h2><p>If you have questions about this Privacy Policy, please contact us through our contact form.</p>",
          contentHi: "<h2>1. परिचय</h2><p>अस्थावणि में, हम आपकी गोपनीयता की सुरक्षा के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति बताती है कि हम आपकी व्यक्तिगत जानकारी को कैसे एकत्र करते हैं।</p><h2>2. हम कौन सी जानकारी एकत्र करते हैं</h2><p>हम विभिन्न तरीकों से आपके बारे में जानकारी एकत्र कर सकते हैं जिसमें व्यक्तिगत पहचान की जानकारी शामिल है।</p><h2>3. हमसे संपर्क करें</h2><p>यदि आपके पास इस गोपनीयता नीति के बारे में प्रश्न हैं, तो कृपया हमारे संपर्क फॉर्म के माध्यम से हमसे संपर्क करें।</p>",
          metaTitle: "Privacy Policy - Asthawaani",
          metaDescription: "Learn how Asthawaani protects your privacy and handles your personal information.",
          isPublished: true,
        });
        results.push({ page: "privacy-policy", status: "created", id: privacyPage.id });
      } else {
        results.push({ page: "privacy-policy", status: "already-exists", id: privacyExists.id });
      }

      if (!termsExists) {
        const termsPage = await storage.createPage({
          slug: "terms-of-service",
          title: "Terms of Service",
          titleHi: "सेवा की शर्तें",
          content: "<h2>1. Acceptance of Terms</h2><p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p><h2>2. Use License</h2><p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial viewing only.</p><h2>3. Disclaimer</h2><p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied.</p><h2>4. Governing Law</h2><p>These terms and conditions are governed by and construed in accordance with the laws of India.</p>",
          contentHi: "<h2>1. शर्तों का स्वीकार</h2><p>इस वेबसाइट को एक्सेस और उपयोग करके, आप इस समझौते की शर्तों से बंधे होने के लिए सहमत हैं।</p><h2>2. उपयोग लाइसेंस</h2><p>हमारी वेबसाइट पर सामग्री की एक प्रति को व्यक्तिगत, गैर-वाणिज्यिक देखने के लिए अस्थायी रूप से डाउनलोड करने की अनुमति दी जाती है।</p><h2>3. अस्वीकरण</h2><p>हमारी वेबसाइट पर सामग्री 'जैसी है' के आधार पर प्रदान की जाती है। हम कोई वारंटी नहीं देते हैं।</p><h2>4. शासी कानून</h2><p>ये शर्तें भारत के कानूनों के अनुसार शासित होती हैं।</p>",
          metaTitle: "Terms of Service - Asthawaani",
          metaDescription: "Read our Terms of Service to understand how you can use Asthawaani.",
          isPublished: true,
        });
        results.push({ page: "terms-of-service", status: "created", id: termsPage.id });
      } else {
        results.push({ page: "terms-of-service", status: "already-exists", id: termsExists.id });
      }

      res.json({
        success: true,
        message: "Legal pages seeded successfully",
        results,
      });
    } catch (error) {
      console.error("Error seeding legal pages:", error);
      res.status(500).json({ error: "Failed to seed legal pages" });
    }
  });

  // Vakta Application Rate Limiter
  const vaktaRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 applications per hour
    message: "Too many applications submitted, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Vakta Application Routes
  app.post("/api/vakta-application", vaktaRateLimit, async (req, res) => {
    try {
      const validation = insertVaktaApplicationSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: "Invalid application data", issues: validation.error.issues });
      }

      const application = await storage.createVaktaApplication(validation.data);

      // Send email notification if email service is configured
      if (process.env.EMAIL && process.env.PASS) {
        try {
          await sendVaktaApplicationNotification(
            validation.data.name,
            validation.data.email,
            validation.data.phone,
            validation.data.categories,
            validation.data.experience
          );
          console.log("Vakta application email notification sent successfully");
        } catch (emailError) {
          console.error("Failed to send Vakta application email notification:", emailError);
        }
      }

      res.status(201).json({
        success: true,
        message: "Your application has been submitted successfully! We will contact you soon.",
        application,
      });
    } catch (error) {
      console.error("Error submitting vakta application:", error);
      res.status(500).json({ error: "Failed to submit application. Please try again later." });
    }
  });

  // Get all vakta applications (admin endpoint)
  app.get("/api/cms/vakta-applications", async (req, res) => {
    try {
      const applications = await storage.getAllVaktaApplications();
      res.json(applications);
    } catch (error) {
      console.error("Error fetching vakta applications:", error);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  // Delete vakta application (admin endpoint)
  app.delete("/api/cms/vakta-applications/:id", async (req, res) => {
    try {
      await storage.deleteVaktaApplication(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting vakta application:", error);
      res.status(500).json({ error: "Failed to delete application" });
    }
  });

  return httpServer;
}
