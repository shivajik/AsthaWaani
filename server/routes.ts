import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { YouTubeService } from "./youtube.service";
import { insertYoutubeChannelSchema, insertVideoSchema } from "@shared/schema";

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
      const { channelId } = req.body;

      if (!channelId) {
        return res.status(400).json({ error: "Channel ID is required" });
      }

      const apiKey = process.env.YOUTUBE_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "YouTube API key not configured" });
      }

      const youtubeService = new YouTubeService(apiKey);

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

  return httpServer;
}
