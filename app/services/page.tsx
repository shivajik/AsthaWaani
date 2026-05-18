import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Services – Satsang, Katha, Bhajan, Mantra Jaap | Asthawaani',
  description: 'Explore Asthawaani spiritual services: Daily Satsang, Katha Pravachan, Bhajan Kirtan, Mantra Jaap, Navgrah Shanti, Morning Aarti & community from Vrindavan.',
  openGraph: {
    title: 'Our Services – Satsang, Katha, Bhajan, Mantra Jaap | Asthawaani',
    description: 'Explore Asthawaani spiritual services: Daily Satsang, Katha Pravachan, Bhajan Kirtan, Mantra Jaap, Navgrah Shanti.',
    url: 'https://www.asthawaani.com/services',
    type: 'website',
    images: [{ url: 'https://www.asthawaani.com/opengraph.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.asthawaani.com/services' },
};

const services = [
  {
    title: 'Daily Satsang',
    subtitle: 'Simple Spiritual Wisdom for Everyday Life',
    description: 'Join our daily satsang sessions where spiritual wisdom is shared in the simplest language. Every day, we bring you closer to the divine through meaningful discourse, guided meditation, and collective prayer. Our satsang is designed for everyone — whether you are a seasoned seeker or just beginning your spiritual journey. Experience the peace that comes from daily connection with the divine.',
  },
  {
    title: 'Katha & Pravachan',
    subtitle: 'Ancient Wisdom in Simple Language',
    description: 'Our Katha and Pravachan sessions bring the timeless stories of our scriptures to life. From the Bhagavad Gita to the Ramayana, from Bhagwat Katha to Shiv Puran — our learned speakers present ancient wisdom in a way that resonates with modern life. Each session is crafted to inspire, heal, and guide you on your spiritual path.',
  },
  {
    title: 'Bhajan & Kirtan',
    subtitle: 'Devotional Music for Peace and Positivity',
    description: 'Immerse yourself in the divine vibrations of bhajan and kirtan. Our devotional music sessions feature talented singers from Vrindavan and across India, performing soul-stirring bhajans that elevate your consciousness. Whether it is Krishna bhajan, Ram bhajan, or Shiv bhajan — let the music carry you to a state of bliss and inner peace.',
  },
  {
    title: 'Jaap & Mantras',
    subtitle: 'Calm the Mind, Strengthen Inner Faith',
    description: 'Discover the transformative power of mantra jaap. Our guided sessions help you learn and practice sacred mantras that calm the mind, purify the soul, and strengthen your connection with the divine. From the Gayatri Mantra to the Mahamrityunjaya Mantra — experience the healing vibrations that have been passed down through millennia.',
  },
  {
    title: 'Navgrah Shanti Path',
    subtitle: 'Seek Balance and Stability',
    description: 'Our Navgrah Shanti Path sessions are designed to bring cosmic balance and harmony into your life. Through sacred chanting and rituals, we help neutralize the negative effects of planetary positions and bring stability, peace, and prosperity. Guided by experienced pandits from Mathura-Vrindavan.',
  },
  {
    title: 'Spiritual & Emotional Healing',
    subtitle: 'Touch your Heart',
    description: 'Experience deep spiritual and emotional healing through our specialized sessions. Our healers combine ancient Vedic wisdom with compassionate guidance to help you overcome emotional blocks, find inner peace, and reconnect with your true self. Every session is a safe space for transformation and growth.',
  },
  {
    title: 'Motivational & Life Guidance',
    subtitle: 'One-Based Positive Comfort',
    description: 'Life can be challenging, but you don\'t have to face it alone. Our motivational and life guidance sessions offer practical spiritual wisdom for everyday challenges. From career decisions to relationship guidance, from overcoming fear to finding purpose — our speakers provide faith-based positive comfort for every situation.',
  },
  {
    title: 'Morning Aarti',
    subtitle: 'Start the day with Grace and Positivity',
    description: 'Begin each morning with the sacred aarti ceremony from Vrindavan. Our live morning aarti sessions bring the divine energy of the temple directly to your home. Start your day with grace, gratitude, and positivity as you witness the beautiful aarti rituals performed with devotion and love.',
  },
  {
    title: 'Community',
    subtitle: 'Grow Together on the Spiritual Path',
    description: 'Join a community of like-minded seekers who support each other on the spiritual path. Our community initiatives include group meditation, seva opportunities, spiritual discussions, and collective celebrations of festivals. Together, we grow stronger in faith and closer to the divine.',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-amber-500 py-16 pt-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Our Services</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Experience the divine through our sacred spiritual services from Vrindavan
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow border-t-4 border-t-amber-400">
                <h3 className="text-xl font-serif font-bold text-[hsl(225,55%,35%)] mb-2">{service.title}</h3>
                <p className="text-amber-600 text-sm font-medium italic mb-4">{service.subtitle}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Join Our Spiritual Community</h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Connect with us and experience the divine energy of Vrindavan from anywhere in the world.
          </p>
          <Link
            href="/community"
            className="inline-block bg-white text-amber-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Join Now
          </Link>
        </div>
      </section>
    </main>
  );
}
