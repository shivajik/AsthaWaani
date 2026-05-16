import { NextResponse } from 'next/server';
import { db } from '../../../../lib/db';
import { eq } from 'drizzle-orm';
import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  try {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    
    if (!post || post.status !== 'published') {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
