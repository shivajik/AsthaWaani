import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Photo Gallery – Temples & Sacred Places | Asthawaani',
  description: 'View photos of sacred temples, spiritual events, and divine moments from Mathura, Vrindavan, and Braj Bhoomi.',
  openGraph: {
    title: 'Photo Gallery – Temples & Sacred Places | Asthawaani',
    description: 'View photos of sacred temples, spiritual events, and divine moments from Mathura, Vrindavan, and Braj Bhoomi.',
    url: 'https://www.asthawaani.com/gallery',
  },
  alternates: { canonical: 'https://www.asthawaani.com/gallery' },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
