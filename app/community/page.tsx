import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spiritual Community – Join Our Sangha | Asthawaani',
  description: 'Join Asthawaani spiritual community. Connect with fellow seekers, participate in satsang, and grow on your spiritual path.',
  openGraph: {
    title: 'Spiritual Community – Join Our Sangha | Asthawaani',
    description: 'Join Asthawaani spiritual community. Connect with fellow seekers.',
    url: 'https://www.asthawaani.com/community',
    type: 'website',
  },
  alternates: { canonical: 'https://www.asthawaani.com/community' },
};

export default function CommunityPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">Spiritual Community</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">Connect with fellow seekers, participate in satsang, and grow on your spiritual path with Asthawaani.</p>
        <a href="https://www.youtube.com/@Asthawaani" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-colors">
          Join Us on YouTube
        </a>
      </div>
    </main>
  );
}
