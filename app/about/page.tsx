import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Asthawaani – Spiritual Platform from Mathura Vrindavan',
  description: 'Asthawaani connects gifted Katha Vachaks, Pravaktas, Bhajan singers & spiritual speakers with seekers across India. Born from the sacred land of Braj Bhoomi.',
  openGraph: {
    title: 'About Asthawaani – Spiritual Platform from Mathura Vrindavan',
    description: 'Asthawaani connects gifted Katha Vachaks, Pravaktas, Bhajan singers & spiritual speakers with seekers across India.',
    url: 'https://www.asthawaani.com/about',
    type: 'website',
    images: [{ url: 'https://www.asthawaani.com/opengraph.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Asthawaani – Spiritual Platform from Mathura Vrindavan',
    description: 'Asthawaani connects gifted Katha Vachaks, Pravaktas, Bhajan singers & spiritual speakers with seekers across India.',
  },
  alternates: { canonical: 'https://www.asthawaani.com/about' },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-[hsl(225,55%,35%)]">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">About</h1>
          <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full"></div>
        </div>
      </section>
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-[hsl(225,55%,35%)] mb-8">A spiritual platform born from Mathura–Vrindavan.</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Asthawaani is a spiritual platform born from the sacred land of Mathura–Vrindavan. Its purpose is simple — to bring India&apos;s purest voices of wisdom to every home. Across India, many gifted Katha Vachaks, Pravaktas, Spiritual Speakers, Bhajan Singers remain unheard — not because they lack devotion, but because they lack a platform. Asthawaani gives them that platform.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mt-16">
            {['Truth', 'Respect', 'Simplicity', 'Compassion', 'Unity'].map((value) => (
              <div key={value} className="rounded-xl border bg-white shadow text-center h-full hover:shadow-lg transition-shadow border-t-4 border-t-amber-400">
                <div className="p-6 pt-8">
                  <h3 className="font-serif font-bold text-xl text-[hsl(225,55%,35%)]">{value}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-stone-200">
              <h3 className="text-2xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">Our Mission</h3>
              <p className="text-lg text-gray-500 italic">&ldquo;To take the light of wisdom to every home, and give every true voice the place it deserves.&rdquo;</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-stone-200">
              <h3 className="text-2xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">Our Vision</h3>
              <p className="text-lg text-gray-500 italic">&ldquo;India&apos;s most trusted spiritual platform — modern in technology, ancient in soul.&rdquo;</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
