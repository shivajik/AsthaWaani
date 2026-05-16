import type { Metadata } from 'next';
import Image from 'next/image';

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

const values = [
  { name: 'Truth', icon: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )},
  { name: 'Respect', icon: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2M10 8V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7M6 12a2 2 0 0 0-2-2 2 2 0 0 0-2 2v4a8 8 0 0 0 8 8h4a8 8 0 0 0 8-8v-2a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
    </svg>
  )},
  { name: 'Simplicity', icon: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )},
  { name: 'Compassion', icon: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )},
  { name: 'Unity', icon: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )},
];

export default function AboutPage() {
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
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">About</h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[hsl(225,55%,35%)] mb-8">
              A spiritual platform born from Mathura-Vrindavan.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Asthawaani is a spiritual platform born from the sacred land of Mathura–Vrindavan. Its purpose is simple — to bring India&apos;s purest voices of wisdom to every home. Across India, many gifted Katha Vachaks, Pravaktas, Spiritual Speakers, Bhajan Singers remain unheard — not because they lack devotion, but because they lack a platform. Asthawaani gives them that platform.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We believe that spiritual wisdom should not be limited by geography or technology. Through our digital satsang platform, we connect seekers with authentic spiritual voices from the heartland of Sanatan Dharma — Braj Bhoomi.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Whether it is daily satsang, bhajan kirtan, katha pravachan, or mantra jaap — Asthawaani brings the sacred energy of Vrindavan directly to your home, your heart, and your soul.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {values.map((value) => (
              <div key={value.name} className="bg-white rounded-xl border shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-amber-500 flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="font-serif font-bold text-lg text-amber-600">{value.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-[hsl(225,55%,20%)]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-[hsl(225,55%,25%)] p-10 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-serif font-bold text-amber-400 mb-4">Our Mission</h3>
              <p className="text-lg text-white/80 italic leading-relaxed">
                &ldquo;To take the light of wisdom to every home, and give every true voice the place it deserves.&rdquo;
              </p>
            </div>
            <div className="bg-[hsl(225,55%,25%)] p-10 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-serif font-bold text-amber-400 mb-4">Our Vision</h3>
              <p className="text-lg text-white/80 italic leading-relaxed">
                &ldquo;India&apos;s most trusted spiritual platform — modern in technology, ancient in soul.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
