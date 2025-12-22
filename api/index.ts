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
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

declare module "express-session" {
  interface SessionData {
    adminId?: string;
    adminEmail?: string;
    adminName?: string;
    adminRole?: string;
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const db = drizzle(pool);
const upload = multer({ storage: multer.memoryStorage() });

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
  authorId: varchar("author_id").references(() => admins.id),
  categoryId: varchar("category_id").references(() => categories.id),
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

const contactInfo = pgTable("contact_info", {
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

const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  nameHi: text("name_hi"),
  description: text("description"),
  descriptionHi: text("description_hi"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const postCategories = pgTable("post_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  postId: varchar("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  categoryId: varchar("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
});

const offerings = pgTable("offerings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  titleHi: text("title_hi"),
  subtitle: text("subtitle").notNull(),
  subtitleHi: text("subtitle_hi"),
  description: text("description").notNull(),
  descriptionHi: text("description_hi"),
  keywords: text("keywords"),
  icon: text("icon").notNull(),
  isPublished: boolean("is_published").default(true),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const newsTickers = pgTable("news_tickers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text("title_en").notNull(),
  titleHi: text("title_hi").notNull(),
  order: integer("order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

const insertPageSchema = createInsertSchema(pages).omit({ id: true, createdAt: true, updatedAt: true });
const insertPostSchema = createInsertSchema(posts).omit({ id: true, createdAt: true, updatedAt: true });
const insertCategorySchema = createInsertSchema(categories).omit({ id: true, createdAt: true, updatedAt: true });
const insertSeoMetaSchema = createInsertSchema(seoMeta).omit({ id: true, createdAt: true, updatedAt: true });
const insertContactInfoSchema = createInsertSchema(contactInfo).omit({ id: true, createdAt: true, updatedAt: true });
const insertOfferingSchema = createInsertSchema(offerings).omit({ id: true, createdAt: true, updatedAt: true });
const insertNewsTickerSchema = createInsertSchema(newsTickers).omit({ id: true, createdAt: true, updatedAt: true });

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

  async getContactInfo() {
    const [info] = await db.select().from(contactInfo);
    return info || undefined;
  }

  async createContactInfo(info: any) {
    const [newInfo] = await db.insert(contactInfo).values(info).returning();
    return newInfo;
  }

  async updateContactInfo(id: string, info: any) {
    const [updatedInfo] = await db.update(contactInfo).set({ ...info, updatedAt: new Date() }).where(eq(contactInfo.id, id)).returning();
    return updatedInfo;
  }

  async getAllCategories() {
    return await db.select().from(categories).orderBy(categories.name);
  }

  async getCategoryBySlug(slug: string) {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category || undefined;
  }

  async createCategory(category: any) {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async getPublishedPostsByCategory(categoryId: string) {
    return await db
      .select()
      .from(posts)
      .innerJoin(postCategories, eq(posts.id, postCategories.postId))
      .where(and(eq(postCategories.categoryId, categoryId), eq(posts.status, "published")))
      .orderBy(desc(posts.publishedAt));
  }

  async addPostToCategory(postId: string, categoryId: string) {
    const [result] = await db.insert(postCategories).values({ postId, categoryId }).returning();
    return result;
  }

  async getAllOfferings() {
    return await db.select().from(offerings).where(eq(offerings.isPublished, true)).orderBy(offerings.order);
  }

  async getOfferingBySlug(slug: string) {
    const [offering] = await db.select().from(offerings).where(eq(offerings.slug, slug));
    return offering || undefined;
  }

  async createOffering(offering: any) {
    const [newOffering] = await db.insert(offerings).values(offering).returning();
    return newOffering;
  }

  async updateOffering(id: string, offering: any) {
    const [updatedOffering] = await db.update(offerings).set({ ...offering, updatedAt: new Date() }).where(eq(offerings.id, id)).returning();
    return updatedOffering;
  }

  async deleteOffering(id: string) {
    await db.delete(offerings).where(eq(offerings.id, id));
  }

  async getActiveNewsTickers() {
    return await db.select().from(newsTickers).where(eq(newsTickers.isActive, true)).orderBy(newsTickers.order);
  }

  async getAllNewsTickers() {
    return await db.select().from(newsTickers).orderBy(newsTickers.order);
  }

  async createNewsTicker(ticker: any) {
    const [newTicker] = await db.insert(newsTickers).values(ticker).returning();
    return newTicker;
  }

  async updateNewsTicker(id: string, ticker: any) {
    const [updatedTicker] = await db.update(newsTickers).set({ ...ticker, updatedAt: new Date() }).where(eq(newsTickers.id, id)).returning();
    return updatedTicker;
  }

  async deleteNewsTicker(id: string) {
    await db.delete(newsTickers).where(eq(newsTickers.id, id));
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

app.set('trust proxy', 1);

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
  name: 'asthawaani.sid',
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    path: "/",
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
  categoryId: z.string().nullable().optional(),
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

app.get("/api/pages/:slug", async (req, res) => {
  try {
    const page = await storage.getPageBySlug(req.params.slug);
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
    res.json(page);
  } catch (error) {
    console.error("Error fetching page:", error);
    res.status(500).json({ error: "Failed to fetch page" });
  }
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

app.get("/api/offerings", async (req, res) => {
  try {
    const offeringsList = await storage.getAllOfferings();
    res.json(offeringsList);
  } catch (error) {
    console.error("Error fetching offerings:", error);
    res.status(500).json({ error: "Failed to fetch offerings" });
  }
});

app.get("/api/news-tickers", async (req, res) => {
  try {
    const tickers = await storage.getActiveNewsTickers();
    res.json(tickers);
  } catch (error) {
    console.error("Error fetching news tickers:", error);
    res.status(500).json({ error: "Failed to fetch news tickers" });
  }
});

app.get("/api/cms/news-tickers", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const tickers = await storage.getAllNewsTickers();
    res.json(tickers);
  } catch (error) {
    console.error("Error fetching news tickers:", error);
    res.status(500).json({ error: "Failed to fetch news tickers" });
  }
});

app.post("/api/cms/news-tickers", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const data = insertNewsTickerSchema.parse(req.body);
    const ticker = await storage.createNewsTicker(data);
    res.json(ticker);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    console.error("Error creating news ticker:", error);
    res.status(500).json({ error: "Failed to create news ticker" });
  }
});

app.put("/api/cms/news-tickers/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const data = insertNewsTickerSchema.partial().parse(req.body);
    const ticker = await storage.updateNewsTicker(req.params.id, data);
    res.json(ticker);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    console.error("Error updating news ticker:", error);
    res.status(500).json({ error: "Failed to update news ticker" });
  }
});

app.delete("/api/cms/news-tickers/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    await storage.deleteNewsTicker(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting news ticker:", error);
    res.status(500).json({ error: "Failed to delete news ticker" });
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
    
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ error: "Login failed - session error" });
      }
      res.json({
        success: true,
        admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
      });
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

app.post("/api/cms/media/upload", isAuthenticated, upload.single("file"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const uploadResponse = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          public_id: req.file!.originalname.replace(/\.[^/.]+$/, ""),
          overwrite: false,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(req.file!.buffer);
    });

    const mediaItem = await storage.createMedia({
      publicId: uploadResponse.public_id,
      url: uploadResponse.url,
      secureUrl: uploadResponse.secure_url,
      filename: req.file.originalname,
      format: uploadResponse.format || "",
      width: uploadResponse.width || 0,
      height: uploadResponse.height || 0,
      bytes: uploadResponse.bytes || 0,
      altText: "",
      uploadedBy: req.session.adminId,
    });

    res.json(mediaItem);
  } catch (error) {
    console.error("Error uploading media:", error);
    res.status(500).json({ error: "Failed to upload media" });
  }
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

app.post("/api/cms/media/delete-cloudinary", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const { publicId } = req.body;
    if (!publicId) {
      return res.status(400).json({ error: "Missing publicId" });
    }
    await cloudinary.uploader.destroy(publicId);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    res.status(500).json({ error: "Failed to delete image" });
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

app.get("/api/cms/contact-info", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const info = await storage.getContactInfo();
    res.json(info || null);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    res.status(500).json({ error: "Failed to fetch contact info" });
  }
});

app.post("/api/cms/contact-info", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const data = insertContactInfoSchema.parse(req.body);
    const existing = await storage.getContactInfo();
    
    if (existing) {
      const updated = await storage.updateContactInfo(existing.id, data);
      return res.json(updated);
    }
    
    const info = await storage.createContactInfo(data);
    res.status(201).json(info);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    console.error("Error saving contact info:", error);
    res.status(500).json({ error: "Failed to save contact info" });
  }
});

