import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asthawaani – Online Satsang, Bhajan & Mantra Jaap from Vrindavan',
  description: 'Asthawaani is a spiritual platform from Mathura-Vrindavan offering daily satsang, bhajan kirtan, mantra jaap, and katha pravachan. Join the digital satsang today.',
  openGraph: {
    title: 'Asthawaani – Online Satsang, Bhajan & Mantra Jaap from Vrindavan',
    description: 'A spiritual platform connecting divine voices from Mathura-Vrindavan with seekers worldwide. Daily satsang, bhajan, mantra jaap & more.',
    url: 'https://www.asthawaani.com',
    type: 'website',
    images: [{ url: 'https://www.asthawaani.com/opengraph.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asthawaani – Online Satsang, Bhajan & Mantra Jaap from Vrindavan',
    description: 'A spiritual platform connecting divine voices from Mathura-Vrindavan with seekers worldwide.',
    images: ['https://www.asthawaani.com/opengraph.jpg'],
  },
  alternates: {
    canonical: 'https://www.asthawaani.com',
  },
};

// This is a placeholder - we'll migrate the full homepage component next
export default function HomePage() {
  return (
    <main>
      <h1>Asthawaani – The Voice of Faith</h1>
      <p>A spiritual platform born from Mathura-Vrindavan to bring India&apos;s purest voices of wisdom to every home.</p>
      <p>Full homepage coming soon during migration...</p>
    </main>
  );
}
