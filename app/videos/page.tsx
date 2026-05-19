import type { Metadata } from 'next';
import VideosClient from './VideosClient';

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
  return <VideosClient />;
}
