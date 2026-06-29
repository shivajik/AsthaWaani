import type { Metadata } from 'next';
import VideosClient from './VideosClient';
import { SITE_VIDEOS, durationToISO } from './videos-data';

export const metadata: Metadata = {
  title: 'Spiritual Videos – Satsang, Kirtan & Pravachan | Asthawaani',
  description: 'Watch satsang, bhajan kirtan, katha pravachan and spiritual discourses from Mathura-Vrindavan. Subscribe to Asthawaani YouTube channel for daily wisdom.',
  openGraph: {
    title: 'Spiritual Videos – Satsang, Kirtan & Pravachan | Asthawaani',
    description: 'Watch satsang, bhajan kirtan, katha pravachan and spiritual discourses from Mathura-Vrindavan.',
    url: 'https://www.asthawaani.com/videos',
    type: 'website',
  },
  alternates: { canonical: 'https://www.asthawaani.com/videos' },
};

export default function VideosPage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Asthawaani Spiritual Videos',
    itemListElement: SITE_VIDEOS.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'VideoObject',
        name: v.title,
        description: v.title,
        thumbnailUrl: v.thumbnailUrl,
        uploadDate: '2024-01-01',
        duration: durationToISO(v.duration),
        contentUrl: `https://www.youtube.com/watch?v=${v.videoId}`,
        embedUrl: `https://www.youtube.com/embed/${v.videoId}`,
        publisher: {
          '@type': 'Organization',
          name: 'Asthawaani',
          logo: { '@type': 'ImageObject', url: 'https://www.asthawaani.com/logo.png' },
        },
      },
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.asthawaani.com/' },
      { '@type': 'ListItem', position: 2, name: 'Videos', item: 'https://www.asthawaani.com/videos' },
    ],
  };

  return (
    <>
      <VideosClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
