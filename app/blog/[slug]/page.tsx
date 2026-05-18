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
});

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

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="sticky top-28 space-y-8">
              {/* Categories */}
              <div>
                <h2 className="text-lg font-serif font-bold mb-4">Categories</h2>
                <div className="flex flex-col gap-2">
                  <Link href="/blog" className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:border-amber-400 hover:text-amber-600 transition-colors bg-white">
                    All
                  </Link>
                  {categories.map((cat: any) => (
                    <Link key={cat.id} href={`/blog?category=${cat.id}`} className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:border-amber-400 hover:text-amber-600 transition-colors bg-white">
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sidebar Ads */}
              {sidebarAds.length > 0 && (
                <div className="space-y-4">
                  {sidebarAds.map((ad: any) => (
                    <a key={ad.id} href={ad.link || '#'} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="relative rounded-md overflow-hidden">
                        <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded z-10">Ad</span>
                        <img src={ad.imageUrl} alt={ad.titleEn} className="w-full h-auto" style={{ maxWidth: ad.imageWidth ? `${ad.imageWidth}px` : '100%' }} />
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[hsl(225,55%,35%)] mb-8">
              ← Back to Blog
            </Link>

            {/* Top Ads */}
            {topAds.length > 0 && (
              <div className="mb-6 space-y-3">
                {topAds.map((ad: any) => (
                  <a key={ad.id} href={ad.link || '#'} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative rounded-md overflow-hidden inline-block">
                      <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">Advertisement</span>
                      <img src={ad.imageUrl} alt={ad.titleEn} className="w-full h-auto" style={{ maxWidth: ad.imageWidth ? `${ad.imageWidth}px` : '100%' }} />
                    </div>
                  </a>
                ))}
              </div>
            )}

            <article>
              {post.featuredImage && (
                <div className="w-full h-80 md:h-96 overflow-hidden rounded-xl mb-8">
                  <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}

              <h1 className="text-3xl md:text-5xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">{post.title}</h1>

              {post.publishedAt && (
                <p className="text-sm text-gray-400 mb-8">
                  {new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}

              {post.excerpt && (
                <p className="text-lg text-gray-600 italic mb-8">{post.excerpt}</p>
              )}

              {post.content && (
                <div
                  className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[hsl(225,55%,35%)] prose-a:text-amber-600 prose-strong:text-gray-800 prose-ul:list-disc prose-ol:list-decimal"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}
            </article>

            {/* Bottom Ads */}
            {bottomAds.length > 0 && (
              <div className="mt-8 space-y-3">
                {bottomAds.map((ad: any) => (
                  <a key={ad.id} href={ad.link || '#'} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative rounded-md overflow-hidden inline-block">
                      <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">Advertisement</span>
                      <img src={ad.imageUrl} alt={ad.titleEn} className="w-full h-auto" style={{ maxWidth: ad.imageWidth ? `${ad.imageWidth}px` : '100%' }} />
                    </div>
                  </a>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-16 rounded-xl bg-amber-50 py-10 px-6 text-center">
              <h2 className="text-2xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">Ready to begin your spiritual journey?</h2>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <a href="https://www.youtube.com/@asthawaani?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm">
                  Subscribe on YouTube
                </a>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-[hsl(225,55%,35%)] text-[hsl(225,55%,35%)] hover:bg-[hsl(225,55%,35%)] hover:text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
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
    </main>
  );
}
