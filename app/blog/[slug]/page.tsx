import type { Metadata } from 'next';
import { db } from '../../lib/db';
import { eq } from 'drizzle-orm';
import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';
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
  publishedAt: timestamp("published_at"),
  updatedAt: timestamp("updated_at"),
});

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata dynamically from the database
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

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[hsl(225,55%,35%)] mb-8">
          ← Back to Blog
        </Link>

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
            <p className="text-lg text-gray-600 italic mb-8 border-l-4 border-amber-400 pl-4">{post.excerpt}</p>
          )}

          {post.content && (
            <div
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[hsl(225,55%,35%)] prose-a:text-amber-600"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}
        </article>

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

      {/* JSON-LD for blog post */}
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
