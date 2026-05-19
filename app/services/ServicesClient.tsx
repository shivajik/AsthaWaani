'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanguage, useCmsPage } from '../lib/language-context';

interface Offering {
  id?: string;
  slug: string;
  title: string;
  titleHi?: string | null;
  subtitle?: string | null;
  subtitleHi?: string | null;
  description?: string | null;
  descriptionHi?: string | null;
  order?: number;
}

const fallbackServices: Offering[] = [
  { slug: 'daily-satsang', title: 'Daily Satsang', titleHi: 'दैनिक सत्संग', subtitle: 'Simple Spiritual Wisdom for Everyday Life', subtitleHi: 'हर दिन के जीवन के लिए सरल आध्यात्मिक ज्ञान', description: 'Join our daily satsang sessions where spiritual wisdom is shared in the simplest language. Every day, we bring you closer to the divine through meaningful discourse, guided meditation, and collective prayer.', descriptionHi: 'हमारे दैनिक सत्संग सत्रों से जुड़ें जहाँ आध्यात्मिक ज्ञान सरल भाषा में साझा किया जाता है। प्रवचन, ध्यान और सामूहिक प्रार्थना के माध्यम से हम आपको दिव्यता के करीब लाते हैं।' },
  { slug: 'katha-pravachan', title: 'Katha & Pravachan', titleHi: 'कथा और प्रवचन', subtitle: 'Ancient Wisdom in Simple Language', subtitleHi: 'सरल भाषा में प्राचीन ज्ञान', description: 'Our Katha and Pravachan sessions bring the timeless stories of our scriptures to life, from Bhagavad Gita to Ramayana and Bhagwat Katha.', descriptionHi: 'हमारे कथा और प्रवचन सत्र भगवद्गीता, रामायण और भागवत कथा जैसे शास्त्रों की अमर कथाओं को जीवंत करते हैं।' },
  { slug: 'bhajan-kirtan', title: 'Bhajan & Kirtan', titleHi: 'भजन और कीर्तन', subtitle: 'Devotional Music for Peace and Positivity', subtitleHi: 'शांति और सकारात्मकता के लिए भक्ति संगीत', description: 'Immerse yourself in the divine vibrations of bhajan and kirtan with soul-stirring devotional music from Vrindavan.', descriptionHi: 'वृंदावन के भावपूर्ण भक्ति संगीत के साथ भजन और कीर्तन की दिव्य तरंगों में डूब जाएँ।' },
  { slug: 'jaap-mantras', title: 'Jaap & Mantras', titleHi: 'जाप और मंत्र', subtitle: 'Calm the Mind, Strengthen Inner Faith', subtitleHi: 'मन को शांत करें, आंतरिक श्रद्धा को मजबूत करें', description: 'Discover the transformative power of mantra jaap and sacred vibrations passed down through millennia.', descriptionHi: 'मंत्र जाप और सहस्राब्दियों से चली आ रही पवित्र ध्वनियों की परिवर्तनकारी शक्ति को जानें।' },
  { slug: 'navgrah-shanti', title: 'Navgrah Shanti Path', titleHi: 'नवग्रह शांति पाठ', subtitle: 'Seek Balance and Stability', subtitleHi: 'संतुलन और स्थिरता पाएँ', description: 'Sacred chanting and rituals to bring harmony, stability, peace and prosperity.', descriptionHi: 'सामंजस्य, स्थिरता, शांति और समृद्धि के लिए पवित्र मंत्रोच्चार और अनुष्ठान।' },
  { slug: 'healing', title: 'Spiritual & Emotional Healing', titleHi: 'आध्यात्मिक और भावनात्मक उपचार', subtitle: 'Touch your Heart', subtitleHi: 'हृदय को स्पर्श करें', description: 'Experience deep healing through ancient Vedic wisdom and compassionate guidance.', descriptionHi: 'प्राचीन वैदिक ज्ञान और करुणामय मार्गदर्शन के माध्यम से गहन उपचार का अनुभव करें।' },
  { slug: 'life-guidance', title: 'Motivational & Life Guidance', titleHi: 'प्रेरक और जीवन मार्गदर्शन', subtitle: 'Faith-Based Positive Comfort', subtitleHi: 'आस्था आधारित सकारात्मक सहारा', description: 'Practical spiritual wisdom for everyday challenges, decisions, fear, purpose and relationships.', descriptionHi: 'दैनिक चुनौतियों, निर्णयों, भय, उद्देश्य और रिश्तों के लिए व्यावहारिक आध्यात्मिक ज्ञान।' },
  { slug: 'morning-aarti', title: 'Morning Aarti', titleHi: 'प्रातः आरती', subtitle: 'Start the day with Grace and Positivity', subtitleHi: 'कृपा और सकारात्मकता के साथ दिन शुरू करें', description: 'Begin each morning with sacred aarti from Vrindavan and bring temple energy into your home.', descriptionHi: 'वृंदावन की पवित्र आरती के साथ हर सुबह शुरुआत करें और मंदिर की ऊर्जा अपने घर लाएँ।' },
  { slug: 'community', title: 'Community', titleHi: 'समुदाय', subtitle: 'Grow Together on the Spiritual Path', subtitleHi: 'आध्यात्मिक मार्ग पर साथ बढ़ें', description: 'Join like-minded seekers through meditation, seva, spiritual discussions and festival celebrations.', descriptionHi: 'ध्यान, सेवा, आध्यात्मिक चर्चा और उत्सवों के माध्यम से समान विचार वाले साधकों से जुड़ें।' },
];

