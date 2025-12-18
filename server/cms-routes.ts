import { Router, Request, Response } from "express";
import { z } from "zod";
import sanitizeHtml from "sanitize-html";
import multer from "multer";
import rateLimit from "express-rate-limit";
import { storage } from "./storage";
import { isAuthenticated, loginAdmin } from "./auth";
import { uploadImage, deleteImage } from "./cloudinary";
import { insertPageSchema, insertPostSchema, insertSeoMetaSchema, insertContactInfoSchema } from "@shared/schema";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed."));
    }
  },
});

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

function sanitizeContent(content: string): string {
  return sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img", "h1", "h2", "h3", "h4", "h5", "h6", "figure", "figcaption"
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "title", "width", "height", "loading"],
      a: ["href", "target", "rel"],
      "*": ["class", "id", "style"],
    },
    allowedSchemes: ["http", "https", "data"],
    disallowedTagsMode: 'discard',
    textFilter: (text) => text,
    nonTextTags: ['style', 'script', 'textarea', 'noscript', 'pre'],
  });
}

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

router.use(apiLimiter);

router.post("/auth/login", loginLimiter, async (req: Request, res: Response) => {
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
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/auth/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ success: true });
  });
});

router.get("/auth/me", isAuthenticated, (req: Request, res: Response) => {
  res.json({ 
    admin: {
      id: req.session.adminId,
      email: req.session.adminEmail,
      name: req.session.adminName,
      role: req.session.adminRole,
    }
  });
});

router.get("/pages", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const pages = await storage.getAllPages();
    res.json(pages);
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ error: "Failed to fetch pages" });
  }
});

router.get("/pages/:id", isAuthenticated, async (req: Request, res: Response) => {
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

router.post("/pages", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const data = insertPageSchema.parse(req.body);
    if (data.content) {
      data.content = sanitizeContent(data.content);
    }
    if (data.contentHi) {
      data.contentHi = sanitizeContent(data.contentHi);
    }
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

router.put("/pages/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const existing = await storage.getPage(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "Page not found" });
    }
    
    const validated = updatePageSchema.parse(req.body);
    
    if (validated.content) {
      validated.content = sanitizeContent(validated.content);
    }
    if (validated.contentHi) {
      validated.contentHi = sanitizeContent(validated.contentHi);
    }
    
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

router.delete("/pages/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    await storage.deletePage(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting page:", error);
    res.status(500).json({ error: "Failed to delete page" });
  }
});

router.get("/posts", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const posts = await storage.getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/posts/:id", isAuthenticated, async (req: Request, res: Response) => {
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

router.post("/posts", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const data = insertPostSchema.parse(req.body);
    if (data.content) {
      data.content = sanitizeContent(data.content);
    }
    if (data.contentHi) {
      data.contentHi = sanitizeContent(data.contentHi);
    }
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

router.put("/posts/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const existing = await storage.getPost(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: "Post not found" });
    }
    
    const validated = updatePostSchema.parse(req.body);
    
    if (validated.content) {
      validated.content = sanitizeContent(validated.content);
    }
    if (validated.contentHi) {
      validated.contentHi = sanitizeContent(validated.contentHi);
    }
    
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

router.delete("/posts/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    await storage.deletePost(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

router.get("/media", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const mediaItems = await storage.getAllMedia();
    res.json(mediaItems);
  } catch (error) {
    console.error("Error fetching media:", error);
    res.status(500).json({ error: "Failed to fetch media" });
  }
});

router.post("/media/upload", isAuthenticated, upload.single("file"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return res.status(500).json({ error: "Cloudinary credentials not configured" });
    }

    const existing = await storage.getMediaByPublicId(req.file.originalname);
    if (existing) {
      return res.status(409).json({ error: "File with this name already exists", existing });
    }

    const result = await uploadImage(req.file.buffer, req.file.originalname);

    const mediaItem = await storage.createMedia({
      publicId: result.publicId,
      url: result.url,
      secureUrl: result.secureUrl,
      filename: req.file.originalname,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes,
      altText: req.body.altText || null,
      uploadedBy: req.session.adminId || null,
    });

    res.status(201).json(mediaItem);
  } catch (error) {
    console.error("Error uploading media:", error);
    res.status(500).json({ error: "Failed to upload media" });
  }
});

const updateMediaSchema = z.object({
  altText: z.string().nullable().optional(),
});

router.put("/media/:id", isAuthenticated, async (req: Request, res: Response) => {
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

router.delete("/media/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const mediaItem = await storage.getMedia(req.params.id);
    if (!mediaItem) {
      return res.status(404).json({ error: "Media not found" });
    }

    await deleteImage(mediaItem.publicId);
    await storage.deleteMedia(req.params.id);
    
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting media:", error);
    res.status(500).json({ error: "Failed to delete media" });
  }
});

router.get("/seo/:entityType/:entityId", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const seo = await storage.getSeoMeta(req.params.entityType, req.params.entityId);
    res.json(seo || null);
  } catch (error) {
    console.error("Error fetching SEO meta:", error);
    res.status(500).json({ error: "Failed to fetch SEO meta" });
  }
});

router.post("/seo", isAuthenticated, async (req: Request, res: Response) => {
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

router.put("/seo/:id", isAuthenticated, async (req: Request, res: Response) => {
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

router.get("/settings", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const settings = await storage.getAllSettings();
    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

router.post("/settings", isAuthenticated, async (req: Request, res: Response) => {
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

router.get("/public/posts", async (req: Request, res: Response) => {
  try {
    const posts = await storage.getPublishedPosts();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching published posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/public/posts/:slug", async (req: Request, res: Response) => {
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

router.get("/public/pages/:slug", async (req: Request, res: Response) => {
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

// Contact Info endpoints
router.get("/contact-info", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const info = await storage.getContactInfo();
    res.json(info || null);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    res.status(500).json({ error: "Failed to fetch contact info" });
  }
});

router.post("/contact-info", isAuthenticated, async (req: Request, res: Response) => {
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

// Public endpoint to get contact info
router.get("/public/contact-info", async (req: Request, res: Response) => {
  try {
    const info = await storage.getContactInfo();
    res.json(info || null);
  } catch (error) {
    console.error("Error fetching contact info:", error);
    res.status(500).json({ error: "Failed to fetch contact info" });
  }
});

export default router;
