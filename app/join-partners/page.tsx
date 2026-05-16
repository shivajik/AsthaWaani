import type { Metadata } from 'next';
import { PartnershipForm } from './PartnershipForm';

export const metadata: Metadata = {
  title: 'Join as Partner – Collaborate with Asthawaani',
  description: 'Partner with Asthawaani to spread spiritual wisdom. Collaborate on satsang, bhajan events, and community initiatives.',
  alternates: { canonical: 'https://www.asthawaani.com/join-partners' },
};

export default function JoinPartnersPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">Join as Partners</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Collaborate with Asthawaani in the spiritual journey
          </p>
        </div>

        {/* Partnership Form */}
        <PartnershipForm />
      </div>
    </main>
  );
}
