import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import bcrypt from "bcryptjs";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import rateLimit from "express-rate-limit";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq, desc, and, sql } from "drizzle-orm";
import { pgTable, text, serial, integer, boolean, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

declare module "express-session" {
  interface SessionData {
    adminId?: string;
    adminEmail?: string;
    adminName?: string;
    adminRole?: string;
  }
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

const youtubeChannels = pgTable("youtube_channels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  channelId: text("channel_id").notNull().unique(),
  channelName: text("channel_name").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  subscriberCount: integer("subscriber_count"),
  lastSyncedAt: timestamp("last_synced_at"),
});

const videos = pgTable("videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  videoId: text("video_id").notNull().unique(),
  channelId: varchar("channel_id").references(() => youtubeChannels.id),
  title: text("title").notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"),
  duration: text("duration"),
  publishedAt: timestamp("published_at"),
  viewCount: integer("view_count"),
  likeCount: integer("like_count"),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const admins = pgTable("admins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
});

const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  titleHi: text("title_hi"),
  content: text("content"),
  contentHi: text("content_hi"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const posts = pgTable("posts", {
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
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const media = pgTable("media", {
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
  uploadedBy: varchar("uploaded_by"),
  createdAt: timestamp("created_at").defaultNow(),
});

const seoMeta = pgTable("seo_meta", {
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
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const siteSettings = pgTable("site_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: text("value"),
  valueJson: jsonb("value_json"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

const insertPageSchema = createInsertSchema(pages).omit({ id: true, createdAt: true, updatedAt: true });
const insertPostSchema = createInsertSchema(posts).omit({ id: true, createdAt: true, updatedAt: true });
const insertSeoMetaSchema = createInsertSchema(seoMeta).omit({ id: true, createdAt: true, updatedAt: true });

class DatabaseStorage {
  async getAllVideos() {
    return await db.select().from(videos).orderBy(desc(videos.publishedAt));
  }

  async getVideoByYoutubeId(videoId: string) {
    const [video] = await db.select().from(videos).where(eq(videos.videoId, videoId));
    return video || undefined;
  }

  async getChannelByYoutubeId(youtubeChannelId: string) {
    const [channel] = await db.select().from(youtubeChannels).where(eq(youtubeChannels.channelId, youtubeChannelId));
    return channel || undefined;
  }

  async getAdminByEmail(email: string) {
    const [admin] = await db.select().from(admins).where(eq(admins.email, email));
    return admin || undefined;
  }

  async getPage(id: string) {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page || undefined;
  }

  async getPageBySlug(slug: string) {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    return page || undefined;
  }

  async getAllPages() {
    return await db.select().from(pages).orderBy(desc(pages.updatedAt));
  }

  async createPage(page: any) {
    const [newPage] = await db.insert(pages).values(page).returning();
    return newPage;
  }

  async updatePage(id: string, page: any) {
    const [updatedPage] = await db.update(pages).set({ ...page, updatedAt: new Date() }).where(eq(pages.id, id)).returning();
    return updatedPage;
  }

  async deletePage(id: string) {
    await db.delete(pages).where(eq(pages.id, id));
  }

  async getPost(id: string) {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post || undefined;
  }

  async getPostBySlug(slug: string) {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post || undefined;
  }

  async getAllPosts() {
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async getPublishedPosts() {
    return await db.select().from(posts).where(eq(posts.status, "published")).orderBy(desc(posts.publishedAt));
  }

  async createPost(post: any) {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  }

  async updatePost(id: string, post: any) {
    const [updatedPost] = await db.update(posts).set({ ...post, updatedAt: new Date() }).where(eq(posts.id, id)).returning();
    return updatedPost;
  }

  async deletePost(id: string) {
    await db.delete(posts).where(eq(posts.id, id));
  }

  async getMedia(id: string) {
    const [mediaItem] = await db.select().from(media).where(eq(media.id, id));
    return mediaItem || undefined;
  }

  async getMediaByPublicId(publicId: string) {
    const [mediaItem] = await db.select().from(media).where(eq(media.publicId, publicId));
    return mediaItem || undefined;
  }

  async getAllMedia() {
    return await db.select().from(media).orderBy(desc(media.createdAt));
  }

  async createMedia(mediaItem: any) {
    const [newMedia] = await db.insert(media).values(mediaItem).returning();
    return newMedia;
  }

  async updateMedia(id: string, mediaItem: any) {
    const [updatedMedia] = await db.update(media).set(mediaItem).where(eq(media.id, id)).returning();
    return updatedMedia;
  }

  async deleteMedia(id: string) {
    await db.delete(media).where(eq(media.id, id));
  }

  async getSeoMeta(entityType: string, entityId: string) {
    const [seo] = await db.select().from(seoMeta).where(and(eq(seoMeta.entityType, entityType), eq(seoMeta.entityId, entityId)));
    return seo || undefined;
  }

  async createSeoMeta(seo: any) {
    const [newSeo] = await db.insert(seoMeta).values(seo).returning();
    return newSeo;
  }

  async updateSeoMeta(id: string, seo: any) {
    const [updatedSeo] = await db.update(seoMeta).set({ ...seo, updatedAt: new Date() }).where(eq(seoMeta.id, id)).returning();
    return updatedSeo;
  }

  async getSetting(key: string) {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting || undefined;
  }

  async getAllSettings() {
    return await db.select().from(siteSettings);
  }

  async upsertSetting(setting: any) {
    const existing = await this.getSetting(setting.key);
    if (existing) {
      const [updated] = await db.update(siteSettings).set({ ...setting, updatedAt: new Date() }).where(eq(siteSettings.key, setting.key)).returning();
      return updated;
    }
    const [newSetting] = await db.insert(siteSettings).values(setting).returning();
    return newSetting;
  }
}

const storage = new DatabaseStorage();

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session?.adminId) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

async function loginAdmin(email: string, password: string) {
  const admin = await storage.getAdminByEmail(email);
  if (!admin) return null;
  const isValid = await verifyPassword(password, admin.password);
  if (!isValid) return null;
  return admin;
}

function sanitizeContent(content: string): string {
  return sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "h3", "h4", "h5", "h6", "figure", "figcaption"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height", "loading"],
      a: ["href", "target", "rel"],
      "*": ["class", "id", "style"],
    },
    allowedSchemes: ["http", "https", "data"],
  });
}

const app = express();
app.use(express.json());

const sessionSecret = process.env.SESSION_SECRET || "fallback-secret-for-dev";
const PgSession = connectPgSimple(session);

app.use(session({
  store: new PgSession({
    pool: pool,
    tableName: "session",
    createTableIfMissing: true,
  }),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "lax",
  },
}));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts, please try again later." },
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
});

const updatePageSchema = z.object({
  title: z.string().min(1).optional(),
  titleHi: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  contentHi: z.string().nullable().optional(),
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  isPublished: z.boolean().optional(),
});

const updatePostSchema = z.object({
  title: z.string().min(1).optional(),
  titleHi: z.string().nullable().optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().nullable().optional(),
  excerptHi: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  contentHi: z.string().nullable().optional(),
  featuredImage: z.string().nullable().optional(),
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  status: z.enum(["draft", "published"]).optional(),
});

const updateSeoSchema = z.object({
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
  canonicalUrl: z.string().nullable().optional(),
  ogTitle: z.string().nullable().optional(),
  ogDescription: z.string().nullable().optional(),
  ogImage: z.string().nullable().optional(),
  twitterTitle: z.string().nullable().optional(),
  twitterDescription: z.string().nullable().optional(),
  twitterImage: z.string().nullable().optional(),
  schemaType: z.string().nullable().optional(),
  schemaData: z.any().optional(),
});

const updateMediaSchema = z.object({
  altText: z.string().nullable().optional(),
});

app.get("/api/videos", async (req, res) => {
  try {
    const videosList = await storage.getAllVideos();
    res.json(videosList);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

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

app.post("/api/sync-youtube", async (req, res) => {
  res.status(501).json({ error: "YouTube sync is not available in serverless mode. Use the development server." });
});

app.use("/api/cms", apiLimiter);

app.post("/api/cms/auth/login", loginLimiter, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const admin = await loginAdmin(email, password);
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    req.session.adminId = admin.id;
    req.session.adminEmail = admin.email;
    req.session.adminName = admin.name;
    req.session.adminRole = admin.role;
    res.json({
      success: true,
      admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/api/cms/auth/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ success: true });
  });
});

app.get("/api/cms/auth/me", isAuthenticated, (req: Request, res: Response) => {
  res.json({
    admin: {
      id: req.session.adminId,
      email: req.session.adminEmail,
      name: req.session.adminName,
      role: req.session.adminRole,
    }
  });
});

app.get("/api/cms/pages", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const pagesList = await storage.getAllPages();
    res.json(pagesList);
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ error: "Failed to fetch pages" });
  }
});

