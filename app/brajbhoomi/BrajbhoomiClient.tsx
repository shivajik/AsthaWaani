'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../lib/language-context';

const sacredPlaces = [
  { slug: 'mathura', name: 'Mathura', nameHi: 'मथुरा', description: 'The Divine Birthplace of Lord Krishna', descriptionHi: 'भगवान श्रीकृष्ण की दिव्य जन्मभूमि', image: '/attached_assets/Temple/Srikrishna_Janmabhoomi.webp' },
  { slug: 'vrindavan', name: 'Vrindavan', nameHi: 'वृंदावन', description: 'The Eternal Land of Radha-Krishna Leela', descriptionHi: 'राधा-कृष्ण लीला की शाश्वत भूमि', image: '/attached_assets/Temple/Prem_mandir.webp' },
  { slug: 'gokul', name: 'Gokul', nameHi: 'गोकुल', description: 'The Sacred Childhood Abode of Shri Krishna', descriptionHi: 'श्रीकृष्ण की पवित्र बाल-लीला भूमि', image: '/attached_assets/Temple/Raman_reti.webp' },
  { slug: 'govardhan', name: 'Govardhan', nameHi: 'गोवर्धन', description: 'The Sacred Hill Lifted by Krishna', descriptionHi: 'श्रीकृष्ण द्वारा उठाया गया पवित्र पर्वत', image: '/attached_assets/Temple/Daan_Ghati.webp' },
  { slug: 'mahavan', name: 'Mahavan', nameHi: 'महावन', description: 'The Forest of Krishna’s Bal-Leelas', descriptionHi: 'श्रीकृष्ण की बाल-लीलाओं का वन', image: '/attached_assets/Temple/mahaban_Chaurasi.webp' },
  { slug: 'barsana', name: 'Barsana', nameHi: 'बरसाना', description: 'The Divine Birthplace of Radha Rani', descriptionHi: 'श्री राधा रानी की दिव्य जन्मस्थली', image: '/attached_assets/Temple/Barsana_Radha_Rani.webp' },
];

