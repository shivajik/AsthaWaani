import type { Metadata } from 'next';
import { db } from '../lib/db';
import { eq, desc, and } from 'drizzle-orm';
import { pgTable, text, varchar, integer, boolean, timestamp } from 'drizzle-orm/pg-core';
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
});

export default async function BlogPage() {
  const allPosts = await db.select().from(posts).where(eq(posts.status, 'published')).orderBy(desc(posts.publishedAt));
  
  // Fetch sidebar ads
  let sidebarAds: any[] = [];
  try {
    sidebarAds = await db.select().from(ads).where(and(eq(ads.isActive, true), eq(ads.placement, 'blog_listing')));
  } catch (e) { /* ignore */ }

  // Fetch categories
  let dbCategories: any[] = [];
  try {
    dbCategories = await db.select().from(categoriesTable);
  } catch (e) { /* ignore */ }

  const categoryNames = dbCategories.length > 0 
    ? ['All', ...dbCategories.map((c: any) => c.name)]
    : ['All', 'Devotion', 'Meditation', 'Spirituality'];

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">Blog</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-28">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-3">Categories</h3>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  {categoryNames.map((cat) => (
                    <button
                      key={cat}
                      className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:border-amber-400 hover:text-amber-600 transition-colors text-left bg-white"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ad placeholder */}
              <div className="hidden lg:block">
                {sidebarAds.length > 0 ? (
                  sidebarAds.map((ad: any) => (
                    <div key={ad.id} className="mb-4">
                      <a href={ad.link || '#'} target="_blank" rel="noopener noreferrer">
                        <div className="relative rounded-lg overflow-hidden border border-amber-200">
                          <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-semibold px-2 py-0.5 rounded z-10">Sponsored</span>
                          <img src={ad.imageUrl} alt={ad.titleEn} className="w-full h-auto" />
                        </div>
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                    <p className="text-xs text-amber-600 font-medium mb-2">Sponsored</p>
                    <p className="text-gray-400 text-sm">Asthawaani Banner</p>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Blog Posts Grid */}
          <div className="flex-1">
            {allPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {allPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                    <article className="rounded-xl border bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                      {post.featuredImage && (
                        <div className="h-44 overflow-hidden">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col">
                        <h2 className="font-serif font-bold text-lg text-[hsl(225,55%,35%)] mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-gray-500 text-sm line-clamp-3 flex-1">{post.excerpt}</p>
                        )}
                        {post.publishedAt && (
                          <p className="text-xs text-gray-400 mt-3">
                            {new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        )}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
