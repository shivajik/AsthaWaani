import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { and, desc, eq } from 'drizzle-orm';
import { boolean, integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { db } from '../../app/lib/db';
import { BlogListClient } from '../../app/blog/BlogListClient';

const posts = pgTable('posts', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  titleHi: text('title_hi'),
  excerpt: text('excerpt'),
  excerptHi: text('excerpt_hi'),
  featuredImage: text('featured_image'),
  categoryId: varchar('category_id'),
  status: text('status').notNull(),
  publishedAt: timestamp('published_at'),
});

const ads = pgTable('ads', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text('title_en').notNull(),
  imageUrl: text('image_url').notNull(),
  link: text('link'),
  isActive: boolean('is_active').notNull(),
  placement: text('placement').notNull(),
  position: integer('position').notNull(),
});

const categoriesTable = pgTable('categories', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  slug: text('slug').notNull(),
  name: text('name').notNull(),
  nameHi: text('name_hi'),
});

type BlogIndexProps = {
  posts: Array<{
    id: string;
    slug: string;
    title: string;
    titleHi: string | null;
    categoryId: string | null;
    excerpt: string | null;
    excerptHi: string | null;
    featuredImage: string | null;
    publishedAt: string | null;
  }>;
  ads: Array<{ id: string; titleEn: string; imageUrl: string; link: string | null }>;
  categories: Array<{ id: string; name: string; nameHi: string | null }>;
};

export const getServerSideProps: GetServerSideProps<BlogIndexProps> = async () => {
  let allPosts: any[] = [];
  let sidebarAds: any[] = [];
  let dbCategories: any[] = [];

  try {
    allPosts = await db.select().from(posts).where(eq(posts.status, 'published')).orderBy(desc(posts.publishedAt));
  } catch {
    try {
      const rows = await db.execute(sql`select id, slug, title, null as "titleHi", excerpt, null as "excerptHi", featured_image as "featuredImage", category_id as "categoryId", published_at as "publishedAt" from posts where status = 'published' order by published_at desc`);
      allPosts = (rows as any).rows ?? (Array.isArray(rows) ? rows : []);
    } catch {}
  }

  try {
    sidebarAds = await db.select().from(ads).where(and(eq(ads.isActive, true), eq(ads.placement, 'blog_listing')));
  } catch {}

  try {
    dbCategories = await db.select().from(categoriesTable);
  } catch {
    try {
      const rows = await db.execute(sql`select id, slug, name, null as "nameHi" from categories`);
      dbCategories = (rows as any).rows ?? (Array.isArray(rows) ? rows : []);
    } catch {}
  }

  return {
    props: {
      posts: allPosts.map((p: any) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        titleHi: p.titleHi ?? null,
        categoryId: p.categoryId ?? null,
        excerpt: p.excerpt ?? null,
        excerptHi: p.excerptHi ?? null,
        featuredImage: p.featuredImage ?? null,
        publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : null,
      })),
      ads: sidebarAds.map((a: any) => ({ id: a.id, titleEn: a.titleEn, imageUrl: a.imageUrl, link: a.link ?? null })),
      categories: dbCategories.map((c: any) => ({ id: c.id, name: c.name, nameHi: c.nameHi ?? null })),
    },
  };
};

export default function BlogIndexPage(props: BlogIndexProps) {
  return (
    <>
      <Head>
        <title>Spiritual Blog – Mantra Jaap, Satsang & Vedic Wisdom | Asthawaani</title>
        <meta name="description" content="Read articles on mantra jaap, navgrah shanti, daily satsang, bhakti yoga, meditation and Vedic spiritual wisdom. Guidance for peace and positivity by Asthawaani." />
        <link rel="canonical" href="https://www.asthawaani.com/blog" />
        <meta property="og:title" content="Spiritual Blog – Mantra Jaap, Satsang & Vedic Wisdom | Asthawaani" />
        <meta property="og:description" content="Read articles on mantra jaap, navgrah shanti, daily satsang, bhakti yoga, meditation and Vedic spiritual wisdom." />
        <meta property="og:url" content="https://www.asthawaani.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.asthawaani.com/opengraph.jpg" />
      </Head>
      <BlogListClient posts={props.posts} ads={props.ads} categories={props.categories} />
    </>
  );
}