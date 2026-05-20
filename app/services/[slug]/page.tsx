import type { Metadata } from 'next';
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
  return {
    title,
    description: s.metaDescription,
    openGraph: {
      title,
      description: s.metaDescription,
      url: `https://www.asthawaani.com/services/${slug}`,
      type: 'website',
      images: [{ url: 'https://www.asthawaani.com/opengraph.jpg', width: 1200, height: 630 }],
    },
    alternates: { canonical: `https://www.asthawaani.com/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = serviceDetails[slug];
  if (!service) notFound();
  return (
    <>
      <ServiceDetailClient service={service} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: service.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}