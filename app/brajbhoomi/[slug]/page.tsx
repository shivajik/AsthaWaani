import type { Metadata } from 'next';
import Link from 'next/link';
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
  const url = `https://www.asthawaani.com/brajbhoomi/${slug}`;
  return {
    title,
    description: p.metaDescription,
    openGraph: {
      title,
      description: p.metaDescription,
      url,
      type: 'article',
      // opengraph-image.tsx in this folder auto-generates a per-place image.
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: p.metaDescription,
    },
    alternates: { canonical: url },
  };
}

const SERVICE_LINKS = [
  { slug: 'daily-satsang', name: 'Daily Satsang' },
  { slug: 'katha-pravachan', name: 'Katha & Pravachan' },
  { slug: 'bhajan-kirtan', name: 'Bhajan & Kirtan' },
  { slug: 'jaap-mantras', name: 'Jaap & Mantras' },
];

export default async function PlacePage({ params }: Props) {
  const { slug } = await params;
  const place = placeDetails[slug];
  if (!place) notFound();

  const url = `https://www.asthawaani.com/brajbhoomi/${slug}`;
  const otherPlaces = placeSlugs.filter((s) => s !== slug).slice(0, 5);

  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      name: place.name,
      description: place.metaDescription,
      url,
      image: place.image?.startsWith('http') ? place.image : `https://www.asthawaani.com${place.image}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: place.name,
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'IN',
      },
      touristType: ['Pilgrims', 'Devotees of Shri Krishna'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.asthawaani.com/' },
        { '@type': 'ListItem', position: 2, name: 'Braj Bhoomi', item: 'https://www.asthawaani.com/brajbhoomi' },
        { '@type': 'ListItem', position: 3, name: place.name, item: url },
      ],
    },
  ];

  return (
    <>
      <PlaceClient place={place} />

      {/* Internal linking */}
      <section className="bg-gradient-to-b from-amber-50 to-white border-t border-amber-100">
        <div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-serif font-bold text-[hsl(225,55%,35%)] mb-3">More of Braj Bhoomi</h2>
            <ul className="space-y-2">
              {otherPlaces.map((s) => (
                <li key={s}>
                  <Link href={`/brajbhoomi/${s}`} className="text-amber-700 hover:text-amber-900 hover:underline">
                    {placeDetails[s].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-[hsl(225,55%,35%)] mb-3">Related Services</h2>
            <ul className="space-y-2">
              {SERVICE_LINKS.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-amber-700 hover:text-amber-900 hover:underline">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-[hsl(225,55%,35%)] mb-3">Read & Watch</h2>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-amber-700 hover:text-amber-900 hover:underline">Spiritual Articles</Link></li>
              <li><Link href="/videos" className="text-amber-700 hover:text-amber-900 hover:underline">Satsang Videos</Link></li>
              <li><Link href="/gallery" className="text-amber-700 hover:text-amber-900 hover:underline">Photo Gallery</Link></li>
              <li><Link href="/community" className="text-amber-700 hover:text-amber-900 hover:underline">Join the Community</Link></li>
            </ul>
          </div>
        </div>
      </section>

      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
