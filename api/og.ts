import type { VercelRequest, VercelResponse } from '@vercel/node';
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq } from "drizzle-orm";
import { pgTable, text, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Minimal table definitions for queries
const posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  titleHi: text("title_hi"),
  excerpt: text("excerpt"),
  content: text("content"),
  featuredImage: text("featured_image"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  status: text("status").notNull(),
  publishedAt: timestamp("published_at"),
  updatedAt: timestamp("updated_at"),
});

const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  content: text("content"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  isPublished: boolean("is_published"),
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
});
const db = drizzle(pool);

const BASE_URL = 'https://www.asthawaani.com';
const DEFAULT_IMAGE = `${BASE_URL}/opengraph.jpg`;

// Static page SEO data
const STATIC_PAGES: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Asthawaani – Online Satsang, Bhajan & Mantra Jaap from Vrindavan',
    description: 'Asthawaani is a spiritual platform from Mathura-Vrindavan offering daily satsang, bhajan kirtan, mantra jaap, and katha pravachan. Join the digital satsang today.',
  },
  '/about': {
    title: 'About Asthawaani – Spiritual Platform from Mathura Vrindavan',
    description: 'Asthawaani connects gifted Katha Vachaks, Pravaktas, Bhajan singers & spiritual speakers with seekers across India. Born from the sacred land of Braj Bhoomi.',
  },
  '/services': {
    title: 'Our Services – Satsang, Katha, Bhajan, Mantra Jaap | Asthawaani',
    description: 'Explore Asthawaani spiritual services: Daily Satsang, Katha Pravachan, Bhajan Kirtan, Mantra Jaap, Navgrah Shanti, Morning Aarti & community from Vrindavan.',
  },
  '/brajbhoomi': {
    title: 'Braj Bhoomi – Sacred Places of Mathura, Vrindavan & Gokul | Asthawaani',
    description: 'Explore the sacred Braj Bhoomi through Asthawaani. Spiritual presence in Mathura, Vrindavan, Gokul, Govardhan, Mahavan & Barsana with authentic satsang & wisdom.',
  },
  '/blog': {
    title: 'Spiritual Blog – Mantra Jaap, Satsang & Vedic Wisdom | Asthawaani',
    description: 'Read articles on mantra jaap, navgrah shanti, daily satsang, bhakti yoga, meditation and Vedic spiritual wisdom. Guidance for peace and positivity by Asthawaani.',
  },
  '/videos': {
    title: 'Spiritual Videos – Satsang, Kirtan & Pravachan | Asthawaani',
    description: 'Watch satsang, bhajan kirtan, katha pravachan and spiritual discourses from Mathura-Vrindavan. Subscribe to Asthawaani YouTube channel for daily wisdom.',
  },
  '/gallery': {
    title: 'Photo Gallery – Temples & Sacred Places | Asthawaani',
    description: 'View photos of sacred temples, spiritual events, and divine moments from Mathura, Vrindavan, and Braj Bhoomi.',
  },
  '/contact': {
    title: 'Contact Asthawaani – Reach Us in Mathura, Uttar Pradesh',
    description: 'Get in touch with Asthawaani Kendra, Mathura. Call +91 76684 09246 or email us.',
  },
  '/community': {
    title: 'Spiritual Community – Join Our Sangha | Asthawaani',
    description: 'Join Asthawaani spiritual community. Connect with fellow seekers, participate in satsang, and grow on your spiritual path.',
  },
};

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildHtml(title: string, description: string, image: string, url: string, type = 'website'): string {
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>${safeTitle}</title>
<meta name="description" content="${safeDesc}"/>
<link rel="canonical" href="${url}"/>
<meta property="og:title" content="${safeTitle}"/>
<meta property="og:description" content="${safeDesc}"/>
<meta property="og:image" content="${image}"/>
<meta property="og:url" content="${url}"/>
<meta property="og:type" content="${type}"/>
<meta property="og:site_name" content="Asthawaani"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:site" content="@asthawaani"/>
<meta name="twitter:title" content="${safeTitle}"/>
<meta name="twitter:description" content="${safeDesc}"/>
<meta name="twitter:image" content="${image}"/>
</head>
<body><h1>${safeTitle}</h1><p>${safeDesc}</p></body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Get the original path from the query or header
  const originalPath = (req.query.path as string) || req.url?.replace('/api/og', '') || '/';
  const path = originalPath.startsWith('/') ? originalPath : `/${originalPath}`;

  try {
    // Blog post
    const blogMatch = path.match(/^\/blog\/([^/]+)$/);
    if (blogMatch) {
      const slug = blogMatch[1];
      const [post] = await db.select().from(posts).where(eq(posts.slug, slug));

      if (post && post.status === 'published') {
        const title = post.metaTitle || `${post.title} | Asthawaani`;
        const description = post.metaDescription || post.excerpt || post.title;
        const image = post.featuredImage
          ? (post.featuredImage.startsWith('http') ? post.featuredImage : `${BASE_URL}${post.featuredImage}`)
          : DEFAULT_IMAGE;

        return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8')
          .send(buildHtml(title, description, image, `${BASE_URL}/blog/${slug}`, 'article'));
      }
    }

    // Static pages
    if (STATIC_PAGES[path]) {
      const page = STATIC_PAGES[path];
      return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8')
        .send(buildHtml(page.title, page.description, DEFAULT_IMAGE, `${BASE_URL}${path}`));
    }

    // Dynamic CMS page
    const slug = path.replace(/^\//, '');
    if (slug && !slug.includes('/')) {
      const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
      if (page && page.isPublished) {
        const title = page.metaTitle || `${page.title} | Asthawaani`;
        const description = page.metaDescription || page.title;
        return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8')
          .send(buildHtml(title, description, DEFAULT_IMAGE, `${BASE_URL}/${slug}`));
      }
    }

    // Fallback
    return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8')
      .send(buildHtml(
        'Asthawaani – Online Satsang, Bhajan & Mantra Jaap from Vrindavan',
        'Asthawaani is a spiritual platform from Mathura-Vrindavan offering daily satsang, bhajan kirtan, mantra jaap, and katha pravachan.',
        DEFAULT_IMAGE,
        `${BASE_URL}${path}`
      ));
  } catch (error) {
    console.error('OG handler error:', error);
    return res.status(200).setHeader('Content-Type', 'text/html; charset=utf-8')
      .send(buildHtml('Asthawaani', 'Spiritual platform from Mathura-Vrindavan', DEFAULT_IMAGE, `${BASE_URL}${path}`));
  }
}
