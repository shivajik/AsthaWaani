import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Asthawaani – Spiritual Platform from Mathura Vrindavan',
  description: 'Asthawaani connects gifted Katha Vachaks, Pravaktas, Bhajan singers & spiritual speakers with seekers across India. Born from the sacred land of Braj Bhoomi.',
  openGraph: {
    title: 'About Asthawaani – Spiritual Platform from Mathura Vrindavan',
    description: 'Asthawaani connects gifted Katha Vachaks, Pravaktas, Bhajan singers & spiritual speakers with seekers across India.',
    url: 'https://www.asthawaani.com/about',
    type: 'website',
    images: [{ url: 'https://www.asthawaani.com/opengraph.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Asthawaani – Spiritual Platform from Mathura Vrindavan',
    description: 'Asthawaani connects gifted Katha Vachaks, Pravaktas, Bhajan singers & spiritual speakers with seekers across India.',
  },
  alternates: { canonical: 'https://www.asthawaani.com/about' },
};

export default function AboutPage() {
  return <AboutClient />;
}
