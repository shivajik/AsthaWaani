'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '../../lib/language-context';
import type { ServiceDetail } from './content';

export default function ServiceDetailClient({ service }: { service: ServiceDetail }) {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen">
      <section
        className="relative py-24 pt-32 bg-cover bg-center"
        style={{ backgroundImage: "linear-gradient(rgba(40,20,5,0.6), rgba(40,20,5,0.7)), url('/attached_assets/Temple/Prem_mandir.png')" }}
      >
        <div className="container mx-auto px-4 text-center relative">
          <Link href="/services" className="inline-block text-amber-200 hover:text-white text-sm mb-4">
            ← {hi ? 'सभी सेवाएँ' : 'All Services'}
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3 drop-shadow-lg">
            {hi ? service.titleHi : service.title}
          </h1>
          <p className="text-amber-200 italic">{hi ? service.subtitleHi : service.subtitle}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-lg text-gray-700 leading-relaxed mb-12">{hi ? service.introHi : service.intro}</p>

          {service.sections.map((s, i) => (
            <div key={i} className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-[hsl(225,55%,35%)] mb-3">
                {hi ? s.headingHi : s.heading}
              </h2>
              <p className="text-gray-700 leading-relaxed">{hi ? s.bodyHi : s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-serif font-bold text-[hsl(225,55%,35%)] text-center mb-8">
            {hi ? 'सामान्य प्रश्न' : 'Frequently Asked Questions'}
          </h2>
          <div className="space-y-3">
            {service.faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="bg-white rounded-lg border border-amber-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between font-semibold text-[hsl(225,55%,35%)]"
                  >
                    <span>{hi ? f.qHi : f.q}</span>
                    <span className="text-amber-600 text-xl">{open ? '−' : '+'}</span>
                  </button>
                  {open && <div className="px-5 pb-4 text-gray-700">{hi ? f.aHi : f.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[hsl(225,55%,20%)] text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
            {hi ? 'अभी हमसे जुड़ें' : 'Connect with Asthawaani'}
          </h2>
          <Link href="/contact" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-lg transition-colors">
            {hi ? 'संपर्क करें' : 'Get in Touch'}
          </Link>
        </div>
      </section>
    </main>
  );
}