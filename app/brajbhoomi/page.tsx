import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Braj Bhoomi – Sacred Places of Mathura, Vrindavan & Gokul | Asthawaani',
  description: 'Explore the sacred Braj Bhoomi through Asthawaani. Spiritual presence in Mathura, Vrindavan, Gokul, Govardhan, Mahavan & Barsana with authentic satsang & wisdom.',
  openGraph: {
    title: 'Braj Bhoomi – Sacred Places of Mathura, Vrindavan & Gokul | Asthawaani',
    description: 'Explore the sacred Braj Bhoomi through Asthawaani. Mathura, Vrindavan, Gokul, Govardhan, Mahavan & Barsana.',
    url: 'https://www.asthawaani.com/brajbhoomi',
    type: 'website',
    images: [{ url: 'https://www.asthawaani.com/opengraph.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.asthawaani.com/brajbhoomi' },
};

const locations = [
  { id: 'mathura', name: 'Mathura', nameHi: 'मथुरा', title: 'The Divine Birthplace of Lord Krishna', description: 'Mathura is the eternal heart of Braj Bhoomi and the sacred birthplace of Lord Shri Krishna.' },
  { id: 'vrindavan', name: 'Vrindavan', nameHi: 'वृंदावन', title: 'The Land of Divine Love and Bhakti', description: 'Vrindavan is the soul of Krishna Bhakti, where every particle breathes devotion and divine love.' },
  { id: 'gokul', name: 'Gokul', nameHi: 'गोकुल', title: 'The Sacred Childhood Abode of Shri Krishna', description: 'Gokul is the sacred land where Lord Krishna\'s bal-leelas unfolded.' },
  { id: 'govardhan', name: 'Govardhan', nameHi: 'गोवर्धन', title: 'The Sacred Hill of Protection', description: 'Govardhan is the divine symbol of faith, protection, and surrender.' },
  { id: 'mahavan', name: 'Mahavan', nameHi: 'महावन', title: 'The Forest of Divine Protection', description: 'Mahavan is a deeply sacred forest region where Lord Krishna performed powerful childhood leelas.' },
  { id: 'barsana', name: 'Barsana', nameHi: 'बरसाना', title: 'The Divine Land of Radha Rani', description: 'Barsana is the sacred birthplace of Shri Radha Rani, the embodiment of supreme devotion.' },
];

export default function BrajbhoomiPage() {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">Brajbhoomi Darshan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore the sacred Braj Bhoomi — the divine land of Lord Krishna&apos;s leelas.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc) => (
            <article key={loc.id} className="rounded-xl border bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h2 className="text-2xl font-serif font-bold text-[hsl(225,55%,35%)] mb-1">{loc.name}</h2>
                <p className="text-amber-600 text-sm mb-3">{loc.nameHi}</p>
                <h3 className="font-medium text-gray-800 mb-2">{loc.title}</h3>
                <p className="text-gray-500 text-sm">{loc.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
