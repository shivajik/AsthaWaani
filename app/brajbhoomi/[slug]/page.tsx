import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { placeDetails, placeSlugs } from './content';
import PlaceClient from './PlaceClient';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return placeSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = placeDetails[slug];
  if (!p) return { title: 'Place Not Found | Asthawaani' };
  const title = `${p.name} – ${p.tagline} | Asthawaani`;
  return {
    title,
    description: p.metaDescription,
    openGraph: {
      title,
      description: p.metaDescription,
      url: `https://www.asthawaani.com/brajbhoomi/${slug}`,
      type: 'website',
      images: [{ url: `https://www.asthawaani.com${p.image}`, width: 1200, height: 630 }],
    },
    alternates: { canonical: `https://www.asthawaani.com/brajbhoomi/${slug}` },
  };
}

export default async function PlacePage({ params }: Props) {
  const { slug } = await params;
  const place = placeDetails[slug];
  if (!place) notFound();
  return <PlaceClient place={place} />;
}