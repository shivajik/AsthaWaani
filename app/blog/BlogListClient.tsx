'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useLanguage } from '../lib/language-context';

type Post = {
  id: string;
  slug: string;
  title: string;
  titleHi: string | null;
  categoryId: string | null;
  excerpt: string | null;
  excerptHi: string | null;
  featuredImage: string | null;
  publishedAt: string | null;
};
type Ad = { id: string; titleEn: string; imageUrl: string; link?: string | null };
type Category = { id: string; name: string; nameHi: string | null };

const t = {
  blog: { en: 'Blog', hi: 'ब्लॉग' },
  categories: { en: 'Categories', hi: 'श्रेणियाँ' },
  all: { en: 'All', hi: 'सभी' },
  sponsored: { en: 'Sponsored', hi: 'प्रायोजित' },
  bannerPlaceholder: { en: 'Asthawaani Banner', hi: 'आस्थावाणी बैनर' },
  noPosts: { en: 'No blog posts yet. Check back soon!', hi: 'अभी कोई ब्लॉग पोस्ट नहीं। जल्द ही जाँचें!' },
};

export function BlogListClient({ posts, ads, categories }: { posts: Post[]; ads: Ad[]; categories: Category[] }) {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const pick = (en: string, hi: string | null) => (isHi && hi && hi.trim() ? hi : en);
  const locale = isHi ? 'hi-IN' : 'en-IN';
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const catMap = useMemo(() => {
    const m: Record<string, Category> = {};
    categories.forEach((c) => { m[c.id] = c; });
    return m;
  }, [categories]);
  const filtered = activeCat ? posts.filter((p) => p.categoryId === activeCat) : posts;

  return (
    <main className="min-h-screen pt-32 md:pt-36 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">{isHi ? t.blog.hi : t.blog.en}</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-28">
              <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-3">{isHi ? t.categories.hi : t.categories.en}</h3>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  <button
                    onClick={() => setActiveCat(null)}
                    className={`px-4 py-2 text-sm rounded-lg border transition-colors text-left ${activeCat === null ? 'bg-[hsl(225,55%,35%)] text-white border-[hsl(225,55%,35%)]' : 'bg-white border-gray-200 hover:border-amber-400 hover:text-amber-600'}`}
                  >
                    {isHi ? t.all.hi : t.all.en}
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCat(cat.id)}
                      className={`px-4 py-2 text-sm rounded-lg border transition-colors text-left ${activeCat === cat.id ? 'bg-[hsl(225,55%,35%)] text-white border-[hsl(225,55%,35%)]' : 'bg-white border-gray-200 hover:border-amber-400 hover:text-amber-600'}`}
                    >
                      {pick(cat.name, cat.nameHi)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hidden lg:block">
                {ads.length > 0 ? (
                  ads.map((ad) => (
                    <div key={ad.id} className="mb-4">
                      <a href={ad.link || '#'} target="_blank" rel="noopener noreferrer">
                        <div className="relative rounded-lg overflow-hidden border border-amber-200">
                          <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-semibold px-2 py-0.5 rounded z-10">{isHi ? t.sponsored.hi : t.sponsored.en}</span>
                          <img src={ad.imageUrl} alt={ad.titleEn} className="w-full h-auto" />
                        </div>
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-center">
                    <p className="text-xs text-amber-600 font-medium mb-2">{isHi ? t.sponsored.hi : t.sponsored.en}</p>
                    <p className="text-gray-400 text-sm">{isHi ? t.bannerPlaceholder.hi : t.bannerPlaceholder.en}</p>
                  </div>
                )}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">{isHi ? t.noPosts.hi : t.noPosts.en}</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {filtered.map((post) => {
                  const title = pick(post.title, post.titleHi);
                  const excerpt = pick(post.excerpt || '', post.excerptHi);
                  const cat = post.categoryId ? catMap[post.categoryId] : undefined;
                  return (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                      <article className="rounded-xl border bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                        {post.featuredImage && (
                          <div className="h-44 overflow-hidden">
                            <img src={post.featuredImage} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                        )}
                        <div className="p-5 flex-1 flex flex-col">
                          {cat && (
                            <span className="inline-block self-start text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-1 rounded mb-2">
                              {pick(cat.name, cat.nameHi)}
                            </span>
                          )}
                          <h2 className="font-serif font-bold text-lg text-[hsl(225,55%,35%)] mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">{title}</h2>
                          {excerpt && <p className="text-gray-500 text-sm line-clamp-3 flex-1">{excerpt}</p>}
                          {post.publishedAt && (
                            <p className="text-xs text-gray-400 mt-3">
                              {new Date(post.publishedAt).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                          )}
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
