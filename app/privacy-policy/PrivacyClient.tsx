'use client';

import { CmsContent } from '../components/CmsContent';
import { useLanguage } from '../lib/language-context';

export default function PrivacyClient() {
  const { language } = useLanguage();
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold text-[hsl(225,55%,35%)] mb-8">
          {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
        </h1>
        <CmsContent
          slug="privacy-policy"
          bodyOnly
          fallback={
            <div className="prose prose-lg max-w-none">
              <p>
                {language === 'hi'
                  ? 'यह गोपनीयता नीति बताती है कि आस्थावाणी आपकी व्यक्तिगत जानकारी कैसे एकत्र, उपयोग और सुरक्षित करता है।'
                  : 'This privacy policy explains how Asthawaani collects, uses, and protects your personal information.'}
              </p>
            </div>
          }
        />
      </div>
    </main>
  );
}
