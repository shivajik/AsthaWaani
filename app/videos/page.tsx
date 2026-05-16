import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spiritual Videos – Satsang, Kirtan & Pravachan | Asthawaani',
  description: 'Watch satsang, bhajan kirtan, katha pravachan and spiritual discourses from Mathura-Vrindavan. Subscribe to Asthawaani YouTube channel for daily wisdom.',
  openGraph: {
    title: 'Spiritual Videos – Satsang, Kirtan & Pravachan | Asthawaani',
    description: 'Watch satsang, bhajan kirtan, katha pravachan and spiritual discourses from Mathura-Vrindavan.',
    url: 'https://www.asthawaani.com/videos',
    type: 'website',
    images: [{ url: 'https://www.asthawaani.com/opengraph.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.asthawaani.com/videos' },
};

export default function VideosPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">Spiritual Videos</h1>
          <p className="text-gray-600">Watch our latest Satsangs, Bhajans and Pravachans</p>
        </div>
        <div className="text-center py-12">
          <a href="https://www.youtube.com/@Asthawaani" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-colors">
            Visit Our YouTube Channel
          </a>
        </div>
      </div>
    </main>
  );
}
