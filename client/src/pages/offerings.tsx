import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context";
import { Card, CardContent } from "@/components/ui/card";
import { useCmsPage } from "@/lib/useCmsPage";
import * as Icons from "lucide-react";
import { useEffect, useState } from "react";
import bhajanKirtan from "@assets/generated_images/devotional_bhajan_kirtan.png";
import { useQuery } from "@tanstack/react-query";
import type { Offering } from "@shared/schema";

// DEBUG: Add console log to track data loading
const enableDebug = false;

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
  const { data: pageData } = useCmsPage("offerings");
  const [hasError, setHasError] = useState(false);

  const { data: offerings = [], isLoading, error } = useQuery<Offering[]>({
    queryKey: ["/api/offerings"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/offerings");
        if (!res.ok) {
          console.error("API response not ok:", res.status);
          return [];
        }
        const data = await res.json();
        if (enableDebug) console.log("Offerings fetched:", data);
        return data;
      } catch (err) {
        console.error("Error fetching offerings:", err);
        setHasError(true);
        return [];
      }
    },
    staleTime: 0,
    gcTime: 0,
    retry: 3,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (enableDebug) console.log("Offerings data:", offerings, "Loading:", isLoading, "Error:", error);
  }, [offerings, isLoading, error]);

  const pageTitle = language === 'en' 
    ? "Daily Offerings - Spiritual Services | Asthawaani" 
    : "दैनिक प्रसाद - आध्यात्मिक सेवाएं | आस्थावाणी";
  
  const pageDescription = language === 'en'
    ? "Explore Asthawaani's spiritual offerings including Daily Satsang, Katha Pravachan, Bhajan Kirtan, Mantra Jaap, Morning Aarti, and Community services from Vrindavan."
    : "वृंदावन से आस्थावाणी की आध्यात्मिक सेवाओं का अन्वेषण करें - दैनिक सत्संग, कथा प्रवचन, भजन कीर्तन, मंत्र जाप, प्रातः आरती और समुदाय सेवाएं।";

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      Video: Icons.Video,
      Music: Icons.Music,
      Sun: Icons.Sun,
      Users: Icons.Users,
      BookOpen: Icons.BookOpen,
      Heart: Icons.Heart,
      Sparkles: Icons.Sparkles,
      Mic: Icons.Mic,
      Moon: Icons.Moon,
      HandHeart: Icons.HandHeart,
    };
    return iconMap[iconName] || Icons.Heart;
  };

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
              <Icons.HandHeart className="w-5 h-5 text-amber-400" />
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
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {offerings.length > 0 ? offerings.map((offering) => {
                const IconComponent = getIcon(offering.icon);
                return (
                  <motion.div
                    key={offering.id}
                    variants={fadeUpItem}
                    className="group"
                  >
                    <Card className="h-full bg-white hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden" data-testid={`offering-card-${offering.slug}`}>
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center group-hover:from-amber-200 group-hover:to-amber-100 transition-colors duration-300">
                            <IconComponent className="w-8 h-8 text-amber-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-serif font-bold text-stone-800 mb-1 group-hover:text-amber-700 transition-colors">
                              {language === 'en' ? offering.title : offering.titleHi || offering.title}
                            </h3>
                            <p className="text-sm text-amber-600 font-medium">
                              {language === 'en' ? offering.subtitle : offering.subtitleHi || offering.subtitle}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-stone-600 leading-relaxed">
                          {language === 'en' ? offering.description : offering.descriptionHi || offering.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
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
