import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context";
import { Megaphone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface NewsTickerItem {
  id: string;
  titleEn: string;
  titleHi: string;
  order: number;
  isActive: boolean;
}

export function NewsTicker() {
  const { language } = useLanguage();
  
  const { data: tickers = [] } = useQuery<NewsTickerItem[]>({
    queryKey: ["/api/news-tickers"],
    queryFn: async () => {
      const res = await fetch("/api/news-tickers");
      if (!res.ok) return [];
      return res.json();
    },
  });
  
  const newsItems = tickers.map(item => language === 'en' ? item.titleEn : item.titleHi);
  const allNews = newsItems.length > 0 ? [...newsItems, ...newsItems] : ["Welcome to Asthwaani - Connecting Divine Voices"];

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
