import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { YouTubeService } from "./youtube.service";
import { insertYoutubeChannelSchema, insertVideoSchema, insertContactInfoSchema, insertCategorySchema } from "@shared/schema";

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

  return httpServer;
}
