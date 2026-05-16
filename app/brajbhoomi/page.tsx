import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

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

const sacredPlaces = [
  { name: 'Vrindavan', description: 'The Land of Divine Love and Bhakti' },
  { name: 'Gokul', description: 'The Sacred Childhood Abode of Shri Krishna' },
  { name: 'Govardhan', description: 'The Sacred Hill of Protection' },
  { name: 'Mahavan', description: 'The Forest of Divine Protection' },
  { name: 'Barsana', description: 'The Divine Land of Radha Rani' },
];

export default function BrajbhoomiPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Featured Location */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/attached_assets/generated_images/vrindavan_sunrise_temple_landscape.png"
                alt="Mathura Temple - The Divine Birthplace of Lord Krishna"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-semibold tracking-wider uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Janmabhoomi Leelas</span>
                <span className="text-xs font-semibold tracking-wider uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Sanatan Pravachan</span>
                <span className="text-xs font-semibold tracking-wider uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Krishna Tattva</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[hsl(225,55%,35%)] mb-6">
                The Divine Birthplace of Lord Krishna
              </h1>
              <p className="text-gray-600 leading-relaxed mb-6">
                Mathura is the eternal heart of Braj Bhoomi and the sacred birthplace of Lord Shri Krishna. This ancient city, nestled on the banks of the holy Yamuna river, has been a center of devotion and spiritual wisdom for thousands of years. Every stone, every ghat, every temple here resonates with the divine energy of Krishna&apos;s presence. From the sacred Shri Krishna Janmabhoomi to the countless temples that dot the landscape, Mathura invites seekers from across the world to experience the divine love that permeates this holy land.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other Sacred Places */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-[hsl(225,55%,35%)] text-center mb-12">
            Explore Other Sacred Places
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {sacredPlaces.map((place) => (
              <div key={place.name} className="relative group rounded-xl overflow-hidden shadow-md h-64">
                <Image
                  src="/attached_assets/generated_images/vrindavan_sunrise_temple_landscape.png"
                  alt={place.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-serif font-bold text-lg">{place.name}</h3>
                  <p className="text-white/80 text-xs">{place.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[hsl(225,55%,20%)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Experience the Divine Energy of Braj Bhoomi
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Connect with the sacred land of Krishna through Asthawaani&apos;s spiritual services.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Connect With Us
          </Link>
        </div>
      </section>
    </main>
  );
}
