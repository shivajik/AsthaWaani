'use client';

import Link from 'next/link';
import { useLanguage } from '../../lib/language-context';

type Post = {
  slug: string;
  title: string;
  titleHi: string | null;
  excerpt: string | null;
  excerptHi: string | null;
  content: string | null;
  contentHi: string | null;
  featuredImage: string | null;
  publishedAt: string | null;
};
type Ad = { id: string; titleEn: string; imageUrl: string; link?: string | null; imageWidth?: number | null };
type Category = { id: string; name: string; nameHi: string | null };

const tx = {
  back: { en: '← Back to Blog', hi: '← ब्लॉग पर वापस' },
  categories: { en: 'Categories', hi: 'श्रेणियाँ' },
  all: { en: 'All', hi: 'सभी' },
  ad: { en: 'Ad', hi: 'विज्ञापन' },
  advertisement: { en: 'Advertisement', hi: 'विज्ञापन' },
  ctaTitle: { en: 'Ready to begin your spiritual journey?', hi: 'क्या आप अपनी आध्यात्मिक यात्रा शुरू करने को तैयार हैं?' },
  subscribe: { en: 'Subscribe on YouTube', hi: 'यूट्यूब पर सब्सक्राइब करें' },
  contact: { en: 'Contact Us', hi: 'संपर्क करें' },
};

export function BlogPostClient({ post, topAds, sidebarAds, bottomAds, categories }: {
  post: Post; topAds: Ad[]; sidebarAds: Ad[]; bottomAds: Ad[]; categories: Category[];
}) {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  const pick = (en: string | null, hi: string | null) => (isHi && hi && hi.trim() ? hi : en) || '';
  const locale = isHi ? 'hi-IN' : 'en-IN';

  const title = pick(post.title, post.titleHi);
  const excerpt = pick(post.excerpt, post.excerptHi);
  const content = pick(post.content, post.contentHi);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <div className="sticky top-28 space-y-8">
              <div>
                <h2 className="text-lg font-serif font-bold mb-4">{isHi ? tx.categories.hi : tx.categories.en}</h2>
                <div className="flex flex-col gap-2">
                  <Link href="/blog" className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:border-amber-400 hover:text-amber-600 transition-colors bg-white">
                    {isHi ? tx.all.hi : tx.all.en}
                  </Link>
                  {categories.map((cat) => (
                    <Link key={cat.id} href={`/blog?category=${cat.id}`} className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:border-amber-400 hover:text-amber-600 transition-colors bg-white">
                      {isHi && cat.nameHi ? cat.nameHi : cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              {sidebarAds.length > 0 && (
                <div className="space-y-4">
                  {sidebarAds.map((ad) => (
                    <a key={ad.id} href={ad.link || '#'} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="relative rounded-md overflow-hidden">
                        <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-0.5 rounded z-10">{isHi ? tx.ad.hi : tx.ad.en}</span>
                        <img src={ad.imageUrl} alt={ad.titleEn} className="w-full h-auto" style={{ maxWidth: ad.imageWidth ? `${ad.imageWidth}px` : '100%' }} />
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </aside>

          <div className="md:col-span-3">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[hsl(225,55%,35%)] mb-8">
              {isHi ? tx.back.hi : tx.back.en}
            </Link>

            {topAds.length > 0 && (
              <div className="mb-6 space-y-3">
                {topAds.map((ad) => (
                  <a key={ad.id} href={ad.link || '#'} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative rounded-md overflow-hidden inline-block">
                      <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">{isHi ? tx.advertisement.hi : tx.advertisement.en}</span>
                      <img src={ad.imageUrl} alt={ad.titleEn} className="w-full h-auto" style={{ maxWidth: ad.imageWidth ? `${ad.imageWidth}px` : '100%' }} />
                    </div>
                  </a>
                ))}
              </div>
            )}

            <article>
              {post.featuredImage && (
                <div className="w-full h-80 md:h-96 overflow-hidden rounded-xl mb-8">
                  <img src={post.featuredImage} alt={title} className="w-full h-full object-cover" />
                </div>
              )}

              <h1 className="text-3xl md:text-5xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">{title}</h1>

              {post.publishedAt && (
                <p className="text-sm text-gray-400 mb-8">
                  {new Date(post.publishedAt).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}

              {excerpt && <p className="text-lg text-gray-600 italic mb-8">{excerpt}</p>}

              {content && (
                <div
                  className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[hsl(225,55%,35%)] prose-a:text-amber-600 prose-strong:text-gray-800 prose-ul:list-disc prose-ol:list-decimal"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )}
            </article>

            {bottomAds.length > 0 && (
              <div className="mt-8 space-y-3">
                {bottomAds.map((ad) => (
                  <a key={ad.id} href={ad.link || '#'} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="relative rounded-md overflow-hidden inline-block">
                      <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">{isHi ? tx.advertisement.hi : tx.advertisement.en}</span>
                      <img src={ad.imageUrl} alt={ad.titleEn} className="w-full h-auto" style={{ maxWidth: ad.imageWidth ? `${ad.imageWidth}px` : '100%' }} />
                    </div>
                  </a>
                ))}
              </div>
            )}

            <div className="mt-16 rounded-xl bg-amber-50 py-10 px-6 text-center">
              <h2 className="text-2xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">{isHi ? tx.ctaTitle.hi : tx.ctaTitle.en}</h2>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <a href="https://www.youtube.com/@asthawaani?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm">
                  {isHi ? tx.subscribe.hi : tx.subscribe.en}
                </a>
                <Link href="/contact" className="inline-flex items-center gap-2 border border-[hsl(225,55%,35%)] text-[hsl(225,55%,35%)] hover:bg-[hsl(225,55%,35%)] hover:text-white font-semibold px-5 py-2.5 rounded-full transition-colors text-sm">
                  {isHi ? tx.contact.hi : tx.contact.en}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
