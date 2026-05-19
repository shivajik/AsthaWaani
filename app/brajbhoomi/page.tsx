import type { Metadata } from 'next';
import BrajbhoomiClient from './BrajbhoomiClient';

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
  return <BrajbhoomiClient />;
}