function pick(language: 'en' | 'hi', en?: string | null, hi?: string | null) {
  return (language === 'hi' && hi?.trim() ? hi : en) || '';
}

function textOnly(html: string) {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, 180);
}

export default function ServicesClient() {
  const { language } = useLanguage();
  const { title, content } = useCmsPage('services');
  const [services, setServices] = useState<Offering[]>(fallbackServices);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/offerings')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setServices([...data].sort((a, b) => (a.order || 0) - (b.order || 0)));
        }
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="min-h-screen">
      <section className="bg-amber-500 py-16 pt-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{title || (language === 'hi' ? 'हमारी सेवाएँ' : 'Our Services')}</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            {content ? textOnly(content) : language === 'hi' ? 'वृंदावन से हमारी पवित्र आध्यात्मिक सेवाओं के माध्यम से दिव्यता का अनुभव करें' : 'Experience the divine through our sacred spiritual services from Vrindavan'}
          </p>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.slug || service.title} className="bg-white rounded-lg border border-gray-200 p-8 hover:shadow-lg transition-shadow border-t-4 border-t-amber-400">
                <h3 className="text-xl font-serif font-bold text-[hsl(225,55%,35%)] mb-2">{pick(language, service.title, service.titleHi)}</h3>
                <p className="text-amber-600 text-sm font-medium italic mb-4">{pick(language, service.subtitle, service.subtitleHi)}</p>
                <div className="text-gray-600 text-sm leading-relaxed prose prose-sm max-w-none prose-p:my-0 prose-p:text-gray-600" dangerouslySetInnerHTML={{ __html: pick(language, service.description, service.descriptionHi) }} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-amber-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">{language === 'hi' ? 'हमारे आध्यात्मिक समुदाय से जुड़ें' : 'Join Our Spiritual Community'}</h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">{language === 'hi' ? 'हमसे जुड़ें और दुनिया में कहीं से भी वृंदावन की दिव्य ऊर्जा का अनुभव करें।' : 'Connect with us and experience the divine energy of Vrindavan from anywhere in the world.'}</p>
          <Link href="/community" className="inline-block bg-white text-amber-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">{language === 'hi' ? 'अभी जुड़ें' : 'Join Now'}</Link>
        </div>
      </section>
    </main>
  );
}
