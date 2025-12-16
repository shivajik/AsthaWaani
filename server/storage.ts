import { type User, type InsertUser, type Video, type InsertVideo, type YoutubeChannel, type InsertYoutubeChannel, videos, youtubeChannels, users } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // YouTube Channel operations
  getChannel(channelId: string): Promise<YoutubeChannel | undefined>;
  getChannelByYoutubeId(youtubeChannelId: string): Promise<YoutubeChannel | undefined>;
  createChannel(channel: InsertYoutubeChannel): Promise<YoutubeChannel>;
  updateChannelSyncTime(channelId: string): Promise<void>;
  
  // Video operations
  getAllVideos(): Promise<Video[]>;
  getVideoByYoutubeId(videoId: string): Promise<Video | undefined>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideo(videoId: string, video: Partial<InsertVideo>): Promise<Video>;
  bulkCreateVideos(videoList: InsertVideo[]): Promise<Video[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // YouTube Channel operations
  async getChannel(channelId: string): Promise<YoutubeChannel | undefined> {
    const [channel] = await db.select().from(youtubeChannels).where(eq(youtubeChannels.id, channelId));
    return channel || undefined;
  }

  async getChannelByYoutubeId(youtubeChannelId: string): Promise<YoutubeChannel | undefined> {
    const [channel] = await db.select().from(youtubeChannels).where(eq(youtubeChannels.channelId, youtubeChannelId));
    return channel || undefined;
  }

  async createChannel(channel: InsertYoutubeChannel): Promise<YoutubeChannel> {
    const [newChannel] = await db
      .insert(youtubeChannels)
      .values(channel)
      .returning();
    return newChannel;
  }

  async updateChannelSyncTime(channelId: string): Promise<void> {
    await db
      .update(youtubeChannels)
      .set({ lastSyncedAt: new Date() })
      .where(eq(youtubeChannels.id, channelId));
  }

  // Video operations
  async getAllVideos(): Promise<Video[]> {
    return await db.select().from(videos).orderBy(desc(videos.publishedAt));
  }

  async getVideoByYoutubeId(videoId: string): Promise<Video | undefined> {
    const [video] = await db.select().from(videos).where(eq(videos.videoId, videoId));
    return video || undefined;
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    const [newVideo] = await db
      .insert(videos)
      .values(video)
      .returning();
    return newVideo;
  }

  async updateVideo(videoId: string, video: Partial<InsertVideo>): Promise<Video> {
    const [updatedVideo] = await db
      .update(videos)
      .set({ ...video, updatedAt: new Date() })
      .where(eq(videos.videoId, videoId))
      .returning();
    return updatedVideo;
  }

  async bulkCreateVideos(videoList: InsertVideo[]): Promise<Video[]> {
    if (videoList.length === 0) return [];
    return await db
      .insert(videos)
      .values(videoList)
      .returning();
  }
}

export const storage = new DatabaseStorage();
