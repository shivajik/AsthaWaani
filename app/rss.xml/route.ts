import { db } from '../lib/db';
import { eq, desc } from 'drizzle-orm';
import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

const posts = pgTable('posts', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  slug: text('slug').notNull(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  featuredImage: text('featured_image'),
  status: text('status').notNull(),
  publishedAt: timestamp('published_at'),
  updatedAt: timestamp('updated_at'),
});

const BASE = 'https://www.asthawaani.com';

function esc(s: string | null | undefined): string {
  if (!s) return '';
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const revalidate = 1800;

export async function GET() {
  let items: Array<{ slug: string; title: string; excerpt: string | null; featuredImage: string | null; publishedAt: Date | null; updatedAt: Date | null }> = [];
  try {
    const rows = await db
      .select()
      .from(posts)
      .where(eq(posts.status, 'published'))
      .orderBy(desc(posts.publishedAt))
      .limit(50);
    items = rows.map((r: any) => ({
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt ?? null,
      featuredImage: r.featuredImage ?? null,
      publishedAt: r.publishedAt ?? null,
      updatedAt: r.updatedAt ?? null,
    }));
  } catch (e) {
    console.error('RSS feed: failed to load posts', e);
  }

  const lastBuild = (items[0]?.publishedAt || items[0]?.updatedAt || new Date()).toUTCString();

  const itemsXml = items
    .map((p) => {
      const url = `${BASE}/blog/${p.slug}`;
      const pub = (p.publishedAt || p.updatedAt || new Date()).toUTCString();
      const img = p.featuredImage
        ? (p.featuredImage.startsWith('http') ? p.featuredImage : `${BASE}${p.featuredImage}`)
        : '';
      return [
        '    <item>',
        `      <title>${esc(p.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${pub}</pubDate>`,
        `      <description>${esc(p.excerpt || p.title)}</description>`,
        img ? `      <enclosure url="${esc(img)}" type="image/jpeg"/>` : '',
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Asthawaani – Spiritual Wisdom from Braj</title>
    <link>${BASE}</link>
    <description>Daily satsang, bhajan, mantra jaap and spiritual articles from Mathura-Vrindavan.</description>
    <language>en-IN</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${BASE}/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, s-maxage=1800, stale-while-revalidate=3600',
    },
  });
}
