import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { and, eq } from 'drizzle-orm';
import { boolean, integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { db } from '../../app/lib/db';
import { BlogPostClient } from '../../app/blog/[slug]/BlogPostClient';

const posts = pgTable('posts', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  titleHi: text('title_hi'),
  excerpt: text('excerpt'),
  excerptHi: text('excerpt_hi'),
  content: text('content'),
  contentHi: text('content_hi'),
  featuredImage: text('featured_image'),
  metaTitle: text('meta_title'),
  metaDescription: text('meta_description'),
  status: text('status').notNull(),
  categoryId: varchar('category_id'),
  authorId: varchar('author_id'),
  publishedAt: timestamp('published_at'),
  updatedAt: timestamp('updated_at'),
});

const adminsTable = pgTable('admins', {
  id: varchar('id').primaryKey(),
  name: text('name').notNull(),
});

const ads = pgTable('ads', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  titleEn: text('title_en').notNull(),
  imageUrl: text('image_url').notNull(),
  imageWidth: integer('image_width'),
  imageHeight: integer('image_height'),
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

type BlogPostProps = {
  slug: string;
  post: {
    slug: string;
    title: string;
    titleHi: string | null;
    excerpt: string | null;
    excerptHi: string | null;
    content: string | null;
    contentHi: string | null;
    featuredImage: string | null;
    categoryId: string | null;
    publishedAt: string | null;
    updatedAt: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    authorName: string | null;
  };
  topAds: Array<{ id: string; titleEn: string; imageUrl: string; link: string | null; imageWidth: number | null }>;
  sidebarAds: Array<{ id: string; titleEn: string; imageUrl: string; link: string | null; imageWidth: number | null }>;
  bottomAds: Array<{ id: string; titleEn: string; imageUrl: string; link: string | null; imageWidth: number | null }>;
  categories: Array<{ id: string; name: string; nameHi: string | null }>;
};

const sanitizeAd = (a: any) => ({
  id: a.id,
  titleEn: a.titleEn,
  imageUrl: a.imageUrl,
  link: a.link ?? null,
  imageWidth: a.imageWidth ?? null,
});

export const getServerSideProps: GetServerSideProps<BlogPostProps> = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  let post: any;

  try {
    [post] = await db.select().from(posts).where(eq(posts.slug, slug));
  } catch {
    try {
      const rows = await db.execute(sql`select id, slug, title, null as "titleHi", excerpt, null as "excerptHi", content, null as "contentHi", featured_image as "featuredImage", meta_title as "metaTitle", meta_description as "metaDescription", status, category_id as "categoryId", published_at as "publishedAt", updated_at as "updatedAt" from posts where slug = ${slug} limit 1`);
      post = (rows as any).rows?.[0] ?? (Array.isArray(rows) ? rows[0] : undefined);
    } catch {}
  }

  if (!post || post.status !== 'published') {
    return { notFound: true };
  }

  let topAds: any[] = [];
  let sidebarAds: any[] = [];
  let bottomAds: any[] = [];
  let categories: any[] = [];

  try {
    topAds = await db.select().from(ads).where(and(eq(ads.isActive, true), eq(ads.placement, 'blog_post_top')));
    sidebarAds = await db.select().from(ads).where(and(eq(ads.isActive, true), eq(ads.placement, 'blog_post_sidebar')));
    bottomAds = await db.select().from(ads).where(and(eq(ads.isActive, true), eq(ads.placement, 'blog_post_bottom')));
  } catch {}

  try {
    categories = await db.select().from(categoriesTable);
  } catch {
    try {
      const rows = await db.execute(sql`select id, slug, name, null as "nameHi" from categories`);
      categories = (rows as any).rows ?? (Array.isArray(rows) ? rows : []);
    } catch {}
  }

  let authorName: string | null = null;
  if (post.authorId) {
    try {
      const [a] = await db.select().from(adminsTable).where(eq(adminsTable.id, post.authorId));
      authorName = a?.name ?? null;
    } catch {
      try {
        const rows: any = await db.execute(sql`select name from admins where id = ${post.authorId} limit 1`);
        authorName = rows.rows?.[0]?.name ?? rows?.[0]?.name ?? null;
      } catch {}
    }
  }

  return {
    props: {
      slug,
      post: {
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
        updatedAt: post.updatedAt ? new Date(post.updatedAt).toISOString() : null,
        metaTitle: post.metaTitle ?? null,
        metaDescription: post.metaDescription ?? null,
        authorName,
      },
      topAds: topAds.map(sanitizeAd),
      sidebarAds: sidebarAds.map(sanitizeAd),
      bottomAds: bottomAds.map(sanitizeAd),
      categories: categories.map((c: any) => ({ id: c.id, name: c.name, nameHi: c.nameHi ?? null })),
    },
  };
};

export default function BlogPostPage({ slug, post, topAds, sidebarAds, bottomAds, categories }: BlogPostProps) {
  const title = post.metaTitle || `${post.title} | Asthawaani`;
  const description = post.metaDescription || post.excerpt || post.title;
  const image = post.featuredImage || 'https://www.asthawaani.com/opengraph.jpg';
  const ogImage = image.startsWith('http') ? image : `https://www.asthawaani.com${image}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://www.asthawaani.com/blog/${slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://www.asthawaani.com/blog/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={ogImage} />
        {post.publishedAt && <meta property="article:published_time" content={post.publishedAt} />}
        {post.updatedAt && <meta property="article:modified_time" content={post.updatedAt} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description,
              image: ogImage,
              ...(post.publishedAt && { datePublished: post.publishedAt }),
              ...(post.updatedAt && { dateModified: post.updatedAt }),
              author: {
                '@type': 'Person',
                name: post.authorName || 'Asthawaani Editorial',
                url: 'https://www.asthawaani.com/author',
              },
              publisher: { '@type': 'Organization', name: 'Asthawaani', logo: { '@type': 'ImageObject', url: 'https://www.asthawaani.com/logo.png' } },
              mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.asthawaani.com/blog/${slug}` },
              inLanguage: ['en', 'hi'],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.asthawaani.com/' },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.asthawaani.com/blog' },
                { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.asthawaani.com/blog/${slug}` },
              ],
            }),
          }}
        />
        <link rel="alternate" type="application/rss+xml" title="Asthawaani Blog" href="https://www.asthawaani.com/rss.xml" />
      </Head>
      <BlogPostClient post={post} topAds={topAds} sidebarAds={sidebarAds} bottomAds={bottomAds} categories={categories} />
    </>
  );
}