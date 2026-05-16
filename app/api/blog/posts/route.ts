import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { eq, desc } from 'drizzle-orm';
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
  featuredImage: text("featured_image"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  status: text("status").notNull(),
  categoryId: varchar("category_id"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export async function GET() {
  try {
    const allPosts = await db.select().from(posts).where(eq(posts.status, 'published')).orderBy(desc(posts.publishedAt));
    return NextResponse.json(allPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
