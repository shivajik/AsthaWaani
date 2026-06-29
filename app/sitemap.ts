import type { MetadataRoute } from 'next';
import { db } from './lib/db';
import { eq, desc } from 'drizzle-orm';
import { pgTable, text, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

const posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull(),
  status: text("status").notNull(),
  updatedAt: timestamp("updated_at"),
  publishedAt: timestamp("published_at"),
});

const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull(),
  isPublished: boolean("is_published"),
  updatedAt: timestamp("updated_at"),
});

const categoriesTable = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull(),
  updatedAt: timestamp("updated_at"),
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.asthawaani.com';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/brajbhoomi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/videos`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/community`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/apply-vakta`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/join-partners`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Brajbhoomi sub-pages (static slugs)
  const { placeSlugs } = await import('./brajbhoomi/[slug]/content');
  const brajPages: MetadataRoute.Sitemap = placeSlugs.map((slug) => ({
    url: `${baseUrl}/brajbhoomi/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Services sub-pages (static slugs)
  let servicePages: MetadataRoute.Sitemap = [];
  try {
    const { serviceSlugs } = await import('./services/[slug]/content');
    servicePages = serviceSlugs.map((slug: string) => ({
      url: `${baseUrl}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch {}

  // Blog posts from database
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const publishedPosts = await db.select().from(posts).where(eq(posts.status, 'published')).orderBy(desc(posts.publishedAt));
    blogPosts = publishedPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error('Sitemap: failed to fetch posts', e);
  }

  // Blog categories from database
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const cats = await db.select().from(categoriesTable);
    categoryPages = cats.map((c) => ({
      url: `${baseUrl}/blog?category=${c.slug}`,
      lastModified: c.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }));
  } catch (e) {
    console.error('Sitemap: failed to fetch categories', e);
  }

  return [...staticPages, ...brajPages, ...servicePages, ...blogPosts, ...categoryPages];
}
