import type { Metadata } from 'next';
import { db } from '../../lib/db';
import { eq, and } from 'drizzle-orm';
import { pgTable, text, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  titleHi: text("title_hi"),
  excerpt: text("excerpt"),
  excerptHi: text("excerpt_hi"),
  content: text("content"),
  contentHi: text("content_hi"),
  featuredImage: text("featured_image"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  status: text("status").notNull(),
  categoryId: varchar("category_id"),
  publishedAt: timestamp("published_at"),
  updatedAt: timestamp("updated_at"),
});

const ads = pgTable("ads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text("title_en").notNull(),
  imageUrl: text("image_url").notNull(),
  imageWidth: integer("image_width"),
  imageHeight: integer("image_height"),
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

import { BlogPostClient } from './BlogPostClient';


type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug));

  if (!post || post.status !== 'published') {
    return { title: 'Post Not Found | Asthawaani' };
  }

  const title = post.metaTitle || `${post.title} | Asthawaani`;
  const description = post.metaDescription || post.excerpt || post.title;
  const image = post.featuredImage || 'https://www.asthawaani.com/opengraph.jpg';
  const ogImage = image.startsWith('http') ? image : `https://www.asthawaani.com${image}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.asthawaani.com/blog/${slug}`,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630 }],
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: `https://www.asthawaani.com/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug));

  if (!post || post.status !== 'published') {
    notFound();
  }

  // Fetch ads for blog post
  let topAds: any[] = [];
  let sidebarAds: any[] = [];
  let bottomAds: any[] = [];
  try {
    topAds = await db.select().from(ads).where(and(eq(ads.isActive, true), eq(ads.placement, 'blog_post_top')));
    sidebarAds = await db.select().from(ads).where(and(eq(ads.isActive, true), eq(ads.placement, 'blog_post_sidebar')));
    bottomAds = await db.select().from(ads).where(and(eq(ads.isActive, true), eq(ads.placement, 'blog_post_bottom')));
  } catch (e) { /* ignore */ }

  // Fetch categories
  let categories: any[] = [];
  try {
    categories = await db.select().from(categoriesTable);
  } catch (e) { /* ignore */ }

  const sanitizeAd = (a: any) => ({ id: a.id, titleEn: a.titleEn, imageUrl: a.imageUrl, link: a.link ?? null, imageWidth: a.imageWidth ?? null });
  const sPost = {
    slug: post.slug,
    title: post.title,
    titleHi: post.titleHi ?? null,
    excerpt: post.excerpt ?? null,
    excerptHi: post.excerptHi ?? null,
    content: post.content ?? null,
    contentHi: post.contentHi ?? null,
    featuredImage: post.featuredImage ?? null,
    categoryId: post.categoryId ?? null,
    publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : null,
  };
  const sCats = categories.map((c: any) => ({ id: c.id, name: c.name, nameHi: c.nameHi ?? null }));

  return (
    <>
      <BlogPostClient
        post={sPost}
        topAds={topAds.map(sanitizeAd)}
        sidebarAds={sidebarAds.map(sanitizeAd)}
        bottomAds={bottomAds.map(sanitizeAd)}
        categories={sCats}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt || post.title,
            ...(post.featuredImage && { "image": post.featuredImage.startsWith('http') ? post.featuredImage : `https://www.asthawaani.com${post.featuredImage}` }),
            ...(post.publishedAt && { "datePublished": post.publishedAt.toISOString() }),
            ...(post.updatedAt && { "dateModified": post.updatedAt.toISOString() }),
            "author": { "@type": "Organization", "name": "Asthawaani" },
            "publisher": { "@type": "Organization", "name": "Asthawaani", "logo": { "@type": "ImageObject", "url": "https://www.asthawaani.com/logo.png" } },
            "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.asthawaani.com/blog/${slug}` },
          }),
        }}
      />
    </>
  );
}

