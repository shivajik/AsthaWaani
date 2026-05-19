import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

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
  return <ServicesClient />;
}