app.get("/api/cms/public/contact-info", async (req: Request, res: Response) => {
  try {
    const info = await storage.getContactInfo();
    res.json(info || null);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    res.status(500).json({ error: "Failed to fetch contact info" });
  }
});

app.post("/api/admin/contact-info", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const data = insertContactInfoSchema.parse(req.body);
    const existing = await storage.getContactInfo();
    
    if (existing) {
      const updated = await storage.updateContactInfo(existing.id, data);
      return res.json(updated);
    }
    
    const info = await storage.createContactInfo(data);
    res.status(201).json(info);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Validation error", details: error.errors });
    }
    console.error("Error saving contact info:", error);
    res.status(500).json({ error: "Failed to save contact info" });
  }
});

// ============================================
// ADMIN OFFERINGS ENDPOINTS
// ============================================

// Admin: Get all offerings (including unpublished)
app.get("/api/cms/offerings", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const allOfferings = await db.select().from(offerings).orderBy(offerings.order);
    res.json(allOfferings);
  } catch (error) {
    console.error("Error fetching offerings:", error);
    res.status(500).json({ error: "Failed to fetch offerings" });
  }
});

// Admin: Create offering
app.post("/api/cms/offerings", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const validation = insertOfferingSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors });
    }
    const [offering] = await db.insert(offerings).values(validation.data).returning();
    res.status(201).json(offering);
  } catch (error) {
    console.error("Error creating offering:", error);
    res.status(500).json({ error: "Failed to create offering" });
  }
});

