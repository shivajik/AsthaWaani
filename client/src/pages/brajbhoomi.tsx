import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import mathuraImage from "@assets/stock_images/mathura_temple_ghat__d4f9531c.jpg";
import vrindavanImage from "@assets/stock_images/vrindavan_temple_arc_5815b304.jpg";
import gokulImage from "@assets/stock_images/gokul_krishna_birthp_14f078c6.jpg";
import govardhanImage from "@assets/stock_images/govardhan_hill_templ_59e90b12.jpg";
import mahavanImage from "@assets/stock_images/mahavan_gokul_temple_486bbc8f.jpg";
import vrindavanSunrise from "@assets/generated_images/vrindavan_sunrise_temple_landscape.png";

const locationsData = [
  {
    id: "mathura",
    name: { en: "Mathura", hi: "मथुरा" },
    title: { en: "The Divine Birthplace of Lord Krishna", hi: "भगवान कृष्ण की दिव्य जन्मभूमि" },
    image: mathuraImage,
    description: {
      en: "Mathura is the eternal heart of Braj Bhoomi and the sacred birthplace of Lord Shri Krishna, making it one of the most revered spiritual destinations in India. Asthawaani's spiritual presence in Mathura represents the origin of divine consciousness, bhakti, and Sanatan wisdom. From Shri Krishna Janmabhoomi to ancient ghats along the Yamuna, Mathura resonates with timeless devotion and divine leela. Through Asthawaani, seekers experience authentic satsang, pravachan, bhajan, and spiritual discourse rooted in Mathura's sacred vibrations. This holy land symbolizes the beginning of dharma, devotion, and divine love, offering spiritual awakening, inner peace, and cultural heritage to listeners across the globe.",
      hi: "मथुरा ब्रज भूमि का शाश्वत हृदय है और भगवान श्री कृष्ण की पवित्र जन्मभूमि है, जो इसे भारत के सबसे सम्मानित आध्यात्मिक गंतव्यों में से एक बनाती है। मथुरा में आस्थावाणी की आध्यात्मिक उपस्थिति दिव्य चेतना, भक्ति और सनातन ज्ञान की उत्पत्ति का प्रतिनिधित्व करती है।"
    },
    specialization: { en: "Janmabhoomi Leelas, Sanatan Pravachan, Krishna Tattva", hi: "जन्मभूमि लीलाएं, सनातन प्रवचन, कृष्ण तत्व" },
    keywords: "Mathura spirituality, Krishna Janmabhoomi, Braj Bhoomi satsang"
  },
  {
    id: "vrindavan",
    name: { en: "Vrindavan", hi: "वृंदावन" },
    title: { en: "The Land of Divine Love and Bhakti", hi: "दिव्य प्रेम और भक्ति की भूमि" },
    image: vrindavanImage,
    description: {
      en: "Vrindavan is the soul of Krishna Bhakti, where every particle breathes devotion and divine love. Known for Raas Leela, Bhajan-Kirtan, and Naam Jap, Vrindavan is the spiritual heartbeat of Asthawaani. Our presence in Vrindavan brings live satsang, devotional music, and spiritual wisdom directly from the land where Lord Krishna spent His childhood. From Banke Bihari Ji to Nidhivan, Vrindavan represents surrender, love, and pure bhakti. Asthawaani connects seekers worldwide to Vrindavan's divine energy, helping them experience inner transformation, emotional healing, and spiritual fulfillment.",
      hi: "वृंदावन कृष्ण भक्ति की आत्मा है, जहां हर कण भक्ति और दिव्य प्रेम से सांस लेता है। रास लीला, भजन-कीर्तन और नाम जप के लिए प्रसिद्ध, वृंदावन आस्थावाणी की आध्यात्मिक धड़कन है।"
    },
    specialization: { en: "Bhakti Yoga, Bhajan-Kirtan, Raas Leela", hi: "भक्ति योग, भजन-कीर्तन, रास लीला" },
    keywords: "Vrindavan bhakti, Krishna bhajan, live satsang Vrindavan"
  },
  {
    id: "gokul",
    name: { en: "Gokul", hi: "गोकुल" },
    title: { en: "The Sacred Childhood Abode of Shri Krishna", hi: "श्री कृष्ण का पवित्र बाल्यकाल निवास" },
    image: gokulImage,
    description: {
      en: "Gokul is the sacred land where Lord Krishna's bal-leelas unfolded under the loving care of Yashoda Maiya and Nand Baba. Asthawaani's spiritual offerings from Gokul highlight innocence, divine protection, and pure devotion. The holy soil of Gokul teaches values of love, simplicity, and surrender. Through spiritual storytelling, satsang, and Krishna leela narration, Asthawaani brings Gokul's divine essence to households worldwide. Gokul represents the nurturing aspect of divinity, reminding seekers that God resides where love is unconditional.",
      hi: "गोकुल वह पवित्र भूमि है जहां यशोदा मैया और नंद बाबा की प्रेमपूर्ण देखभाल में भगवान कृष्ण की बाल-लीलाएं प्रकट हुईं। गोकुल से आस्थावाणी की आध्यात्मिक पेशकश मासूमियत, दिव्य सुरक्षा और शुद्ध भक्ति को उजागर करती है।"
    },
    specialization: { en: "Bal Leela Kathas, Parental Bhakti, Krishna Childhood Stories", hi: "बाल लीला कथाएं, पैतृक भक्ति, कृष्ण बाल्यकाल कहानियां" },
    keywords: "Gokul Krishna leela, Bal Krishna stories, Gokul satsang"
  },
  {
    id: "govardhan",
    name: { en: "Govardhan", hi: "गोवर्धन" },
    title: { en: "The Sacred Hill of Protection and Surrender", hi: "सुरक्षा और समर्पण का पवित्र पर्वत" },
    image: govardhanImage,
    description: {
      en: "Govardhan is the divine symbol of faith, protection, and surrender, where Lord Krishna lifted the Govardhan Parvat to protect devotees. Asthawaani's spiritual presence in Govardhan focuses on teachings of humility, seva, and unwavering faith. Govardhan Parikrama, Annakut, and Krishna's teachings inspire devotees to seek refuge in dharma over ego. Through Asthawaani's pravachan and spiritual discourse, Govardhan becomes a guiding light for those facing challenges, reminding them that true surrender brings divine protection.",
      hi: "गोवर्धन विश्वास, सुरक्षा और समर्पण का दिव्य प्रतीक है, जहां भगवान कृष्ण ने भक्तों की रक्षा के लिए गोवर्धन पर्वत उठाया था। गोवर्धन में आस्थावाणी की आध्यात्मिक उपस्थिति विनम्रता, सेवा और अटल विश्वास की शिक्षाओं पर केंद्रित है।"
    },
    specialization: { en: "Govardhan Leela, Dharma & Surrender, Spiritual Resilience", hi: "गोवर्धन लीला, धर्म और समर्पण, आध्यात्मिक लचीलापन" },
    keywords: "Govardhan parvat, Krishna protection leela, Govardhan parikrama"
  },
  {
    id: "mahavan",
    name: { en: "Mahavan", hi: "महावन" },
    title: { en: "The Forest of Divine Protection", hi: "दिव्य सुरक्षा का वन" },
    image: mahavanImage,
    description: {
      en: "Mahavan is a deeply sacred forest region where Lord Krishna performed powerful childhood leelas and protected devotees from demons. Asthawaani highlights Mahavan as a land of divine courage, protection, and inner strength. This holy place symbolizes spiritual safeguarding and the victory of dharma over negativity. Through Asthawaani's storytelling and satsang, Mahavan's energy inspires seekers to overcome fear, negativity, and inner battles with faith and devotion.",
      hi: "महावन एक गहन पवित्र वन क्षेत्र है जहां भगवान कृष्ण ने शक्तिशाली बचपन की लीलाएं कीं और भक्तों को राक्षसों से बचाया। आस्थावाणी महावन को दिव्य साहस, सुरक्षा और आंतरिक शक्ति की भूमि के रूप में उजागर करता है।"
    },
    specialization: { en: "Protection Leelas, Inner Strength, Fear Removal", hi: "सुरक्षा लीलाएं, आंतरिक शक्ति, भय निवारण" },
    keywords: "Mahavan Krishna leela, divine protection stories, Braj forest"
  },
  {
    id: "barsana",
    name: { en: "Barsana", hi: "बरसाना" },
    title: { en: "The Divine Land of Radha Rani", hi: "राधा रानी की दिव्य भूमि" },
    image: vrindavanImage,
    description: {
      en: "Barsana is the sacred birthplace of Shri Radha Rani, the embodiment of supreme devotion and divine love. Asthawaani's presence in Barsana celebrates Radha-Krishna Bhakti, spiritual femininity, and unconditional surrender. Known for Lathmar Holi and Radha Bhav, Barsana represents devotion beyond words. Through satsang, bhajan, and spiritual discourse, Asthawaani brings Radha Rani's grace, compassion, and bhakti to seekers seeking emotional healing and divine connection.",
      hi: "बरसाना श्री राधा रानी की पवित्र जन्मभूमि है, जो सर्वोच्च भक्ति और दिव्य प्रेम का मूर्त रूप हैं। बरसाना में आस्थावाणी की उपस्थिति राधा-कृष्ण भक्ति, आध्यात्मिक स्त्रीत्व और बिना शर्त समर्पण का जश्न मनाती है।"
    },
    specialization: { en: "Radha Bhakti, Divine Love, Emotional Healing", hi: "राधा भक्ति, दिव्य प्रेम, भावनात्मक उपचार" },
    keywords: "Barsana Radha Rani, Radha Krishna bhakti, Barsana spirituality"
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

export default function Brajbhoomi() {
  const { language } = useLanguage();

  const pageTitle = language === 'en' 
    ? "Brajbhoomi Darshan - Sacred Places of Lord Krishna | Asthawaani" 
    : "ब्रजभूमि दर्शन - भगवान कृष्ण के पवित्र स्थान | आस्थावाणी";
  
  const pageDescription = language === 'en'
    ? "Explore the sacred Brajbhoomi - Mathura, Vrindavan, Gokul, Govardhan, Mahavan, and Barsana. Experience divine temples and spiritual heritage of Lord Krishna's land."
    : "पवित्र ब्रजभूमि का अन्वेषण करें - मथुरा, वृंदावन, गोकुल, गोवर्धन, महावन और बरसाना। भगवान कृष्ण की भूमि के दिव्य मंदिरों और आध्यात्मिक विरासत का अनुभव करें।";

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content="Brajbhoomi darshan, Mathura spirituality, Vrindavan bhakti, Krishna Janmabhoomi, Govardhan parikrama, Gokul Krishna leela, Barsana Radha Rani, sacred temples India" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />

      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${vrindavanSunrise})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>
          
          <motion.div 
            className="relative z-10 container mx-auto px-4 text-center text-white py-32"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              <MapPin className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium text-amber-200">
                {language === 'en' ? 'Sacred Pilgrimage' : 'पवित्र तीर्थयात्रा'}
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-amber-200" data-testid="brajbhoomi-page-title">
              {language === 'en' ? 'Brajbhoomi Darshan' : 'ब्रजभूमि दर्शन'}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
              {language === 'en' 
                ? 'Journey through the sacred lands where Lord Krishna performed divine leelas'
                : 'उन पवित्र भूमियों की यात्रा करें जहां भगवान कृष्ण ने दिव्य लीलाएं कीं'}
            </p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {locationsData.slice(0, 5).map((loc) => (
                <span 
                  key={loc.id}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-amber-200 border border-amber-400/30"
                >
                  {loc.name[language]}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Locations Grid */}
        <section className="py-24 bg-gradient-to-b from-stone-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
                {language === 'en' ? 'Sacred Destinations' : 'पवित्र गंतव्य'}
              </h2>
              <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                {language === 'en' 
                  ? 'Each place in Braj Bhoomi carries unique spiritual significance and divine energy'
                  : 'ब्रज भूमि का प्रत्येक स्थान अद्वितीय आध्यात्मिक महत्व और दिव्य ऊर्जा रखता है'}
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-16"
            >
              {locationsData.map((location, index) => (
                <motion.div
                  key={location.id}
                  variants={fadeUpItem}
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <motion.div
                      className="relative rounded-2xl overflow-hidden shadow-2xl group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img 
                        src={location.image} 
                        alt={location.name[language]}
                        className="w-full h-80 md:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-2 text-amber-400 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm font-medium uppercase tracking-wider">
                            {language === 'en' ? 'Sacred Site' : 'पवित्र स्थल'}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                          {location.name[language]}
                        </h3>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="inline-flex items-center gap-2 text-amber-600 mb-4">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-sm font-semibold uppercase tracking-wider">
                        {location.specialization[language]}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-800 mb-4">
                      {location.title[language]}
                    </h3>
                    
                    <p className="text-stone-600 leading-relaxed mb-6 text-lg">
                      {location.description[language]}
                    </p>
                    
                    <Link href="/contact">
                      <Button 
                        variant="outline" 
                        className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white group"
                        data-testid={`location-cta-${location.id}`}
                      >
                        {language === 'en' ? 'Experience Satsang' : 'सत्संग का अनुभव करें'}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                {language === 'en' 
                  ? 'Experience the Divine Energy of Braj Bhoomi' 
                  : 'ब्रज भूमि की दिव्य ऊर्जा का अनुभव करें'}
              </h2>
              <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                {language === 'en'
                  ? 'Join Asthawaani to receive authentic spiritual wisdom and satsang from these sacred lands directly to your home.'
                  : 'इन पवित्र भूमियों से सीधे अपने घर तक प्रामाणिक आध्यात्मिक ज्ञान और सत्संग प्राप्त करने के लिए आस्थावाणी से जुड़ें।'}
              </p>
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-serif text-lg px-8 py-6"
                  data-testid="brajbhoomi-cta-button"
                >
                  {language === 'en' ? 'Connect With Us' : 'हमसे जुड़ें'}
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
