import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";
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

// ============================================
// CMS TABLES
// ============================================

// Admin Users (for CMS access)
export const admins = pgTable("admins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof admins.$inferSelect;

// CMS Pages
export const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  titleHi: text("title_hi"),
  content: text("content"),
  contentHi: text("content_hi"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertPageSchema = createInsertSchema(pages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;

// Blog Posts
export const posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  titleHi: text("title_hi"),
  excerpt: text("excerpt"),
  excerptHi: text("excerpt_hi"),
  content: text("content"),
  contentHi: text("content_hi"),
  featuredImage: text("featured_image"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  status: text("status").notNull().default("draft"),
  authorId: varchar("author_id").references(() => admins.id),
  categoryId: varchar("category_id").references(() => categories.id),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;

// Media Library (Cloudinary integration)
export const media = pgTable("media", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  publicId: text("public_id").notNull().unique(),
  url: text("url").notNull(),
  secureUrl: text("secure_url").notNull(),
  filename: text("filename").notNull(),
  format: text("format"),
  width: integer("width"),
  height: integer("height"),
  bytes: integer("bytes"),
  altText: text("alt_text"),
  uploadedBy: varchar("uploaded_by").references(() => admins.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertMediaSchema = createInsertSchema(media).omit({
  id: true,
  createdAt: true,
});

export type InsertMedia = z.infer<typeof insertMediaSchema>;
export type Media = typeof media.$inferSelect;

// SEO Meta (for pages and posts)
export const seoMeta = pgTable("seo_meta", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  entityType: text("entity_type").notNull(),
  entityId: varchar("entity_id").notNull(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  canonicalUrl: text("canonical_url"),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  twitterTitle: text("twitter_title"),
  twitterDescription: text("twitter_description"),
  twitterImage: text("twitter_image"),
  schemaType: text("schema_type"),
  schemaData: jsonb("schema_data"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertSeoMetaSchema = createInsertSchema(seoMeta).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertSeoMeta = z.infer<typeof insertSeoMetaSchema>;
export type SeoMeta = typeof seoMeta.$inferSelect;

// Site Settings
export const siteSettings = pgTable("site_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: text("value"),
  valueJson: jsonb("value_json"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettings).omit({
  id: true,
  updatedAt: true,
});

export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type SiteSettings = typeof siteSettings.$inferSelect;

// Contact Information
export const contactInfo = pgTable("contact_info", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  postalCode: text("postal_code"),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  whatsapp: text("whatsapp"),
  nameHi: text("name_hi"),
  addressHi: text("address_hi"),
  cityHi: text("city_hi"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertContactInfoSchema = createInsertSchema(contactInfo).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
export type ContactInfo = typeof contactInfo.$inferSelect;

// Blog Categories
export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  nameHi: text("name_hi"),
  description: text("description"),
  descriptionHi: text("description_hi"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Post-Category Junction Table
export const postCategories = pgTable("post_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  categoryId: varchar("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
});

export type PostCategory = typeof postCategories.$inferSelect;

// Offerings/Services
export const offerings = pgTable("offerings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  titleHi: text("title_hi"),
  subtitle: text("subtitle"),
  subtitleHi: text("subtitle_hi"),
  description: text("description"),
  descriptionHi: text("description_hi"),
  keywords: text("keywords"),
  icon: text("icon").notNull(),
  isPublished: boolean("is_published").notNull().default(true),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertOfferingSchema = createInsertSchema(offerings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertOffering = z.infer<typeof insertOfferingSchema>;
export type Offering = typeof offerings.$inferSelect;

// News Ticker Items
export const newsTickers = pgTable("news_tickers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text("title_en").notNull(),
  titleHi: text("title_hi").notNull(),
  order: integer("order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertNewsTickerSchema = createInsertSchema(newsTickers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertNewsTicker = z.infer<typeof insertNewsTickerSchema>;
export type NewsTicker = typeof newsTickers.$inferSelect;

// Blog Ads
export const ads = pgTable("ads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text("title_en").notNull(),
  titleHi: text("title_hi"),
  imageUrl: text("image_url").notNull(),
  imagePublicId: text("image_public_id"),
  imageWidth: integer("image_width"),
  imageHeight: integer("image_height"),
  link: text("link"),
  isActive: boolean("is_active").notNull().default(true),
  placement: text("placement").notNull().default("blog_listing"), // blog_listing, blog_post_top, blog_post_sidebar, blog_post_bottom
  categoryId: varchar("category_id").references(() => categories.id), // Optional: specific category
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertAdSchema = createInsertSchema(ads).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertAd = z.infer<typeof insertAdSchema>;
export type Ad = typeof ads.$inferSelect;