app.get("/api/cms/pages/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const page = await storage.getPage(req.params.id);
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
    res.json(page);
  } catch (error) {
    console.error("Error fetching page:", error);
    res.status(500).json({ error: "Failed to fetch page" });
  }
});

app.post("/api/cms/pages", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const data = insertPageSchema.parse(req.body);
    if (data.content) data.content = sanitizeContent(data.content);
    if (data.contentHi) data.contentHi = sanitizeContent(data.contentHi);
    const page = await storage.createPage(data);
    res.status(201).json(page);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    console.error("Error creating page:", error);
    res.status(500).json({ error: "Failed to create page" });
  }
});

app.put("/api/cms/pages/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const existing = await storage.getPage(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "Page not found" });
    }
    const validated = updatePageSchema.parse(req.body);
    if (validated.content) validated.content = sanitizeContent(validated.content);
    if (validated.contentHi) validated.contentHi = sanitizeContent(validated.contentHi);
    const page = await storage.updatePage(req.params.id, validated);
    res.json(page);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    console.error("Error updating page:", error);
    res.status(500).json({ error: "Failed to update page" });
  }
});

app.delete("/api/cms/pages/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    await storage.deletePage(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting page:", error);
    res.status(500).json({ error: "Failed to delete page" });
  }
});

