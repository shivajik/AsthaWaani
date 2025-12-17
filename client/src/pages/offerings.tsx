import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Video, Music, Sun, Users, BookOpen, Heart, 
  Sparkles, Mic, Moon, HandHeart, ArrowRight 
} from "lucide-react";
import bhajanKirtan from "@assets/generated_images/devotional_bhajan_kirtan.png";

const offeringsData = [
  {
    id: "daily-satsang",
    icon: Video,
    title: { en: "Daily Satsang", hi: "दैनिक सत्संग" },
    subtitle: { en: "Simple Spiritual Wisdom for Everyday Life", hi: "दैनिक जीवन के लिए सरल आध्यात्मिक ज्ञान" },
    description: {
      en: "Daily Satsang on Asthawaani is a peaceful and meaningful way to receive real spiritual guidance for daily life. These satsangs are shared from the sacred land of Vrindavan, where devotion, bhakti, and Sanatan wisdom flow naturally. The focus of Daily Satsang is not heavy philosophy, but simple life understanding—how to stay calm in difficult times, how to control the mind, how to live with faith, and how to move forward with positivity. Through pravachan, spiritual stories, and practical examples, Asthawaani helps listeners find mental shanti, emotional balance, and inner clarity. Even a few minutes of satsang daily can reduce stress and bring hope, patience, and confidence.",
      hi: "आस्थावाणी पर दैनिक सत्संग दैनिक जीवन के लिए वास्तविक आध्यात्मिक मार्गदर्शन प्राप्त करने का एक शांतिपूर्ण और सार्थक तरीका है। ये सत्संग वृंदावन की पवित्र भूमि से साझा किए जाते हैं, जहां भक्ति और सनातन ज्ञान स्वाभाविक रूप से प्रवाहित होता है।"
    },
    keywords: "Daily satsang online, Vrindavan satsang, spiritual guidance India, Asthawaani satsang"
  },
  {
    id: "katha-pravachan",
    icon: BookOpen,
    title: { en: "Katha & Pravachan", hi: "कथा और प्रवचन" },
    subtitle: { en: "Ancient Wisdom in Simple Language", hi: "सरल भाषा में प्राचीन ज्ञान" },
    description: {
      en: "Katha and Pravachan on Asthawaani bring Sanatan Dharma teachings in easy, relatable language. Through Bhagwat Katha, Ram Katha, Shiv Katha, and spiritual pravachan, listeners learn deep life lessons through stories and examples. These kathas help people understand karma, dharma, relationships, patience, and devotion in a very natural way. Asthawaani presents katha not as lectures, but as heart-touching guidance that connects directly with daily life problems.",
      hi: "आस्थावाणी पर कथा और प्रवचन सनातन धर्म की शिक्षाओं को सरल, संबंधित भाषा में लाते हैं। भागवत कथा, राम कथा, शिव कथा और आध्यात्मिक प्रवचन के माध्यम से श्रोता कहानियों और उदाहरणों के माध्यम से गहरे जीवन के पाठ सीखते हैं।"
    },
    keywords: "Bhagwat katha online, pravachan India, spiritual stories, Asthawaani katha"
  },
  {
    id: "bhajan-kirtan",
    icon: Music,
    title: { en: "Bhajan & Kirtan", hi: "भजन और कीर्तन" },
    subtitle: { en: "Devotional Music for Peace and Positivity", hi: "शांति और सकारात्मकता के लिए भक्ति संगीत" },
    description: {
      en: "Bhajan and Kirtan on Asthawaani offer pure devotional music that calms the mind and fills the heart with bhakti. These bhajans include Krishna bhajan, Ram bhajan, naam kirtan, and soulful chanting rooted in Vrindavan and Braj traditions. Listening to bhajan and kirtan helps reduce stress, slow down thoughts, and create a positive environment at home. Asthawaani focuses on meaningful lyrics and soft spiritual energy, not loud or distracting music.",
      hi: "आस्थावाणी पर भजन और कीर्तन शुद्ध भक्ति संगीत प्रदान करते हैं जो मन को शांत करते हैं और हृदय को भक्ति से भर देते हैं। इन भजनों में कृष्ण भजन, राम भजन, नाम कीर्तन और वृंदावन और ब्रज परंपराओं में निहित आत्मीय जप शामिल हैं।"
    },
    keywords: "Bhajan kirtan online, devotional music India, Krishna bhajan, Asthawaani bhakti"
  },
  {
    id: "jaap-mantra",
    icon: Sparkles,
    title: { en: "Jaap & Mantra", hi: "जाप और मंत्र" },
    subtitle: { en: "Calm the Mind, Strengthen Inner Faith", hi: "मन को शांत करें, आंतरिक विश्वास को मजबूत करें" },
    description: {
      en: "Jaap and Mantra on Asthawaani are designed to support mental calmness and spiritual strength. Through Naam Jaap, Mantra Jaap, and guided chanting, listeners experience focus, positivity, and inner stability. Regular jaap helps reduce overthinking, fear, and restlessness. It slowly trains the mind to stay peaceful and disciplined. Asthawaani presents mantras in a simple, beginner-friendly way, so anyone can follow without pressure or fear.",
      hi: "आस्थावाणी पर जाप और मंत्र मानसिक शांति और आध्यात्मिक शक्ति का समर्थन करने के लिए डिज़ाइन किए गए हैं। नाम जाप, मंत्र जाप और निर्देशित जप के माध्यम से श्रोता ध्यान, सकारात्मकता और आंतरिक स्थिरता का अनुभव करते हैं।"
    },
    keywords: "Mantra jaap online, naam jaap India, spiritual chanting, Asthawaani mantra"
  },
  {
    id: "navgrah-shanti",
    icon: Moon,
    title: { en: "Navgrah Shanti Path", hi: "नवग्रह शांति पाठ" },
    subtitle: { en: "Seek Balance and Inner Stability", hi: "संतुलन और आंतरिक स्थिरता की खोज" },
    description: {
      en: "Navgrah Shanti Path on Asthawaani focuses on faith, patience, and inner balance, based on Sanatan belief. This paath is presented in a calm and positive manner, without fear or superstition. The purpose of Navgrah Shanti Path is to help devotees stay mentally steady during challenging phases of life. Through prayer and devotion, listeners develop acceptance, hope, and trust in divine timing.",
      hi: "आस्थावाणी पर नवग्रह शांति पाठ सनातन विश्वास के आधार पर विश्वास, धैर्य और आंतरिक संतुलन पर केंद्रित है। यह पाठ शांत और सकारात्मक तरीके से प्रस्तुत किया जाता है, बिना भय या अंधविश्वास के।"
    },
    keywords: "Navgrah shanti path online, graha shanti paath, spiritual balance, Asthawaani shanti"
  },
  {
    id: "spiritual-healing",
    icon: Heart,
    title: { en: "Spiritual & Emotional Healing", hi: "आध्यात्मिक और भावनात्मक उपचार" },
    subtitle: { en: "Peace through Bhakti", hi: "भक्ति के माध्यम से शांति" },
    description: {
      en: "Healing on Asthawaani means inner and emotional healing through devotion, not medical treatment. Through satsang, bhajan, mantra, and katha, Asthawaani supports people dealing with stress, anxiety, fear, sadness, or confusion. Spiritual healing helps calm the mind, strengthen emotions, and build positive thinking. When the mind becomes peaceful, life also starts feeling lighter and more manageable.",
      hi: "आस्थावाणी पर उपचार का अर्थ है भक्ति के माध्यम से आंतरिक और भावनात्मक उपचार, चिकित्सा उपचार नहीं। सत्संग, भजन, मंत्र और कथा के माध्यम से आस्थावाणी तनाव, चिंता, भय, उदासी या भ्रम से जूझ रहे लोगों का समर्थन करता है।"
    },
    keywords: "Spiritual healing India, emotional peace through bhakti, inner healing, Asthawaani healing"
  },
  {
    id: "motivational-guidance",
    icon: Mic,
    title: { en: "Motivational & Life Guidance", hi: "प्रेरणादायक और जीवन मार्गदर्शन" },
    subtitle: { en: "Dharma-Based Positive Direction", hi: "धर्म-आधारित सकारात्मक दिशा" },
    description: {
      en: "Motivational and Life Guidance on Asthawaani is rooted in values, dharma, and real-life wisdom. This guidance helps people stay confident, patient, and focused during tough situations. Instead of loud motivation, Asthawaani offers shant, meaningful motivation through spiritual insight and practical examples. It helps listeners improve mindset, decision-making, and emotional strength.",
      hi: "आस्थावाणी पर प्रेरणादायक और जीवन मार्गदर्शन मूल्यों, धर्म और वास्तविक जीवन के ज्ञान में निहित है। यह मार्गदर्शन लोगों को कठिन परिस्थितियों में आत्मविश्वासी, धैर्यवान और केंद्रित रहने में मदद करता है।"
    },
    keywords: "Spiritual motivation India, life guidance online, positive thinking satsang, Asthawaani motivation"
  },
  {
    id: "morning-aarti",
    icon: Sun,
    title: { en: "Morning Aarti", hi: "प्रातः आरती" },
    subtitle: { en: "Start the Day with Blessings and Positivity", hi: "आशीर्वाद और सकारात्मकता के साथ दिन की शुरुआत" },
    description: {
      en: "Morning Aarti on Asthawaani allows devotees to begin their day with gratitude, discipline, and divine remembrance. Just like temple aarti, it brings peace, focus, and positive energy into daily routine. Starting the day with aarti helps remove negativity, improve concentration, and create a calm mindset for the day ahead. Asthawaani brings the feeling of Vrindavan temple aarti directly to your home.",
      hi: "आस्थावाणी पर प्रातः आरती भक्तों को कृतज्ञता, अनुशासन और दिव्य स्मरण के साथ अपना दिन शुरू करने की अनुमति देती है। मंदिर की आरती की तरह, यह दैनिक दिनचर्या में शांति, ध्यान और सकारात्मक ऊर्जा लाती है।"
    },
    keywords: "Morning aarti online, daily aarti Vrindavan, spiritual routine, Asthawaani prayer"
  },
  {
    id: "community",
    icon: Users,
    title: { en: "Community", hi: "समुदाय" },
    subtitle: { en: "Grow Together on the Spiritual Path", hi: "आध्यात्मिक पथ पर साथ मिलकर बढ़ें" },
    description: {
      en: "Asthawaani Community is a spiritual family where seekers come together to share faith, devotion, and positivity. Being part of a community helps people stay motivated and supported on their spiritual journey. Through live satsangs, discussions, events, and shared experiences, Asthawaani builds a sense of belonging and togetherness. Walking the bhakti path together creates strength, inspiration, and joy.",
      hi: "आस्थावाणी समुदाय एक आध्यात्मिक परिवार है जहां साधक विश्वास, भक्ति और सकारात्मकता साझा करने के लिए एक साथ आते हैं। समुदाय का हिस्सा होने से लोगों को अपनी आध्यात्मिक यात्रा में प्रेरित और समर्थित रहने में मदद मिलती है।"
    },
    keywords: "Spiritual community online, bhakti community India, Asthawaani devotees, satsang group"
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  },
};

