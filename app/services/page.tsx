import type { Metadata } from 'next';

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
  { title: 'Daily Satsang', titleHi: 'दैनिक सत्संग', description: 'Live spiritual discourse and guidance from Vrindavan every day.' },
  { title: 'Bhajan Kirtan', titleHi: 'भजन कीर्तन', description: 'Devotional music that elevates the spirit and connects the heart to divinity.' },
  { title: 'Morning Aarti', titleHi: 'प्रातः आरती', description: 'Begin your day with the divine morning aarti ceremony from Vrindavan.' },
  { title: 'Mantra Jaap', titleHi: 'मंत्र जाप', description: 'Sacred chanting and meditation for peace, healing and spiritual growth.' },
  { title: 'Katha Pravachan', titleHi: 'कथा प्रवचन', description: 'Timeless wisdom through sacred stories from our spiritual traditions.' },
  { title: 'Community Service', titleHi: 'समुदाय सेवा', description: 'Join our spiritual community for collective healing, growth, and service.' },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-20">
      <section className="py-24 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">What We Offer</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Our Spiritual Services</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center hover:border-amber-500/30 transition-all">
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-amber-400 mb-4">{service.titleHi}</p>
                <p className="text-white/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
