'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage, useCmsPage } from '../lib/language-context';

const sacredPlaces = [
  { name: 'Vrindavan', nameHi: 'वृंदावन', description: 'The Land of Divine Love and Bhakti', descriptionHi: 'दिव्य प्रेम और भक्ति की भूमि', image: '/attached_assets/Temple/Prem_mandir.png' },
  { name: 'Gokul', nameHi: 'गोकुल', description: 'The Sacred Childhood Abode of Shri Krishna', descriptionHi: 'श्रीकृष्ण की पवित्र बाल-लीला भूमि', image: '/attached_assets/Temple/Raman_reti.png' },
  { name: 'Govardhan', nameHi: 'गोवर्धन', description: 'The Sacred Hill of Protection', descriptionHi: 'रक्षा का पवित्र पर्वत', image: '/attached_assets/Temple/Daan_Ghati.png' },
  { name: 'Mahavan', nameHi: 'महावन', description: 'The Forest of Divine Protection', descriptionHi: 'दिव्य संरक्षण का वन', image: '/attached_assets/Temple/mahaban_Chaurasi.png' },
  { name: 'Barsana', nameHi: 'बरसाना', description: 'The Divine Land of Radha Rani', descriptionHi: 'राधा रानी की दिव्य भूमि', image: '/attached_assets/Temple/Barsana_Radha_Rani.png' },
];

function pick(language: 'en' | 'hi', en: string, hi: string) {
  return language === 'hi' ? hi : en;
}

export default function BrajbhoomiClient() {
  const { language } = useLanguage();
  const { title, content } = useCmsPage('brajbhoomi');

  return (
    <main className="min-h-screen pt-20">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image src="/attached_assets/Temple/Srikrishna_Janmabhoomi.png" alt={pick(language, 'Mathura Temple - The Divine Birthplace of Lord Krishna', 'मथुरा मंदिर - भगवान कृष्ण की जन्मभूमि')} fill className="object-cover" priority />
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {(language === 'hi' ? ['जन्मभूमि लीलाएँ', 'सनातन प्रवचन', 'कृष्ण तत्व'] : ['Janmabhoomi Leelas', 'Sanatan Pravachan', 'Krishna Tattva']).map((tag) => <span key={tag} className="text-xs font-semibold tracking-wider uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full">{tag}</span>)}
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[hsl(225,55%,35%)] mb-6">{title || pick(language, 'The Divine Birthplace of Lord Krishna', 'भगवान श्रीकृष्ण की दिव्य जन्मभूमि')}</h1>
              {content ? <div className="prose prose-lg max-w-none prose-p:text-gray-600 prose-p:leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: content }} /> : <p className="text-gray-600 leading-relaxed mb-6">{pick(language, "Mathura is the eternal heart of Braj Bhoomi and the sacred birthplace of Lord Shri Krishna. Every stone, every ghat, every temple here resonates with the divine energy of Krishna's presence.", 'मथुरा ब्रजभूमि का शाश्वत हृदय और भगवान श्रीकृष्ण की पवित्र जन्मभूमि है। यहाँ का हर पत्थर, हर घाट और हर मंदिर कृष्ण की दिव्य उपस्थिति की ऊर्जा से गूंजता है।')}</p>}
              <Link href="/contact" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">{pick(language, 'Get in touch', 'संपर्क करें')}</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-[hsl(225,55%,35%)] text-center mb-12">{pick(language, 'Explore Other Sacred Places', 'अन्य पवित्र स्थानों को जानें')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {sacredPlaces.map((place) => (
              <div key={place.name} className="relative group rounded-xl overflow-hidden shadow-md h-64">
                <Image src={place.image} alt={pick(language, place.name, place.nameHi)} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-serif font-bold text-lg">{pick(language, place.name, place.nameHi)}</h3>
                  <p className="text-white/80 text-xs">{pick(language, place.description, place.descriptionHi)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-[hsl(225,55%,20%)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">{pick(language, 'Experience the Divine Energy of Braj Bhoomi', 'ब्रजभूमि की दिव्य ऊर्जा का अनुभव करें')}</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">{pick(language, "Connect with the sacred land of Krishna through Asthawaani's spiritual services.", 'आस्थावाणी की आध्यात्मिक सेवाओं के माध्यम से कृष्ण की पवित्र भूमि से जुड़ें।')}</p>
          <Link href="/contact" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-lg transition-colors">{pick(language, 'Connect With Us', 'हमसे जुड़ें')}</Link>
        </div>
      </section>
    </main>
  );
}
