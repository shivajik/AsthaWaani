/**
 * Schema Generator Utility Module
 *
 * Pure utility functions that produce Schema.org JSON-LD objects
 * for structured data across the AsthaWaani website.
 */

const BASE_URL = "https://asthawaani.com";

// ─── Interfaces ──────────────────────────────────────────────────────────────

interface PostData {
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  featuredImage?: string | null;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string | null;
}

interface AuthorData {
  name: string;
  url?: string;
  knowsAbout?: string[];
  affiliation?: string;
  sameAs?: string[];
}

interface LocationData {
  name: string;
  description?: string;
}

interface VideoData {
  videoId: string;
  title: string;
  description?: string | null;
  thumbnailUrl?: string | null;
  publishedAt?: Date | string | null;
  duration?: string | null;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// ─── Helper Functions ────────────────────────────────────────────────────────

function toAbsoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
}

function toISODate(date: Date | string | null | undefined): string | undefined {
  if (!date) return undefined;
  if (typeof date === "string") return date;
  return date.toISOString();
}

/**
 * Convert a duration string (e.g. "PT5M30S", "5:30", "330") to ISO 8601 duration format.
 * Handles formats: ISO 8601 already, "MM:SS", "HH:MM:SS", or raw seconds.
 */
function toISO8601Duration(duration: string | null | undefined): string | undefined {
  if (!duration) return undefined;

  // Already in ISO 8601 format
  if (duration.startsWith("PT")) return duration;

  // Format: "HH:MM:SS" or "MM:SS"
  if (duration.includes(":")) {
    const parts = duration.split(":").map(Number);
    if (parts.length === 3) {
      const [hours, minutes, seconds] = parts;
      let result = "PT";
      if (hours > 0) result += `${hours}H`;
      if (minutes > 0) result += `${minutes}M`;
      if (seconds > 0) result += `${seconds}S`;
      return result || "PT0S";
    }
    if (parts.length === 2) {
      const [minutes, seconds] = parts;
      let result = "PT";
      if (minutes > 0) result += `${minutes}M`;
      if (seconds > 0) result += `${seconds}S`;
      return result || "PT0S";
    }
  }

  // Raw seconds
  const totalSeconds = parseInt(duration, 10);
  if (!isNaN(totalSeconds)) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    let result = "PT";
    if (minutes > 0) result += `${minutes}M`;
    if (seconds > 0) result += `${seconds}S`;
    return result || "PT0S";
  }

  return duration;
}

function truncateDescription(content: string | null | undefined, maxLength = 160): string {
  if (!content) return "";
  const stripped = content.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  if (stripped.length <= maxLength) return stripped;
  return stripped.substring(0, maxLength - 3).trimEnd() + "...";
}

// ─── Publisher Object (reused across schemas) ────────────────────────────────

function getPublisher() {
  return {
    "@type": "Organization",
    name: "Asthawaani",
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/favicon.png`,
    },
  };
}

// ─── Schema Generator Functions ──────────────────────────────────────────────

/**
 * Generate BlogPosting JSON-LD schema for a blog post.
 */
export function generateBlogPostingSchema(post: PostData, author?: AuthorData) {
  const description = post.excerpt || truncateDescription(post.content);
  const image = post.featuredImage ? toAbsoluteUrl(post.featuredImage) : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    ...(image && { image }),
    ...(toISODate(post.publishedAt) && { datePublished: toISODate(post.publishedAt) }),
    ...(toISODate(post.updatedAt) && { dateModified: toISODate(post.updatedAt) }),
    author: {
      "@type": "Person",
      name: author?.name || "Asthawaani",
    },
    publisher: getPublisher(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

/**
 * Generate Organization JSON-LD schema.
 * Mirrors the data currently in index.html.
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Asthawaani",
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.png`,
    sameAs: ["https://www.youtube.com/channel/Asthawaani"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-76684-09246",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ashirwad Palace, Swej Farm, Yamunapar, Laxminagar",
      addressLocality: "Mathura",
      addressRegion: "Uttar Pradesh",
      postalCode: "281001",
      addressCountry: "IN",
    },
  };
}

/**
 * Generate WebSite JSON-LD schema with SearchAction.
 */
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Asthawaani",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate Place JSON-LD schema for a Brajbhoomi location.
 */
export function generatePlaceSchema(location: LocationData) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: location.name,
    ...(location.description && { description: location.description }),
    address: {
      "@type": "PostalAddress",
      addressLocality: location.name,
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
  };
}

/**
 * Generate VideoObject JSON-LD schema for a YouTube video.
 */
export function generateVideoObjectSchema(video: VideoData) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    ...(video.description && { description: video.description }),
    ...(video.thumbnailUrl && { thumbnailUrl: video.thumbnailUrl }),
    ...(toISODate(video.publishedAt) && { uploadDate: toISODate(video.publishedAt) }),
    ...(video.duration && { duration: toISO8601Duration(video.duration) }),
    embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
    publisher: getPublisher(),
  };
}

/**
 * Generate BreadcrumbList JSON-LD schema.
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQPage JSON-LD schema.
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Person JSON-LD schema for author attribution.
 */
export function generatePersonSchema(author: AuthorData) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    ...(author.knowsAbout && author.knowsAbout.length > 0 && { knowsAbout: author.knowsAbout }),
    ...(author.affiliation && {
      affiliation: {
        "@type": "Organization",
        name: author.affiliation,
      },
    }),
    ...(author.sameAs && author.sameAs.length > 0 && { sameAs: author.sameAs }),
  };
}
