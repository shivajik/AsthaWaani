'use client';

import { CmsContent } from '../components/CmsContent';
import { useLanguage, useCmsPage } from '../lib/language-context';

export default function GalleryClient() {
  const { language } = useLanguage();
  const { title } = useCmsPage('gallery');
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">{title || (language === 'hi' ? 'फोटो गैलरी' : 'Photo Gallery')}</h1>
        <CmsContent slug="gallery" bodyOnly fallback={<p className="text-gray-600">{language === 'hi' ? 'ब्रजभूमि के पवित्र मंदिर, आध्यात्मिक कार्यक्रम और दिव्य क्षण।' : 'Sacred temples, spiritual events, and divine moments from Braj Bhoomi.'}</p>} />
      </div>
    </main>
  );
}
