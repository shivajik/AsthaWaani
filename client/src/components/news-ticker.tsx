import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context";
import { Megaphone } from "lucide-react";

interface NewsItem {
  id: string;
  en: string;
  hi: string;
}

const sampleNews: NewsItem[] = [
  {
    id: "1",
    en: "Join our weekly satsang sessions every Thursday at 6 PM. Spiritual wisdom and devotional music await you.",
    hi: "हर गुरुवार को 6 PM पर हमारे साप्ताहिक सत्संग सत्र में शामिल होें। आध्यात्मिक ज्ञान और भक्ति संगीत आपका इंतजार कर रहा है।"
  },
  {
    id: "2",
    en: "New video series: 'Bhagavad Gita Teachings' now available on our YouTube channel. Subscribe to stay updated.",
    hi: "नई वीडियो श्रृंखला: 'भगवद गीता की शिक्षाएं' अब हमारे YouTube चैनल पर उपलब्ध है। अपडेट रहने के लिए सब्सक्राइब करें।"
  },
  {
    id: "3",
    en: "Upcoming workshop: 'Meditation for Inner Peace' - Register now for limited seats. Transform your spiritual journey.",
    hi: "आने वाला कार्यशाला: 'आंतरिक शांति के लिए ध्यान' - सीमित सीटों के लिए अभी पंजीकरण करें। अपनी आध्यात्मिक यात्रा को बदलें।"
  },
  {
    id: "4",
    en: "Exclusive podcast series featuring renowned spiritual leaders discussing ancient wisdom for modern times.",
    hi: "प्रसिद्ध आध्यात्मिक नेताओं की विशेष पॉडकास्ट श्रृंखला जो आधुनिक समय के लिए प्राचीन ज्ञान पर चर्चा करती है।"
  }
];

export function NewsTicker() {
  const { language } = useLanguage();
  
  const newsItems = sampleNews.map(item => language === 'en' ? item.en : item.hi);
  const allNews = [...newsItems, ...newsItems]; // Duplicate for seamless loop

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-4 overflow-hidden border-y border-blue-500/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-6 h-16">
          {/* Left Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-lg"
          >
            <Megaphone className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <span className="font-bold text-blue-600 whitespace-nowrap">
              {language === 'en' ? 'Latest News' : 'नवीनतम समाचार'}
            </span>
          </motion.div>

          {/* Scrolling News */}
          <div className="flex-1 overflow-hidden relative h-full flex items-center">
            <motion.div
              className="flex gap-16 whitespace-nowrap"
              animate={{ x: [0, -1000] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {allNews.map((news, index) => (
                <span
                  key={index}
                  className="text-white font-medium text-sm md:text-base tracking-wide"
                >
                  • {news}
                </span>
              ))}
            </motion.div>

            {/* Fade gradient on right */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-blue-700 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