// Admin: Update offering
app.put("/api/cms/offerings/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("🔵 [API] PUT /api/cms/offerings/:id received");
    console.log("📥 [API] Offering ID:", id);
    console.log("📥 [API] Request body:", JSON.stringify(req.body, null, 2));
    
    const validation = insertOfferingSchema.partial().safeParse(req.body);
    console.log("🔍 [API] Validation success:", validation.success);
    
    if (!validation.success) {
      console.error("❌ [API] Validation failed:", validation.error.errors);
      return res.status(400).json({ error: validation.error.errors });
    }
    
    console.log("✅ [API] Validation passed");
    const [offering] = await db.update(offerings).set({ ...validation.data, updatedAt: new Date() }).where(eq(offerings.id, id)).returning();
    console.log("💾 [API] Updated offering from database:", JSON.stringify(offering, null, 2));
    
    res.json(offering);
  } catch (error) {
    console.error("Error updating offering:", error);
    res.status(500).json({ error: "Failed to update offering" });
  }
});

// Admin: Delete offering
app.delete("/api/cms/offerings/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.delete(offerings).where(eq(offerings.id, id));
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting offering:", error);
    res.status(500).json({ error: "Failed to delete offering" });
  }
});

// ============================================
// PUBLIC BLOG ENDPOINTS
// ============================================

app.get("/api/categories", async (req: Request, res: Response) => {
  try {
    const allCategories = await storage.getAllCategories();
    res.json(allCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

app.get("/api/blog/posts", async (req: Request, res: Response) => {
  try {
    const publishedPosts = await storage.getPublishedPosts();
    res.json(publishedPosts);
  } catch (error) {
    console.error("Error fetching published posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get("/api/blog/category/:slug", async (req: Request, res: Response) => {
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

app.get("/api/blog/post/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const post = await storage.getPostBySlug(slug);
    
    if (!post || post.status !== "published") {
      return res.status(404).json({ error: "Post not found" });
    }

    const categories = await storage.getAllCategories();
    res.json({ post, categories });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

app.all("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

export default app;
