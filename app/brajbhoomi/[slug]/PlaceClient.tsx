'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../lib/language-context';
import type { PlaceDetail } from './content';

export default function PlaceClient({ place }: { place: PlaceDetail }) {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const altText = hi
    ? `${place.nameHi} — ${place.taglineHi}, ब्रज भूमि, उत्तर प्रदेश`
    : `${place.name} — ${place.tagline}, Braj Bhoomi, Uttar Pradesh, India`;

  return (
    <main className="min-h-screen pt-24 pb-16">
      <section className="relative h-[60vh] min-h-[400px]">
        <Image src={place.image} alt={altText} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-4 text-center">
          {/* Visible breadcrumb — matches BreadcrumbList JSON-LD, boosts CTR */}
          <nav aria-label="Breadcrumb" className="text-amber-200/90 text-sm mb-3">
            <ol className="flex flex-wrap items-center justify-center gap-x-2">
              <li><Link href="/" className="hover:text-white">{hi ? 'होम' : 'Home'}</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/brajbhoomi" className="hover:text-white">{hi ? 'ब्रज भूमि' : 'Braj Bhoomi'}</Link></li>
              <li aria-hidden="true">›</li>
              <li className="text-white/90">{hi ? place.nameHi : place.name}</li>
            </ol>
          </nav>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-2 drop-shadow-lg">{hi ? place.nameHi : place.name}</h1>
          <p className="text-amber-200 italic">{hi ? place.taglineHi : place.tagline}</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-lg text-gray-700 leading-relaxed mb-12">{hi ? place.introHi : place.intro}</p>
          {place.sections.map((s, i) => (
            <div key={i} className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-[hsl(225,55%,35%)] mb-3">{hi ? s.headingHi : s.heading}</h2>
              <p className="text-gray-700 leading-relaxed">{hi ? s.bodyHi : s.body}</p>
            </div>
          ))}

          {place.faqs && place.faqs.length > 0 && (
            <div className="mt-14 pt-10 border-t border-amber-100">
              <h2 className="text-3xl font-serif font-bold text-[hsl(225,55%,35%)] mb-6">
                {hi ? 'सामान्य प्रश्न' : 'Frequently Asked Questions'}
              </h2>
              <div className="space-y-4">
                {place.faqs.map((f, i) => (
                  <details key={i} className="group bg-amber-50/60 rounded-lg border border-amber-100 p-5 open:bg-amber-50">
                    <summary className="cursor-pointer font-serif text-lg font-semibold text-[hsl(225,55%,25%)] flex justify-between items-start gap-3">
                      <span>{hi ? f.qHi : f.q}</span>
                      <span aria-hidden="true" className="text-amber-600 group-open:rotate-45 transition-transform text-xl leading-none shrink-0">+</span>
                    </summary>
                    <p className="mt-3 text-gray-700 leading-relaxed">{hi ? f.aHi : f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/contact" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-lg transition-colors">
              {hi ? 'दर्शन की योजना बनाएँ' : 'Plan Your Darshan'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
