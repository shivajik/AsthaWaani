'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../lib/language-context';
import type { PlaceDetail } from './content';

export default function PlaceClient({ place }: { place: PlaceDetail }) {
  const { language } = useLanguage();
  const hi = language === 'hi';
  return (
    <main className="min-h-screen pt-24 pb-16">
      <section className="relative h-[60vh] min-h-[400px]">
        <Image src={place.image} alt={hi ? place.nameHi : place.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-4 text-center">
          <Link href="/brajbhoomi" className="text-amber-200 hover:text-white text-sm mb-3">
            ← {hi ? 'सभी स्थान' : 'All Places'}
          </Link>
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