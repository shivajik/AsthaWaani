import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context";
import { assets } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Play, Filter, Youtube, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = [
  { id: 'all', en: 'All', hi: 'सभी' },
  { id: 'satsang', en: 'Satsang', hi: 'सत्संग' },
  { id: 'pravachan', en: 'Pravachan', hi: 'प्रवचन' },
  { id: 'katha', en: 'Katha', hi: 'कथा' },
  { id: 'bhajan', en: 'Bhajan', hi: 'भजन' },
  { id: 'mantra', en: 'Mantra', hi: 'मंत्र' },
  { id: 'festivals', en: 'Festivals', hi: 'त्योहार' },
];

const videos = [
  { id: 1, category: 'satsang', title: { en: "Morning Satsang from Vrindavan", hi: "वृंदावन से प्रातः सत्संग" }, duration: "45:20", views: "1.2K", time: "2 days ago", thumb: assets.guru },
  { id: 2, category: 'bhajan', title: { en: "Divine Yamuna Aarti", hi: "दिव्य यमुना आरती" }, duration: "12:15", views: "3.5K", time: "5 days ago", thumb: assets.bhajan },
  { id: 3, category: 'pravachan', title: { en: "Wisdom of Geeta", hi: "गीता का ज्ञान" }, duration: "28:40", views: "856", time: "1 week ago", thumb: assets.meditation },
  { id: 4, category: 'katha', title: { en: "Krishna Leela Part 1", hi: "कृष्ण लीला भाग १" }, duration: "1:15:00", views: "5.4K", time: "2 weeks ago", thumb: assets.hero },
  { id: 5, category: 'mantra', title: { en: "Om Namah Shivaya Chanting", hi: "ओम नमः शिवाय जाप" }, duration: "1:00:00", views: "12K", time: "1 month ago", thumb: assets.meditation },
  { id: 6, category: 'festivals', title: { en: "Holi in Braj", hi: "ब्रज की होली" }, duration: "15:30", views: "2.1K", time: "1 month ago", thumb: assets.bhajan },
];

export default function Gallery() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredVideos = activeCategory === 'all' 
    ? videos 
    : videos.filter(v => v.category === activeCategory);

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-secondary py-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl">
              <Youtube className="w-8 h-8 fill-current" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold">{t('gallery.title')}</h1>
            <p className="text-white/80 max-w-xl mx-auto">
              {language === 'en' 
                ? "Watch our latest spiritual discourses and bhajans directly from our YouTube channel."
                : "हमारे YouTube चैनल से सीधे नवीनतम आध्यात्मिक प्रवचन और भजन देखें।"
              }
            </p>
            <Button 
              className="mt-4 bg-white text-red-600 hover:bg-stone-100 font-bold gap-2"
              onClick={() => window.open('https://www.youtube.com/@Asthawaani', '_blank')}
            >
              <Youtube className="w-4 h-4" />
              {language === 'en' ? "Subscribe to Channel" : "चैनल सब्सक्राइब करें"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-full border-primary/20",
                activeCategory === cat.id ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-primary/10 hover:text-primary"
              )}
            >
              {cat[language]}
            </Button>
          ))}
        </div>

        {/* Video Grid */}
        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredVideos.map((video) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={video.id}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 cursor-pointer"
            >
              <div className="relative aspect-video bg-black overflow-hidden">
                <img 
                  src={video.thumb} 
                  alt={video.title[language]} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-opacity duration-300 transform group-hover:scale-105" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform backdrop-blur-sm">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-mono">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-secondary line-clamp-2 font-serif group-hover:text-primary transition-colors mb-2">
                  {video.title[language]}
                </h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{video.views} views</span>
                  <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                  <span>{video.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p>No videos found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
