import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Asthawaani',
  description: 'Asthawaani privacy policy. How we collect, use, and protect your personal information.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.asthawaani.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold text-[hsl(225,55%,35%)] mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p>This privacy policy explains how Asthawaani collects, uses, and protects your personal information.</p>
          <p>Last updated: January 2026</p>
        </div>
      </div>
    </main>
  );
}
