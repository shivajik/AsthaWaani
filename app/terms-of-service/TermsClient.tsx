'use client';

import { CmsContent } from '../components/CmsContent';
import { useLanguage } from '../lib/language-context';

export default function TermsClient() {
  const { language } = useLanguage();
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold text-[hsl(225,55%,35%)] mb-8">
          {language === 'hi' ? 'सेवा की शर्तें' : 'Terms of Service'}
        </h1>
        <CmsContent
          slug="terms-of-service"
          bodyOnly
          fallback={
            <div className="prose prose-lg max-w-none">
              <p>
                {language === 'hi'
                  ? 'ये सेवा शर्तें आस्थावाणी मंच के उपयोग को नियंत्रित करती हैं।'
                  : 'These terms of service govern your use of the Asthawaani platform.'}
              </p>
            </div>
          }
        />
      </div>
    </main>
  );
}