export default function Offerings() {
  const { language } = useLanguage();

  const pageTitle = language === 'en' 
    ? "Daily Offerings - Spiritual Services | Asthawaani" 
    : "दैनिक प्रसाद - आध्यात्मिक सेवाएं | आस्थावाणी";
  
  const pageDescription = language === 'en'
    ? "Explore Asthawaani's spiritual offerings including Daily Satsang, Katha Pravachan, Bhajan Kirtan, Mantra Jaap, Morning Aarti, and Community services from Vrindavan."
    : "वृंदावन से आस्थावाणी की आध्यात्मिक सेवाओं का अन्वेषण करें - दैनिक सत्संग, कथा प्रवचन, भजन कीर्तन, मंत्र जाप, प्रातः आरती और समुदाय सेवाएं।";

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content="Daily satsang online, Vrindavan satsang, Bhajan kirtan, Krishna bhajan, spiritual guidance India, Asthawaani, mantra jaap, morning aarti, spiritual community" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />

      <div className="flex flex-col w-full">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bhajanKirtan})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
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
              <HandHeart className="w-5 h-5 text-amber-400" />
              <span className="text-sm font-medium text-amber-200">
                {language === 'en' ? 'Spiritual Offerings' : 'आध्यात्मिक प्रसाद'}
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-amber-200" data-testid="offerings-page-title">
              {language === 'en' ? 'Daily Offerings' : 'दैनिक प्रसाद'}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              {language === 'en' 
                ? 'Experience the divine through our sacred spiritual services from Vrindavan'
                : 'वृंदावन से हमारी पवित्र आध्यात्मिक सेवाओं के माध्यम से दिव्यता का अनुभव करें'}
            </p>
          </motion.div>
        </section>

        {/* Offerings Grid */}
        <section className="py-24 bg-gradient-to-b from-stone-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {offeringsData.map((offering, index) => (
                <motion.div
                  key={offering.id}
                  variants={fadeUpItem}
                  className="group"
                >
                  <Card className="h-full bg-white hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden" data-testid={`offering-card-${offering.id}`}>
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center group-hover:from-amber-200 group-hover:to-amber-100 transition-colors duration-300">
                          <offering.icon className="w-8 h-8 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-serif font-bold text-stone-800 mb-1 group-hover:text-amber-700 transition-colors">
                            {offering.title[language]}
                          </h3>
                          <p className="text-sm text-amber-600 font-medium">
                            {offering.subtitle[language]}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-stone-600 leading-relaxed mb-6">
                        {offering.description[language]}
                      </p>
                      
                      <div className="flex items-center gap-2 text-amber-600 group-hover:text-amber-700 transition-colors cursor-pointer">
                        <span className="text-sm font-semibold">
                          {language === 'en' ? 'Learn More' : 'और जानें'}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                {language === 'en' 
                  ? 'Join Our Spiritual Community' 
                  : 'हमारे आध्यात्मिक समुदाय से जुड़ें'}
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
                {language === 'en'
                  ? 'Connect with thousands of seekers on the path of bhakti and inner peace.'
                  : 'भक्ति और आंतरिक शांति के मार्ग पर हजारों साधकों से जुड़ें।'}
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
