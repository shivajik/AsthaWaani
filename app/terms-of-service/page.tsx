import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Asthawaani',
  description: 'Terms of service for using the Asthawaani spiritual platform.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.asthawaani.com/terms-of-service' },
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold text-[hsl(225,55%,35%)] mb-8">Terms of Service</h1>
        <div className="prose prose-lg max-w-none">
          <p>These terms of service govern your use of the Asthawaani platform.</p>
          <p>Last updated: January 2026</p>
        </div>
      </div>
    </main>
  );
}
