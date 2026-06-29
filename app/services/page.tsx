import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';
import { serviceDetails, serviceSlugs } from './[slug]/content';

export const metadata: Metadata = {
  title: 'Our Services – Satsang, Katha, Bhajan, Mantra Jaap | Asthawaani',
  description: 'Explore Asthawaani spiritual services: Daily Satsang, Katha Pravachan, Bhajan Kirtan, Mantra Jaap, Navgrah Shanti, Morning Aarti & community from Vrindavan.',
  openGraph: {
    title: 'Our Services – Satsang, Katha, Bhajan, Mantra Jaap | Asthawaani',
    description: 'Explore Asthawaani spiritual services: Daily Satsang, Katha Pravachan, Bhajan Kirtan, Mantra Jaap, Navgrah Shanti.',
    url: 'https://www.asthawaani.com/services',
    type: 'website',
    images: [{ url: 'https://www.asthawaani.com/opengraph.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.asthawaani.com/services' },
};

export default function ServicesPage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Asthawaani Spiritual Services',
    itemListElement: serviceSlugs.map((slug, i) => {
      const s: any = (serviceDetails as any)[slug];
      return {
        '@type': 'ListItem',
        position: i + 1,
        url: `https://www.asthawaani.com/services/${slug}`,
        name: s?.title ?? slug,
      };
    }),
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.asthawaani.com/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.asthawaani.com/services' },
    ],
  };
  return (
    <>
      <ServicesClient />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
