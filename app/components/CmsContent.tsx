'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../lib/language-context';

interface CmsPage {
  id: string;
  slug: string;
  title: string;
  titleHi: string | null;
  content: string | null;
  contentHi: string | null;
}

interface Props {
  slug: string;
  /** Render only the body content (no hero/title). */
  bodyOnly?: boolean;
  /** Fallback HTML rendered if CMS returns nothing (e.g. before seed). */
  fallback?: React.ReactNode;
  className?: string;
}

/**
 * Fetches a CMS page by slug from /api/pages/:slug (Express backend mounted
 * via pages/api/[[...slug]].ts) and renders the title + HTML content in the
 * currently active language (EN / HI). Falls back to English when Hindi
 * fields are empty.
 */
export function CmsContent({ slug, bodyOnly, fallback, className }: Props) {
  const { language } = useLanguage();
  const [page, setPage] = useState<CmsPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/pages/${slug}`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled) {
          setPage(d);
          setLoading(false);
        }
      })
      .catch(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading && !page) {
    return (
      <div className={className}>
        <div className="animate-pulse space-y-4 max-w-3xl mx-auto">
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
        </div>
      </div>
    );
  }

  if (!page) {
    return fallback ? <>{fallback}</> : null;
  }

  const title = language === 'hi' ? page.titleHi || page.title : page.title;
  const content = language === 'hi'
    ? (page.contentHi && page.contentHi.trim().length > 0 ? page.contentHi : page.content || '')
    : page.content || '';

  return (
    <div className={className}>
      {!bodyOnly && title && (
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[hsl(225,55%,35%)] mb-8 text-center">
          {title}
        </h2>
      )}
      {content ? (
        <div
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[hsl(225,55%,25%)] prose-a:text-amber-600 prose-p:text-gray-700 prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        fallback || null
      )}
    </div>
  );
}

/** Returns just the bilingual title + content strings for a slug. */
export function useCmsPageData(slug: string) {
  const { language } = useLanguage();
  const [page, setPage] = useState<CmsPage | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/pages/${slug}`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled) { setPage(d); setLoading(false); }
      })
      .catch(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [slug]);
  const title = page ? (language === 'hi' ? page.titleHi || page.title : page.title) : '';
  const content = page ? (language === 'hi' ? (page.contentHi || page.content || '') : (page.content || '')) : '';
  return { page, title, content, loading };
}
