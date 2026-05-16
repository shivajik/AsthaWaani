import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery – Temples & Sacred Places | Asthawaani',
  description: 'View photos of sacred temples, spiritual events, and divine moments from Mathura, Vrindavan, and Braj Bhoomi.',
  openGraph: {
    title: 'Photo Gallery – Temples & Sacred Places | Asthawaani',
    description: 'View photos of sacred temples, spiritual events, and divine moments from Mathura, Vrindavan, and Braj Bhoomi.',
    url: 'https://www.asthawaani.com/gallery',
  },
  alternates: { canonical: 'https://www.asthawaani.com/gallery' },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">Photo Gallery</h1>
        <p className="text-gray-600">Sacred temples, spiritual events, and divine moments from Braj Bhoomi.</p>
      </div>
    </main>
  );
}
