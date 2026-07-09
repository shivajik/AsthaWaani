import type { Metadata } from 'next';
import BrajbhoomiClient from './BrajbhoomiClient';
import { placeDetails, placeSlugs } from './[slug]/content';

export const metadata: Metadata = {
  title: 'Braj Bhoomi Yatra Guide – Mathura, Vrindavan, Gokul, Barsana | Asthawaani',
  description: 'Explore Braj Bhoomi — Mathura, Vrindavan, Gokul, Govardhan, Mahavan & Barsana. Plan your Brajbhoomi yatra with darshan timings, distances, festivals & Radha-Krishna leela guides.',
  keywords: 'Braj Bhoomi, Brajbhoomi, Braj Bhumi, Braj Bhumi Mathura, Vrindavan yatra, Gokul, Govardhan Parikrama, Barsana, Radha Krishna, Yamuna, holy rivers of India, Krishna Janmabhoomi',
  openGraph: {
    title: 'Braj Bhoomi Yatra Guide – Mathura, Vrindavan, Gokul, Barsana | Asthawaani',
    description: 'Plan your Brajbhoomi yatra with Asthawaani — complete darshan guide to Mathura, Vrindavan, Gokul, Govardhan, Mahavan & Barsana.',
    url: 'https://www.asthawaani.com/brajbhoomi',
    type: 'website',
    images: [{ url: 'https://www.asthawaani.com/opengraph.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.asthawaani.com/brajbhoomi' },
};

export default function BrajbhoomiPage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sacred Places of Braj Bhoomi',
    itemListElement: placeSlugs.map((slug, i) => {
      const p: any = (placeDetails as any)[slug];
      return {
        '@type': 'ListItem',
        position: i + 1,
        url: `https://www.asthawaani.com/brajbhoomi/${slug}`,
        name: p?.name ?? slug,
      };
    }),
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.asthawaani.com/' },
      { '@type': 'ListItem', position: 2, name: 'Braj Bhoomi', item: 'https://www.asthawaani.com/brajbhoomi' },
    ],
  };
  return (
    <>
      <BrajbhoomiClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
