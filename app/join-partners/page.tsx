import type { Metadata } from 'next';
import { PartnershipForm } from './PartnershipForm';
import JoinPartnersHeader from './JoinPartnersHeader';

export const metadata: Metadata = {
  title: 'Join as Partner – Collaborate with Asthawaani',
  description: 'Partner with Asthawaani to spread spiritual wisdom. Collaborate on satsang, bhajan events, and community initiatives.',
  alternates: { canonical: 'https://www.asthawaani.com/join-partners' },
};

export default function JoinPartnersPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <JoinPartnersHeader />
        <PartnershipForm />
      </div>
    </main>
  );
}
