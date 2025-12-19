import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { YouTubeService } from "./youtube.service";
import { insertYoutubeChannelSchema, insertVideoSchema, insertContactInfoSchema, insertCategorySchema, insertOfferingSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
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

  // Get single post with categories
  app.get("/api/blog/post/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getPostBySlug(slug);
      
      if (!post || post.status !== "published") {
        return res.status(404).json({ error: "Post not found" });
      }

      const categories = await storage.getPostCategories(post.id);
      res.json({ post, categories });
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
      const validation = insertOfferingSchema.partial().safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error.errors });
      }
      const offering = await storage.updateOffering(id, validation.data);
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
          descriptionHi: "भक्ति के मार्ग पर गहन आध्यात्मिक शिक्षा और मार्गदर्शन के लिए हमारे दैनिक सत्संग में शामिल हों।",
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
        contentHi: "वृंदावन, भगवान कृष्ण की दिव्य लीलाओं की भूमि, अपार आध्यात्मिक महत्व रखती है। हर कोने में दिव्य ऊर्जा गूँजती है।",
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

  return httpServer;
}
