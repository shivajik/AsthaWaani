import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceDetails, serviceSlugs } from './content';
import ServiceDetailClient from './ServiceDetailClient';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceDetails[slug];
  if (!s) return { title: 'Service Not Found | Asthawaani' };
  const title = `${s.title} – ${s.subtitle} | Asthawaani`;
  const url = `https://www.asthawaani.com/services/${slug}`;
  return {
    title,
    description: s.metaDescription,
    openGraph: {
      title,
      description: s.metaDescription,
      url,
      type: 'website',
      // opengraph-image.tsx in this folder auto-generates a per-service image.
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: s.metaDescription,
    },
    alternates: { canonical: url },
  };
}

const RELATED_PLACES = [
  { slug: 'vrindavan', name: 'Vrindavan' },
  { slug: 'mathura', name: 'Mathura' },
  { slug: 'govardhan', name: 'Govardhan' },
  { slug: 'barsana', name: 'Barsana' },
];

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = serviceDetails[slug];
  if (!service) notFound();

  const url = `https://www.asthawaani.com/services/${slug}`;
  const otherServices = serviceSlugs.filter((s) => s !== slug).slice(0, 4);

  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      serviceType: service.title,
      description: service.metaDescription,
      url,
      provider: {
        '@type': 'Organization',
        name: 'Asthawaani',
        url: 'https://www.asthawaani.com',
      },
      areaServed: { '@type': 'Country', name: 'India' },
      availableLanguage: ['en', 'hi'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.asthawaani.com/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.asthawaani.com/services' },
        { '@type': 'ListItem', position: 3, name: service.title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <>
      <ServiceDetailClient service={service} />

      {/* Internal linking: Related Services + Related Braj Bhoomi + Blog */}
      <section className="bg-gradient-to-b from-amber-50 to-white border-t border-amber-100">
        <div className="max-w-6xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-xl font-serif font-bold text-[hsl(225,55%,35%)] mb-3">Related Services</h2>
            <ul className="space-y-2">
              {otherServices.map((s) => (
                <li key={s}>
                  <Link href={`/services/${s}`} className="text-amber-700 hover:text-amber-900 hover:underline">
                    {serviceDetails[s].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-[hsl(225,55%,35%)] mb-3">Explore Braj Bhoomi</h2>
            <ul className="space-y-2">
              {RELATED_PLACES.map((p) => (
                <li key={p.slug}>
                  <Link href={`/brajbhoomi/${p.slug}`} className="text-amber-700 hover:text-amber-900 hover:underline">
                    {p.name}
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
              <li><Link href="/community" className="text-amber-700 hover:text-amber-900 hover:underline">Join the Community</Link></li>
              <li><Link href="/contact" className="text-amber-700 hover:text-amber-900 hover:underline">Contact Asthawaani</Link></li>
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
