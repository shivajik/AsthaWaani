'use client';

import type { ReactNode } from 'react';
import { useLanguage } from '../lib/language-context';

export function LocalizedText({ en, hi, className }: { en: ReactNode; hi?: ReactNode | null; className?: string }) {
  const { language } = useLanguage();
  return <span className={className}>{language === 'hi' && hi ? hi : en}</span>;
}

export function LocalizedHtml({ en, hi, className }: { en?: string | null; hi?: string | null; className?: string }) {
  const { language } = useLanguage();
  const html = (language === 'hi' && hi?.trim() ? hi : en) || '';
  if (!html) return null;
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
