import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://www.asthawaani.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

interface ArticleMetadata {
  publishedTime: string;
  modifiedTime?: string;
  section?: string;
  author?: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  article?: ArticleMetadata;
  noindex?: boolean;
  jsonLd?: object | object[];
}

export function SEOHead({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImage,
  article,
  noindex,
  jsonLd,
}: SEOHeadProps) {
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;
  const absoluteOgImage = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${BASE_URL}${ogImage}`
    : DEFAULT_OG_IMAGE;

  // Prepare JSON-LD scripts as string
  const jsonLdString = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd.map(schema => JSON.stringify(schema)).join('')
      : JSON.stringify(jsonLd)
    : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Asthawaani" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@asthawaani" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />

      {/* Hreflang */}
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="hi" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Article metadata */}
      {article && <meta property="article:published_time" content={article.publishedTime} />}
      {article?.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
      {article?.section && <meta property="article:section" content={article.section} />}

      {/* Noindex */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* JSON-LD Structured Data */}
      {jsonLd && !Array.isArray(jsonLd) && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      {jsonLd && Array.isArray(jsonLd) && jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  );
}
