import type { Metadata } from 'next';
import { db } from '../lib/db';
import { eq, desc, and } from 'drizzle-orm';
import { pgTable, text, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { BlogListClient } from './BlogListClient';

export const metadata: Metadata = {
  title: 'Spiritual Blog – Mantra Jaap, Satsang & Vedic Wisdom | Asthawaani',
  description: 'Read articles on mantra jaap, navgrah shanti, daily satsang, bhakti yoga, meditation and Vedic spiritual wisdom. Guidance for peace and positivity by Asthawaani.',
  openGraph: {
    title: 'Spiritual Blog – Mantra Jaap, Satsang & Vedic Wisdom | Asthawaani',
    description: 'Read articles on mantra jaap, navgrah shanti, daily satsang, bhakti yoga, meditation and Vedic spiritual wisdom.',
    url: 'https://www.asthawaani.com/blog',
    type: 'website',
    images: [{ url: 'https://www.asthawaani.com/opengraph.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.asthawaani.com/blog' },
};

const posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  titleHi: text("title_hi"),
  excerpt: text("excerpt"),
  excerptHi: text("excerpt_hi"),
  featuredImage: text("featured_image"),
  categoryId: varchar("category_id"),
  status: text("status").notNull(),
  publishedAt: timestamp("published_at"),
});

const ads = pgTable("ads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text("title_en").notNull(),
  imageUrl: text("image_url").notNull(),
  link: text("link"),
  isActive: boolean("is_active").notNull(),
  placement: text("placement").notNull(),
  position: integer("position").notNull(),
});

const categoriesTable = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  nameHi: text("name_hi"),
});

export default async function BlogPage() {
  let allPosts: any[] = [];
  let sidebarAds: any[] = [];
  let dbCategories: any[] = [];
  try {
    allPosts = await db.select().from(posts).where(eq(posts.status, 'published')).orderBy(desc(posts.publishedAt));
  } catch {}
  try {
    sidebarAds = await db.select().from(ads).where(and(eq(ads.isActive, true), eq(ads.placement, 'blog_listing')));
  } catch {}
  try {
    dbCategories = await db.select().from(categoriesTable);
  } catch {}

  const sPosts = allPosts.map((p: any) => ({
    id: p.id, slug: p.slug, title: p.title, titleHi: p.titleHi ?? null,
    categoryId: p.categoryId ?? null,
    excerpt: p.excerpt ?? null, excerptHi: p.excerptHi ?? null,
    featuredImage: p.featuredImage ?? null,
    publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : null,
  }));
  const sAds = sidebarAds.map((a: any) => ({ id: a.id, titleEn: a.titleEn, imageUrl: a.imageUrl, link: a.link ?? null }));
  const sCats = dbCategories.map((c: any) => ({ id: c.id, name: c.name, nameHi: c.nameHi ?? null }));

  return <BlogListClient posts={sPosts} ads={sAds} categories={sCats} />;
}
