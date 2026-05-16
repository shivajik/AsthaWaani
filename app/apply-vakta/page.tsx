import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply as Vakta – Share Your Spiritual Voice | Asthawaani',
  description: 'Apply to become a Vakta (speaker) on Asthawaani. Share your spiritual knowledge, bhajan, pravachan with seekers worldwide.',
  alternates: { canonical: 'https://www.asthawaani.com/apply-vakta' },
};

export default function ApplyVaktaPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <section className="bg-[hsl(45,90%,50%)] pt-8 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Apply as Vakta</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-serif font-bold text-[hsl(225,55%,35%)] mb-6">Share Your Spiritual Voice</h2>
          <p className="text-gray-600 text-lg mb-8">If you are a Katha Vachak, Pravakta, Bhajan Singer, or Spiritual Speaker — Asthawaani gives you the platform to reach millions of seekers.</p>
          <a href="https://wa.me/917668409246" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-lg transition-colors">
            Apply via WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
