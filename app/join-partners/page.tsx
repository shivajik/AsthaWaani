import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join as Partner – Collaborate with Asthawaani',
  description: 'Partner with Asthawaani to spread spiritual wisdom. Collaborate on satsang, bhajan events, and community initiatives.',
  alternates: { canonical: 'https://www.asthawaani.com/join-partners' },
};

export default function JoinPartnersPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <section className="bg-[hsl(45,90%,50%)] pt-8 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Join as Partners</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-serif font-bold text-[hsl(225,55%,35%)] mb-6">Partner with Asthawaani</h2>
          <p className="text-gray-600 text-lg mb-8">Collaborate with us to spread spiritual wisdom. Whether you are an organization, temple, or spiritual group — we welcome partnerships that serve the community.</p>
          <a href="https://wa.me/917668409246" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-lg transition-colors">
            Contact Us on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
