import type { Metadata } from 'next';
import { db } from '../lib/db';
import { eq, desc } from 'drizzle-orm';
import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import Link from 'next/link';

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
  featuredImage: text("featured_image"),
  status: text("status").notNull(),
  publishedAt: timestamp("published_at"),
});

export default async function BlogPage() {
  const allPosts = await db.select().from(posts).where(eq(posts.status, 'published')).orderBy(desc(posts.publishedAt));

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">Spiritual Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Read articles on mantra jaap, navgrah shanti, daily satsang, bhakti yoga, meditation and Vedic spiritual wisdom.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <article className="rounded-xl border bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                {post.featuredImage && (
                  <div className="h-48 overflow-hidden">
                    <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="font-serif font-bold text-lg text-[hsl(225,55%,35%)] mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">{post.title}</h2>
                  {post.excerpt && <p className="text-gray-500 text-sm line-clamp-3 flex-1">{post.excerpt}</p>}
                  {post.publishedAt && (
                    <p className="text-xs text-gray-400 mt-4">{new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
