import { type Request, Response, NextFunction } from "express";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { posts, pages } from "@shared/schema";

// Crawler detection
const CRAWLER_USER_AGENTS = [
  'googlebot', 'bingbot', 'gptbot', 'claudebot', 'perplexitybot',
  'slurp', 'duckduckbot', 'facebookexternalhit', 'twitterbot',
  'linkedinbot', 'whatsapp', 'telegrambot', 'applebot', 'yandexbot',
  'baiduspider', 'sogou', 'ia_archiver'
];

function isCrawler(userAgent: string | undefined): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return CRAWLER_USER_AGENTS.some(bot => ua.includes(bot));
}

const BASE_URL = 'https://www.asthawaani.com';

// Static page metadata
const STATIC_PAGES: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Asthawaani – Online Satsang, Bhajan & Mantra Jaap from Vrindavan',
    description: 'Asthawaani is a spiritual platform from Mathura-Vrindavan offering daily satsang, bhajan kirtan, mantra jaap, and katha pravachan. Join the digital satsang today.',
  },
  '/about': {
    title: 'About Asthawaani – Spiritual Platform from Mathura Vrindavan',
    description: 'Asthawaani connects gifted Katha Vachaks, Pravaktas, Bhajan singers & spiritual speakers with seekers across India. Born from the sacred land of Braj Bhoomi.',
  },
  '/services': {
    title: 'Our Services – Satsang, Katha, Bhajan, Mantra Jaap | Asthawaani',
    description: 'Explore Asthawaani\'s spiritual services: Daily Satsang, Katha Pravachan, Bhajan Kirtan, Mantra Jaap, Navgrah Shanti, Morning Aarti & community from Vrindavan.',
  },
  '/brajbhoomi': {
    title: 'Braj Bhoomi – Sacred Places of Mathura, Vrindavan & Gokul | Asthawaani',
    description: 'Explore the sacred Braj Bhoomi through Asthawaani. Spiritual presence in Mathura, Vrindavan, Gokul, Govardhan, Mahavan & Barsana with authentic satsang & wisdom.',
  },
  '/blog': {
    title: 'Spiritual Blog – Mantra Jaap, Satsang & Vedic Wisdom | Asthawaani',
    description: 'Read articles on mantra jaap, navgrah shanti, daily satsang, bhakti yoga, meditation and Vedic spiritual wisdom. Guidance for peace and positivity by Asthawaani.',
  },
  '/videos': {
    title: 'Spiritual Videos – Satsang, Kirtan & Pravachan | Asthawaani',
    description: 'Watch satsang, bhajan kirtan, katha pravachan and spiritual discourses from Mathura-Vrindavan. Subscribe to Asthawaani\'s YouTube channel for daily wisdom.',
  },
  '/gallery': {
    title: 'Photo Gallery – Temples & Sacred Places | Asthawaani',
    description: 'View photos of sacred temples, spiritual events, and divine moments from Mathura, Vrindavan, and Braj Bhoomi.',
  },
  '/contact': {
    title: 'Contact Asthawaani – Reach Us in Mathura, Uttar Pradesh',
    description: 'Get in touch with Asthawaani Kendra, Mathura. Call +91 76684 09246 or email us. Whether you\'re a seeker or a spiritual speaker, we\'re here for you.',
  },
  '/community': {
    title: 'Spiritual Community – Join Our Sangha | Asthawaani',
    description: 'Join Asthawaani\'s spiritual community. Connect with fellow seekers, participate in satsang, and grow on your spiritual path.',
  },
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3).trimEnd() + '...';
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function buildHtml(options: {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: string;
  ogImage?: string;
  content?: string;
  jsonLd?: object[];
  article?: { publishedTime?: string; modifiedTime?: string; section?: string };
}): string {
  const { title, description, canonicalPath, ogType = 'website', ogImage, content, jsonLd, article } = options;
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;
  const absoluteOgImage = ogImage
    ? (ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`)
    : `${BASE_URL}/opengraph.jpg`;

  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);

  const jsonLdScripts = jsonLd
    ? jsonLd.map(schema => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`).join('\n    ')
    : '';

  const articleMeta = article ? `
    <meta property="article:published_time" content="${article.publishedTime || ''}" />
    ${article.modifiedTime ? `<meta property="article:modified_time" content="${article.modifiedTime}" />` : ''}
    ${article.section ? `<meta property="article:section" content="${escapeHtml(article.section)}" />` : ''}` : '';

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDescription}" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph -->
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDescription}" />
    <meta property="og:image" content="${absoluteOgImage}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="Asthawaani" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@asthawaani" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <meta name="twitter:image" content="${absoluteOgImage}" />

    <!-- Hreflang -->
    <link rel="alternate" hreflang="en" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="hi" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />
    ${articleMeta}

    <!-- Structured Data -->
    ${jsonLdScripts}
  </head>
  <body>
    <article>
      <h1>${safeTitle}</h1>
      ${content ? `<div>${content}</div>` : `<p>${safeDescription}</p>`}
    </article>
    <footer>
      <p>&copy; 2026 Asthawaani. All rights reserved.</p>
      <p>Ashirwad Palace, Swej Farm, Yamunapar, Laxminagar, Mathura, Uttar Pradesh 281001</p>
      <p>Phone: +91 76684 09246</p>
    </footer>
  </body>
