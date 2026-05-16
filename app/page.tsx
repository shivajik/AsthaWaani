import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Asthawaani – Online Satsang, Bhajan & Mantra Jaap from Vrindavan',
  description: 'Asthawaani is a spiritual platform from Mathura-Vrindavan offering daily satsang, bhajan kirtan, mantra jaap, and katha pravachan. Join the digital satsang today.',
  openGraph: {
    title: 'Asthawaani – Online Satsang, Bhajan & Mantra Jaap from Vrindavan',
    description: 'A spiritual platform connecting divine voices from Mathura-Vrindavan with seekers worldwide. Daily satsang, bhajan, mantra jaap & more.',
    url: 'https://www.asthawaani.com',
    type: 'website',
    images: [{ url: 'https://www.asthawaani.com/opengraph.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asthawaani – Online Satsang, Bhajan & Mantra Jaap from Vrindavan',
    description: 'A spiritual platform connecting divine voices from Mathura-Vrindavan with seekers worldwide.',
    images: ['https://www.asthawaani.com/opengraph.jpg'],
  },
  alternates: { canonical: 'https://www.asthawaani.com' },
};

const offerings = [
  { title: 'Daily Satsang', desc: 'Live wisdom from Vrindavan.' },
  { title: 'Bhajan Kirtan', desc: 'Devotional music for the soul.' },
  { title: 'Morning Aarti', desc: 'Start your day with blessings.' },
  { title: 'Community', desc: 'Connect with fellow seekers.' },
];

const locations = [
  { id: 'mathura', name: 'Mathura', image: '/attached_assets/Temple/Srikrishna_Janmabhoomi.png' },
  { id: 'vrindavan', name: 'Vrindavan', image: '/attached_assets/Temple/Prem_mandir.png' },
  { id: 'gokul', name: 'Gokul', image: '/attached_assets/Temple/Raman_reti.png' },
  { id: 'govardhan', name: 'Govardhan', image: '/attached_assets/Temple/Daan_Ghati.png' },
  { id: 'mahavan', name: 'Mahavan', image: '/attached_assets/Temple/mahaban_Chaurasi.png' },
];

const videos = [
  { id: 'wRAHgryads0', title: 'पंडित अखिलेश गौड़ जी की चेतावनी! आज नहीं संभले तो देर हो जाएगी।', duration: '13:53' },
  { id: 'WkuCencbA9g', title: 'Sankat Mochan Hanuman Ashtak – Asthavaani Version', duration: '5:16' },
  { id: '7CHJ-56pf7s', title: 'अंजनी के लाल सालासर वाले | जय बजरंगबली | Salasar ji Balaji', duration: '2:12' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-cover bg-center scale-110" style={{ backgroundImage: 'url(/attached_assets/generated_images/vrindavan_sunrise_temple_landscape.png)' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-[#fee78c] drop-shadow-2xl">Asthawaani</h1>
          <div className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4 w-4/5 max-w-md"></div>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-white/90 drop-shadow-md leading-relaxed mt-6">To take the light of wisdom to every home.</p>
          <div className="mt-10">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-white font-serif text-lg px-10 py-4 rounded-full shadow-2xl shadow-amber-500/30 border border-amber-400/30 transition-all">
              ✨ Join the Digital Satsang
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-10 w-full flex flex-col items-center gap-2">
          <span className="text-white/50 text-sm tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-400 to-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* About Preview - 2 Column with Guru Image */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Guru Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/attached_assets/generated_images/spiritual_guru_teaching.png" 
                alt="Guru Speaking" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            
            {/* Text Content */}
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(45,90%,50%)]">What is Asthawaani?</h2>
              <p className="text-xl text-[hsl(225,55%,35%)] font-medium">A spiritual platform born from Mathura–Vrindavan.</p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Asthawaani opens a doorway for gifted spiritual voices. It connects these divine voices with seekers across India and the world — so that no true teacher remains unheard, and no true seeker remains unguided.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 border border-[hsl(45,90%,50%)] text-[hsl(45,90%,50%)] hover:bg-[hsl(45,90%,50%)] hover:text-white font-serif px-6 py-3 rounded-md transition-colors w-fit">
                Read Our Story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Our Services</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((item) => (
              <Link key={item.title} href="/services">
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all duration-500 rounded-xl p-8 text-center h-full cursor-pointer">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">{item.title}</h3>
                  <p className="text-white/60 group-hover:text-white/80 transition-colors">{item.desc}</p>
                  <div className="mt-6 flex items-center justify-center gap-2 text-amber-400/70 group-hover:text-amber-400 transition-colors">
                    <span className="text-sm font-medium">Learn more</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Locations with Images */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">Our Locations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our spiritual presence spans across the sacred Braj Bhoomi.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {locations.map((loc) => (
              <Link key={loc.id} href={`/brajbhoomi?location=${loc.id}`}>
                <div className="group relative overflow-hidden rounded-xl aspect-[3/4] bg-stone-200 cursor-pointer">
                  <img src={loc.image} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center p-4">
                    <div className="text-white text-center">
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-1">Ashram</p>
                      <h3 className="text-xl md:text-2xl font-serif font-bold">{loc.name}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Gallery */}
      <section className="py-24 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-[hsl(225,55%,35%)] mb-2">Divine Gallery</h2>
              <p className="text-gray-600">Watch our latest Satsangs</p>
            </div>
            <Link href="/videos" className="hidden md:flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors">
              View All Videos
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <a key={video.id} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="relative aspect-video bg-black overflow-hidden">
                  <img src={`https://i.ytimg.com/vi/${video.id}/sddefault.jpg`} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg">
                      <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">{video.duration}</div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-[hsl(225,55%,35%)] line-clamp-2 group-hover:text-amber-600 transition-colors">{video.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-[hsl(225,55%,35%)]">Ready to begin your journey?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://www.youtube.com/@Asthawaani" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold h-12 px-8 rounded-lg transition-colors shadow-lg">
              Subscribe on YouTube
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-[hsl(225,55%,35%)]/30 text-[hsl(225,55%,35%)] hover:bg-[hsl(225,55%,35%)]/10 h-12 px-8 rounded-lg shadow-md transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