app.get("/api/cms/posts", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const postsList = await storage.getAllPosts();
    res.json(postsList);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get("/api/cms/posts/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const post = await storage.getPost(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

app.post("/api/cms/posts", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const data = insertPostSchema.parse(req.body);
    if (data.content) data.content = sanitizeContent(data.content);
    if (data.contentHi) data.contentHi = sanitizeContent(data.contentHi);
    if (data.status === "published" && !data.publishedAt) {
      data.publishedAt = new Date();
    }
    const post = await storage.createPost(data);
    res.status(201).json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

app.put("/api/cms/posts/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const existing = await storage.getPost(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "Post not found" });
    }
    const validated = updatePostSchema.parse(req.body);
    if (validated.content) validated.content = sanitizeContent(validated.content);
    if (validated.contentHi) validated.contentHi = sanitizeContent(validated.contentHi);
    const updateData: any = { ...validated };
    if (validated.status === "published" && !existing.publishedAt) {
      updateData.publishedAt = new Date();
    }
    const post = await storage.updatePost(req.params.id, updateData);
    res.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
});

app.delete("/api/cms/posts/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    await storage.deletePost(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

app.get("/api/cms/media", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const mediaItems = await storage.getAllMedia();
    res.json(mediaItems);
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({ error: "Failed to fetch media" });
  }
});

app.post("/api/cms/media/upload", isAuthenticated, async (req: Request, res: Response) => {
  res.status(501).json({ error: "Media upload is not available in serverless mode. Use the development server." });
});

app.put("/api/cms/media/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const validated = updateMediaSchema.parse(req.body);
    const mediaItem = await storage.updateMedia(req.params.id, validated);
    res.json(mediaItem);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    console.error("Error updating media:", error);
    res.status(500).json({ error: "Failed to update media" });
  }
});

app.delete("/api/cms/media/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const mediaItem = await storage.getMedia(req.params.id);
    if (!mediaItem) {
      return res.status(404).json({ error: "Media not found" });
    }
    await storage.deleteMedia(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json({ error: "Failed to delete media" });
  }
});

app.get("/api/cms/seo/:entityType/:entityId", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const seo = await storage.getSeoMeta(req.params.entityType, req.params.entityId);
    res.json(seo || null);
  } catch (error) {
    console.error("Error fetching SEO meta:", error);
    res.status(500).json({ error: "Failed to fetch SEO meta" });
  }
});

app.post("/api/cms/seo", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const data = insertSeoMetaSchema.parse(req.body);
    const seo = await storage.createSeoMeta(data);
    res.status(201).json(seo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    console.error("Error creating SEO meta:", error);
    res.status(500).json({ error: "Failed to create SEO meta" });
  }
});

app.put("/api/cms/seo/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const validated = updateSeoSchema.parse(req.body);
    const seo = await storage.updateSeoMeta(req.params.id, validated);
    res.json(seo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    console.error("Error updating SEO meta:", error);
    res.status(500).json({ error: "Failed to update SEO meta" });
  }
});

app.get("/api/cms/settings", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const settings = await storage.getAllSettings();
    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

app.post("/api/cms/settings", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const { key, value, valueJson } = req.body;
    if (!key) {
      return res.status(400).json({ error: "Key is required" });
    }
    const setting = await storage.upsertSetting({ key, value, valueJson });
    res.json(setting);
  } catch (error) {
    console.error("Error saving setting:", error);
    res.status(500).json({ error: "Failed to save setting" });
  }
});

app.get("/api/cms/public/posts", async (req: Request, res: Response) => {
  try {
    const postsList = await storage.getPublishedPosts();
    res.json(postsList);
  } catch (error) {
    console.error("Error fetching published posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get("/api/cms/public/posts/:slug", async (req: Request, res: Response) => {
  try {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post || post.status !== "published") {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

app.get("/api/cms/public/pages/:slug", async (req: Request, res: Response) => {
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

app.all("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

export default app;
