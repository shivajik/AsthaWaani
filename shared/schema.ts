import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// YouTube Channel Configuration
export const youtubeChannels = pgTable("youtube_channels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  channelId: text("channel_id").notNull().unique(),
  channelName: text("channel_name").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  subscriberCount: integer("subscriber_count"),
  lastSyncedAt: timestamp("last_synced_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertYoutubeChannelSchema = createInsertSchema(youtubeChannels).omit({
  id: true,
  createdAt: true,
});

export type InsertYoutubeChannel = z.infer<typeof insertYoutubeChannelSchema>;
export type YoutubeChannel = typeof youtubeChannels.$inferSelect;

// YouTube Videos
export const videos = pgTable("videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  videoId: text("video_id").notNull().unique(),
  channelId: varchar("channel_id").notNull().references(() => youtubeChannels.id),
  title: text("title").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  duration: text("duration"),
  publishedAt: timestamp("published_at").notNull(),
  viewCount: integer("view_count"),
  likeCount: integer("like_count"),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;