const overview = [
  { heading: 'What is Braj Bhoomi?', headingHi: 'ब्रजभूमि क्या है?', body: 'Braj Bhoomi (also spelt Brajbhoomi or Braj Bhumi) is the 84-kosi sacred region spread across Mathura, Vrindavan, Gokul, Govardhan, Mahavan, Barsana and Nandgaon — the eternal land where Bhagwan Shri Krishna descended five thousand years ago to perform His divine leelas. Every grove, river bend, hill and temple of Braj carries the imprint of His childhood, His raas-leela with Shri Radha Rani, and the bhakti of countless saints from Vallabhacharya and Chaitanya Mahaprabhu to Surdas, Meera and Swami Haridas.', bodyHi: 'ब्रजभूमि (जिसे ब्रज भूमि अथवा ब्रज भूमि भी लिखा जाता है) वह 84-कोसी पवित्र क्षेत्र है जो मथुरा, वृंदावन, गोकुल, गोवर्धन, महावन, बरसाना और नंदगाँव में फैला है — वही शाश्वत भूमि जहाँ पाँच हजार वर्ष पूर्व भगवान श्रीकृष्ण ने अपनी दिव्य लीलाओं हेतु अवतार लिया। ब्रज के प्रत्येक कुंज, यमुना के प्रत्येक मोड़, प्रत्येक पर्वत और मंदिर पर उनकी बाल्यावस्था, श्री राधा रानी के साथ रास-लीला तथा वल्लभाचार्य, चैतन्य महाप्रभु, सूरदास, मीरा और स्वामी हरिदास जैसे असंख्य संतों की भक्ति का अंकन है।' },
  { heading: 'Spiritual Significance', headingHi: 'आध्यात्मिक महत्व', body: 'Sanatan scriptures declare that even the dust (raj) of Braj is liberating. A single yatra is said to grant punya equal to many lifetimes of sadhana, because here the Supreme Brahman Himself walked, played, danced and loved as Krishna. For devotees of madhurya-bhakti, Braj is the highest of all dhams — even higher than Vaikuntha — because here the Lord reveals His most intimate form as the beloved of Radha.', bodyHi: 'सनातन शास्त्र घोषित करते हैं कि ब्रज की रज स्वयं मुक्ति प्रदान करने वाली है। ब्रज की एक यात्रा अनेक जन्मों की साधना के समान पुण्य प्रदान करती है, क्योंकि यहाँ साक्षात् परब्रह्म ने श्रीकृष्ण के रूप में पद-यात्रा की, खेले, नृत्य किया और प्रेम किया। माधुर्य-भक्ति के भक्तों के लिए ब्रज समस्त धामों में सर्वोच्च है — यहाँ तक कि वैकुंठ से भी ऊँचा — क्योंकि यहीं भगवान अपना सर्वाधिक अंतरंग स्वरूप राधा के प्रिय के रूप में प्रकट करते हैं।' },
  { heading: 'Radha & Krishna — The Eternal Divine Love', headingHi: 'राधा-कृष्ण — शाश्वत दिव्य प्रेम', body: 'The love story of Radha and Krishna is not romance in the worldly sense — it is the highest expression of soul\'s longing for the Divine. Shri Radha Rani, born in Barsana, is not separate from Krishna; She is His hladini-shakti, the very energy by which He experiences bliss. Wherever devotees chant "Radhe Radhe" in Braj — from Nidhivan to Prem Mandir to Sankari Khor — they participate in this eternal prem. Radha\'s love for Krishna is the model of pure surrender; Krishna\'s love for Radha reveals that even God bows before true bhakti. To seek Krishna without Radha is incomplete; the two names together are the mahamantra of Braj Bhoomi.', bodyHi: 'राधा-कृष्ण की प्रेम-गाथा सांसारिक रोमांस नहीं — यह आत्मा की परमात्मा के लिए तड़प की सर्वोच्च अभिव्यक्ति है। बरसाना में जन्मीं श्री राधा रानी कृष्ण से भिन्न नहीं — वे उनकी ह्लादिनी-शक्ति हैं, वही ऊर्जा जिसके द्वारा वे आनंद का अनुभव करते हैं। जहाँ भी भक्त ब्रज में "राधे राधे" का उद्घोष करते हैं — निधिवन से प्रेम मंदिर तक, संकरी खोर तक — वे इसी शाश्वत प्रेम में सहभागी होते हैं। राधा का कृष्ण के प्रति प्रेम शुद्ध समर्पण का आदर्श है; कृष्ण का राधा के प्रति प्रेम प्रकट करता है कि साक्षात् भगवान भी सच्ची भक्ति के समक्ष नतमस्तक हो जाते हैं।' },
  { heading: 'Yamuna & the Holy Rivers of Braj', headingHi: 'यमुना एवं ब्रज की पवित्र नदियाँ', body: 'The Yamuna is the soul-river of Braj Bhoomi. Among the seven holy rivers of India — Ganga, Yamuna, Godavari, Saraswati, Narmada, Sindhu and Kaveri — Yamuna holds a special place because Krishna Himself bathed, played and performed leelas along her banks. Every important spot of Braj — Vishram Ghat in Mathura, Kesi Ghat in Vrindavan, Brahmand Ghat in Gokul — sits along her sacred flow. Beyond Yamuna, Braj is blessed with Manasi Ganga (created by Krishna\'s sankalp at Govardhan), Radha Kund and Shyam Kund — the two most sacred kunds in all of Sanatan Dharma. Bathing in these waters is considered spiritually equivalent to a lifetime of tirtha-yatra.', bodyHi: 'यमुना ब्रजभूमि की आत्मा-नदी है। भारत की सात पवित्र नदियों — गंगा, यमुना, गोदावरी, सरस्वती, नर्मदा, सिंधु और कावेरी — में यमुना का विशेष स्थान है क्योंकि स्वयं श्रीकृष्ण उनके तटों पर स्नान करते, खेलते और लीलाएँ करते थे। ब्रज का प्रत्येक महत्वपूर्ण स्थल — मथुरा का विश्राम घाट, वृंदावन का केसी घाट, गोकुल का ब्रह्मांड घाट — उन्हीं की पवित्र धारा पर बसा है। यमुना के अतिरिक्त ब्रज को मानसी गंगा (गोवर्धन में श्रीकृष्ण के संकल्प से उत्पन्न), राधा कुंड तथा श्याम कुंड का वरदान प्राप्त है — समस्त सनातन धर्म के दो सर्वाधिक पवित्र कुंड।' },
  { heading: 'Ideal Yatra Plan (3–4 Days)', headingHi: 'आदर्श यात्रा-योजना (3–4 दिवस)', body: 'Day 1: Mathura Janmabhoomi, Dwarkadhish, Vishram Ghat Aarti. Day 2: Vrindavan — Banke Bihari, Prem Mandir, ISKCON, Nidhivan, Radha Raman. Day 3: Govardhan parikrama, Radha Kund, Manasi Ganga, Daan Ghati. Day 4: Gokul, Mahavan-Chaurasi Khamba, Barsana Shriji Mandir and Nandgaon. Asthawaani arranges authentic guided yatras with seasoned pandits, comfortable transport and proper vidhi.', bodyHi: 'दिवस 1: मथुरा जन्मभूमि, द्वारकाधीश, विश्राम घाट आरती। दिवस 2: वृंदावन — बांके बिहारी, प्रेम मंदिर, इस्कॉन, निधिवन, राधा रमण। दिवस 3: गोवर्धन परिक्रमा, राधा कुंड, मानसी गंगा, दान घाटी। दिवस 4: गोकुल, महावन-चौरासी खंभा, बरसाना श्रीजी मंदिर और नंदगाँव। आस्थावाणी अनुभवी पंडितों, सुविधाजनक यातायात तथा उचित विधि सहित प्रामाणिक निर्देशित यात्राएँ संचालित करती है।' },
  { heading: 'Best Time to Visit Braj', headingHi: 'ब्रज दर्शन का श्रेष्ठ समय', body: 'October to March is the most comfortable weather. Janmashtami (Aug–Sep), Radhashtami, Govardhan Puja, Kartik Deep-Daan, Holi and Lathmar Holi turn the entire region into a living festival of bhakti. Avoid peak summer (May–June) when temperatures cross 45°C.', bodyHi: 'अक्तूबर से मार्च तक मौसम सर्वाधिक सुखद रहता है। जन्माष्टमी (अगस्त–सितंबर), राधाष्टमी, गोवर्धन पूजा, कार्तिक दीप-दान, होली तथा लठमार होली पूरे क्षेत्र को भक्ति के जीवंत उत्सव में परिवर्तित कर देते हैं। मई–जून के प्रचंड ग्रीष्म से बचें जब तापमान 45°C के पार चला जाता है।' },
];