</html>`;
}

// Organization schema (always included)
function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Asthawaani",
    "url": BASE_URL,
    "logo": `${BASE_URL}/favicon.png`,
    "sameAs": [
      "https://www.youtube.com/@Asthawaani",
      "https://www.instagram.com/Asthawaani",
      "https://www.facebook.com/share/1ACBKJFoW9/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-76684-09246",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ashirwad Palace, Swej Farm, Yamunapar, Laxminagar",
      "addressLocality": "Mathura",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "281001",
      "addressCountry": "IN"
    }
  };
}

export function prerenderMiddleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Only intercept GET requests
    if (req.method !== 'GET') return next();

    // Skip API routes, static assets, and admin paths
    const path = req.path;
    if (
      path.startsWith('/api') ||
      path.startsWith('/admin') ||
      path.startsWith('/assets') ||
      path.startsWith('/vite-hmr') ||
      path.includes('.')
    ) {
      return next();
    }

    // Check if this is a crawler
    const userAgent = req.headers['user-agent'];
    if (!isCrawler(userAgent)) {
      return next();
    }

    try {
      // Route: Blog post (/blog/:slug)
      const blogPostMatch = path.match(/^\/blog\/([^/]+)$/);
      if (blogPostMatch) {
        const slug = blogPostMatch[1];
        const [post] = await db.select().from(posts).where(eq(posts.slug, slug));

        if (post && post.status === 'published') {
          const title = post.metaTitle || `${post.title} | Asthawaani Blog`;
          const description = post.metaDescription || post.excerpt || truncate(stripHtml(post.content || ''), 160);
          const contentText = post.content ? `<p>${post.excerpt || ''}</p>${post.content}` : '';

          const blogSchema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": description,
            ...(post.featuredImage && {
              "image": post.featuredImage.startsWith('http') ? post.featuredImage : `${BASE_URL}${post.featuredImage}`
            }),
            ...(post.publishedAt && { "datePublished": new Date(post.publishedAt).toISOString() }),
            ...(post.updatedAt && { "dateModified": new Date(post.updatedAt).toISOString() }),
            "author": { "@type": "Person", "name": "Asthawaani" },
            "publisher": getOrganizationSchema(),
            "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/blog/${post.slug}` }
          };

          const html = buildHtml({
            title,
            description,
            canonicalPath: `/blog/${post.slug}`,
            ogType: 'article',
            ogImage: post.featuredImage || undefined,
            content: contentText,
            jsonLd: [blogSchema, getOrganizationSchema()],
            article: {
              publishedTime: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
              modifiedTime: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
            },
          });

          return res.status(200).type('html').send(html);
        }
      }

      // Route: Static pages
      if (STATIC_PAGES[path]) {
        const pageMeta = STATIC_PAGES[path];
        const schemas: object[] = [getOrganizationSchema()];

        if (path === '/') {
          schemas.push({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Asthawaani",
            "url": BASE_URL,
            "potentialAction": {
              "@type": "SearchAction",
              "target": { "@type": "EntryPoint", "urlTemplate": `${BASE_URL}/blog?q={search_term_string}` },
              "query-input": "required name=search_term_string"
            }
          });
        }

        const html = buildHtml({
          title: pageMeta.title,
          description: pageMeta.description,
          canonicalPath: path,
          jsonLd: schemas,
        });

        return res.status(200).type('html').send(html);
      }

      // Route: Dynamic CMS pages (/:slug)
      if (path.match(/^\/[a-z0-9-]+$/)) {
        const slug = path.substring(1);
        const [page] = await db.select().from(pages).where(eq(pages.slug, slug));

        if (page && page.isPublished) {
          const title = page.metaTitle || `${page.title} | Asthawaani`;
          const description = page.metaDescription || truncate(stripHtml(page.content || ''), 160) || page.title;

          const html = buildHtml({
            title,
            description,
            canonicalPath: `/${page.slug}`,
            content: page.content || undefined,
            jsonLd: [getOrganizationSchema()],
          });

          return res.status(200).type('html').send(html);
        }
      }

      // Fallback: let the SPA shell handle it
      next();
    } catch (error) {
      console.error('Prerender middleware error:', error);
      next(); // Fall back to SPA shell on any error
    }
  };
}
