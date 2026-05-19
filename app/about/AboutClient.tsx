'use client';

import { CmsContent } from '../components/CmsContent';
import { useLanguage, useCmsPage } from '../lib/language-context';
import Image from 'next/image';

export default function AboutClient() {
  const { language } = useLanguage();
  const { title } = useCmsPage('about');

  const heroTitle = title || (language === 'hi' ? 'हमारे बारे में' : 'About');

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/attached_assets/generated_images/spiritual_guru_teaching.png"
          alt="Spiritual guru teaching"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">{heroTitle}</h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* CMS Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <CmsContent
              slug="about"
              bodyOnly
              fallback={
                <div className="text-center">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[hsl(225,55%,35%)] mb-8">
                    {language === 'hi'
                      ? 'मथुरा-वृंदावन से जन्मा एक आध्यात्मिक मंच।'
                      : 'A spiritual platform born from Mathura-Vrindavan.'}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {language === 'hi'
                      ? 'आस्थावाणी मथुरा-वृंदावन की पवित्र भूमि से जन्मा एक आध्यात्मिक मंच है।'
                      : 'Asthawaani is a spiritual platform born from the sacred land of Mathura-Vrindavan.'}
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[hsl(225,55%,20%)]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-[hsl(225,55%,25%)] p-10 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-serif font-bold text-amber-400 mb-4">
                {language === 'hi' ? 'हमारा उद्देश्य' : 'Our Mission'}
              </h3>
              <p className="text-lg text-white/80 italic leading-relaxed">
                {language === 'hi'
                  ? '"ज्ञान के प्रकाश को हर घर तक पहुँचाना, और हर सच्ची आवाज़ को उसका योग्य स्थान देना।"'
                  : '"To take the light of wisdom to every home, and give every true voice the place it deserves."'}
              </p>
            </div>
            <div className="bg-[hsl(225,55%,25%)] p-10 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-serif font-bold text-amber-400 mb-4">
                {language === 'hi' ? 'हमारी दृष्टि' : 'Our Vision'}
              </h3>
              <p className="text-lg text-white/80 italic leading-relaxed">
                {language === 'hi'
                  ? '"भारत का सबसे विश्वसनीय आध्यात्मिक मंच — तकनीक में आधुनिक, आत्मा में प्राचीन।"'
                  : '"India\'s most trusted spiritual platform — modern in technology, ancient in soul."'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
