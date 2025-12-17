import { 
  type User, type InsertUser, type Video, type InsertVideo, type YoutubeChannel, type InsertYoutubeChannel,
  type Admin, type InsertAdmin, type Page, type InsertPage, type Post, type InsertPost,
  type Media, type InsertMedia, type SeoMeta, type InsertSeoMeta, type SiteSettings, type InsertSiteSettings,
  videos, youtubeChannels, users, admins, pages, posts, media, seoMeta, siteSettings
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

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

  // Admin operations
  getAdmin(id: string): Promise<Admin | undefined>;
  getAdminByEmail(email: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  getAllAdmins(): Promise<Admin[]>;

  // Page operations
  getPage(id: string): Promise<Page | undefined>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  getAllPages(): Promise<Page[]>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: string, page: Partial<InsertPage>): Promise<Page>;
  deletePage(id: string): Promise<void>;

  // Post operations
  getPost(id: string): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  getAllPosts(): Promise<Post[]>;
  getPublishedPosts(): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: string, post: Partial<InsertPost>): Promise<Post>;
  deletePost(id: string): Promise<void>;

  // Media operations
  getMedia(id: string): Promise<Media | undefined>;
  getMediaByPublicId(publicId: string): Promise<Media | undefined>;
  getAllMedia(): Promise<Media[]>;
  createMedia(mediaItem: InsertMedia): Promise<Media>;
  updateMedia(id: string, mediaItem: Partial<InsertMedia>): Promise<Media>;
  deleteMedia(id: string): Promise<void>;

  // SEO Meta operations
  getSeoMeta(entityType: string, entityId: string): Promise<SeoMeta | undefined>;
  createSeoMeta(seo: InsertSeoMeta): Promise<SeoMeta>;
  updateSeoMeta(id: string, seo: Partial<InsertSeoMeta>): Promise<SeoMeta>;
  deleteSeoMeta(id: string): Promise<void>;

  // Site Settings operations
  getSetting(key: string): Promise<SiteSettings | undefined>;
  getAllSettings(): Promise<SiteSettings[]>;
  upsertSetting(setting: InsertSiteSettings): Promise<SiteSettings>;
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

  // Admin operations
  async getAdmin(id: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.id, id));
    return admin || undefined;
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.email, email));
    return admin || undefined;
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const [newAdmin] = await db
      .insert(admins)
      .values(admin)
      .returning();
    return newAdmin;
  }

  async getAllAdmins(): Promise<Admin[]> {
    return await db.select().from(admins);
  }

  // Page operations
  async getPage(id: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page || undefined;
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    return page || undefined;
  }

  async getAllPages(): Promise<Page[]> {
    return await db.select().from(pages).orderBy(desc(pages.updatedAt));
  }

  async createPage(page: InsertPage): Promise<Page> {
    const [newPage] = await db
      .insert(pages)
      .values(page)
      .returning();
    return newPage;
  }

  async updatePage(id: string, page: Partial<InsertPage>): Promise<Page> {
    const [updatedPage] = await db
      .update(pages)
      .set({ ...page, updatedAt: new Date() })
      .where(eq(pages.id, id))
      .returning();
    return updatedPage;
  }

  async deletePage(id: string): Promise<void> {
    await db.delete(pages).where(eq(pages.id, id));
  }

  // Post operations
  async getPost(id: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post || undefined;
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post || undefined;
  }

  async getAllPosts(): Promise<Post[]> {
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async getPublishedPosts(): Promise<Post[]> {
    return await db
      .select()
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt));
  }

  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db
      .insert(posts)
      .values(post)
      .returning();
    return newPost;
  }

  async updatePost(id: string, post: Partial<InsertPost>): Promise<Post> {
    const [updatedPost] = await db
      .update(posts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return updatedPost;
  }

  async deletePost(id: string): Promise<void> {
    await db.delete(posts).where(eq(posts.id, id));
  }

  // Media operations
  async getMedia(id: string): Promise<Media | undefined> {
    const [mediaItem] = await db.select().from(media).where(eq(media.id, id));
    return mediaItem || undefined;
  }

  async getMediaByPublicId(publicId: string): Promise<Media | undefined> {
    const [mediaItem] = await db.select().from(media).where(eq(media.publicId, publicId));
    return mediaItem || undefined;
  }

  async getAllMedia(): Promise<Media[]> {
    return await db.select().from(media).orderBy(desc(media.createdAt));
  }

  async createMedia(mediaItem: InsertMedia): Promise<Media> {
    const [newMedia] = await db
      .insert(media)
      .values(mediaItem)
      .returning();
    return newMedia;
  }

  async updateMedia(id: string, mediaItem: Partial<InsertMedia>): Promise<Media> {
    const [updatedMedia] = await db
      .update(media)
      .set(mediaItem)
      .where(eq(media.id, id))
      .returning();
    return updatedMedia;
  }

  async deleteMedia(id: string): Promise<void> {
    await db.delete(media).where(eq(media.id, id));
  }

  // SEO Meta operations
  async getSeoMeta(entityType: string, entityId: string): Promise<SeoMeta | undefined> {
    const [seo] = await db
      .select()
      .from(seoMeta)
      .where(and(eq(seoMeta.entityType, entityType), eq(seoMeta.entityId, entityId)));
    return seo || undefined;
  }

  async createSeoMeta(seo: InsertSeoMeta): Promise<SeoMeta> {
    const [newSeo] = await db
      .insert(seoMeta)
      .values(seo)
      .returning();
    return newSeo;
  }

  async updateSeoMeta(id: string, seo: Partial<InsertSeoMeta>): Promise<SeoMeta> {
    const [updatedSeo] = await db
      .update(seoMeta)
      .set({ ...seo, updatedAt: new Date() })
      .where(eq(seoMeta.id, id))
      .returning();
    return updatedSeo;
  }

  async deleteSeoMeta(id: string): Promise<void> {
    await db.delete(seoMeta).where(eq(seoMeta.id, id));
  }

  // Site Settings operations
  async getSetting(key: string): Promise<SiteSettings | undefined> {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting || undefined;
  }

  async getAllSettings(): Promise<SiteSettings[]> {
    return await db.select().from(siteSettings);
  }

  async upsertSetting(setting: InsertSiteSettings): Promise<SiteSettings> {
    const existing = await this.getSetting(setting.key);
    if (existing) {
      const [updated] = await db
        .update(siteSettings)
        .set({ ...setting, updatedAt: new Date() })
        .where(eq(siteSettings.key, setting.key))
        .returning();
      return updated;
    }
    const [newSetting] = await db
      .insert(siteSettings)
      .values(setting)
      .returning();
    return newSetting;
  }
}

export const storage = new DatabaseStorage();
