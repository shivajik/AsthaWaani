import type { Metadata } from 'next';
import BrajbhoomiClient from './BrajbhoomiClient';
import { placeDetails, placeSlugs } from './[slug]/content';

export const metadata: Metadata = {
  title: 'Braj Bhoomi – Sacred Places of Mathura, Vrindavan & Gokul | Asthawaani',
  description: 'Explore the sacred Braj Bhoomi through Asthawaani. Spiritual presence in Mathura, Vrindavan, Gokul, Govardhan, Mahavan & Barsana with authentic satsang & wisdom.',
  openGraph: {
    title: 'Braj Bhoomi – Sacred Places of Mathura, Vrindavan & Gokul | Asthawaani',
    description: 'Explore the sacred Braj Bhoomi through Asthawaani. Mathura, Vrindavan, Gokul, Govardhan, Mahavan & Barsana.',
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