function pick(language: 'en' | 'hi', en: string, hi: string) {
  return language === 'hi' ? hi : en;
}

export default function BrajbhoomiClient() {
  const { language } = useLanguage();
  

  return (
    <main className="min-h-screen pt-28 md:pt-32">
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 text-sm text-gray-500">
        <ol className="flex gap-2">
          <li><Link href="/" className="hover:text-amber-700">{pick(language, 'Home', 'होम')}</Link></li>
          <li aria-hidden="true">›</li>
          <li className="text-gray-800">{pick(language, 'Braj Bhoomi', 'ब्रज भूमि')}</li>
        </ol>
      </nav>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image src="/attached_assets/Temple/Srikrishna_Janmabhoomi.webp" alt={pick(language, 'Shri Krishna Janmabhoomi Temple in Mathura, Braj Bhoomi, Uttar Pradesh — birthplace of Lord Krishna', 'मथुरा में श्री कृष्ण जन्मभूमि मंदिर, ब्रज भूमि, उत्तर प्रदेश — भगवान कृष्ण की जन्मस्थली')} fill className="object-cover" priority />
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {(language === 'hi' ? ['ब्रज भूमि', 'राधा-कृष्ण', 'यमुना तट'] : ['Braj Bhoomi', 'Radha-Krishna', 'Yamuna Ghats']).map((tag) => <span key={tag} className="text-xs font-semibold tracking-wider uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full">{tag}</span>)}
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">{pick(language, 'Braj Bhoomi – Sacred Land of Radha-Krishna', 'ब्रजभूमि — राधा-कृष्ण की पवित्र भूमि')}</h1>
              <p className="text-gray-600 leading-relaxed mb-4">{pick(language, "Braj Bhoomi (also spelt Brajbhoomi or Braj Bhumi) is the 84-kosi sacred region of Mathura, Vrindavan, Gokul, Govardhan, Mahavan and Barsana — the eternal land of Bhagwan Shri Krishna's leelas and the birthplace of Shri Radha Rani. This is your complete yatra guide with darshan timings, distances, festivals and how-to-reach details.", 'ब्रजभूमि (जिसे ब्रज भूमि अथवा ब्रज भूमि भी कहा जाता है) मथुरा, वृंदावन, गोकुल, गोवर्धन, महावन और बरसाना का 84-कोसी पवित्र क्षेत्र है — भगवान श्रीकृष्ण की लीलाओं की शाश्वत भूमि तथा श्री राधा रानी की जन्मस्थली।')}</p>
              <Link href="/brajbhoomi/vrindavan" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors mr-3">{pick(language, 'Explore Vrindavan', 'वृंदावन देखें')}</Link>
              <Link href="/contact" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">{pick(language, 'Plan a Yatra', 'यात्रा योजना')}</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-[hsl(225,55%,35%)] text-center mb-12">{pick(language, 'Explore Other Sacred Places', 'अन्य पवित्र स्थानों को जानें')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {sacredPlaces.map((place) => (
              <Link href={`/brajbhoomi/${place.slug}`} key={place.slug} className="relative group rounded-xl overflow-hidden shadow-md h-64 block focus:outline-none focus:ring-2 focus:ring-amber-500">
                <Image src={place.image} alt={pick(language, place.name, place.nameHi)} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-serif font-bold text-lg">{pick(language, place.name, place.nameHi)}</h3>
                  <p className="text-white/80 text-xs">{pick(language, place.description, place.descriptionHi)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[hsl(225,55%,35%)] text-center mb-10">{pick(language, 'About Braj Bhoomi', 'ब्रजभूमि के बारे में')}</h2>
          <div className="space-y-8">
            {overview.map((s) => (
              <article key={s.heading} className="bg-white rounded-xl shadow-sm border border-amber-100/60 p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[hsl(225,55%,30%)] mb-3">{pick(language, s.heading, s.headingHi)}</h3>
                <p className="text-gray-700 leading-relaxed">{pick(language, s.body, s.bodyHi)}</p>
              </article>
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
