import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/context";
import { assets, offerings, locations } from "@/lib/data";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Play, MapPin, Youtube } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

import mandalaPattern from "@assets/Asthawaani-–-ornamental_mandala_design_patterns_1765890463103.png";

interface Video {
  id: string;
  videoId: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function Home() {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { data: videos } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
    queryFn: async () => {
      const response = await fetch("/api/videos");
      if (!response.ok) return [];
      return response.json();
    },
  });

  const displayVideos = videos?.slice(0, 3) || [];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden" style={{ position: 'relative' }}>
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{ 
            backgroundImage: `url(${assets.hero})`,
            y: heroY,
          }}
        >
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
        </motion.div>
        
        <motion.div 
          className="relative z-10 container mx-auto px-4 text-center text-white"
          style={{ opacity: heroOpacity }}
        >
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-6"
          >
            <motion.h1 
              variants={fadeUpItem}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white drop-shadow-lg"
            >
              Asthawaani
            </motion.h1>
            <motion.p 
              variants={fadeUpItem}
              className="text-xl md:text-2xl font-light max-w-2xl text-white/90 drop-shadow-md leading-relaxed"
            >
              {t('hero.mission')}
            </motion.p>
            <motion.div variants={fadeUpItem} className="mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/20"
                  data-testid="button-hero-cta"
                >
                  {t('hero.cta')}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 w-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1 h-2 bg-white rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-background relative overflow-hidden">
        <img 
          src={mandalaPattern} 
          alt="" 
          className="absolute -left-32 -top-32 w-[280px] h-auto md:w-[400px] opacity-25 pointer-events-none"
        />
        <img 
          src={mandalaPattern} 
          alt="" 
          className="absolute -right-32 -top-32 w-[280px] h-auto md:w-[400px] opacity-25 pointer-events-none scale-x-[-1]"
        />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring" as const }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <motion.img 
                src={assets.guru} 
                alt="Guru Speaking" 
                className="w-full h-auto object-cover aspect-[4/3]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {t('about.title')}
              </motion.h2>
              <motion.p 
                className="text-xl text-primary font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                {t('about.subtitle')}
              </motion.p>
              <motion.p 
                className="text-muted-foreground text-lg leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {language === 'en' 
                  ? "Asthawaani opens a doorway for gifted spiritual voices. It connects these divine voices with seekers across India and the world — so that no true teacher remains unheard, and no true seeker remains unguided."
                  : "आस्थावाणी उन सभी दैवीय वाणियों को भारत और विश्व के भक्तों से जोड़ता है — ताकि कोई सच्चा गुरु अनसुना न रहे, और कोई सच्चा भक्त बिना मार्गदर्शन न रहे।"
                }
              </motion.p>
              <motion.div
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/about" className={cn(buttonVariants({ variant: "outline" }), "border-secondary text-secondary hover:bg-secondary hover:text-white font-serif group")}>
                  {language === 'en' ? 'Read Our Story' : 'हमारी कहानी पढ़ें'}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <img 
          src={mandalaPattern} 
          alt="" 
          className="absolute -left-40 top-1/2 -translate-y-1/2 w-[280px] h-auto md:w-[400px] opacity-15 pointer-events-none"
          style={{ filter: 'brightness(1.5) invert(1)' }}
        />
        <img 
          src={mandalaPattern} 
          alt="" 
          className="absolute -right-40 top-1/2 -translate-y-1/2 w-[280px] h-auto md:w-[400px] opacity-15 pointer-events-none scale-x-[-1]"
          style={{ filter: 'brightness(1.5) invert(1)' }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-white mb-4">{t('offerings.title')}</h2>
            <motion.div 
              className="w-24 h-1 bg-primary mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </motion.div>
          
          <motion.div 
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {offerings.map((item, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-300 h-full group">
                  <CardContent className="p-8 flex flex-col items-center text-center h-full">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 text-primary"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title[language]}</h3>
                    <p className="text-white/70">{item.desc[language]}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 bg-background relative overflow-hidden">
        <img 
          src={mandalaPattern} 
          alt="" 
          className="absolute -left-32 -bottom-32 w-[280px] h-auto md:w-[400px] opacity-25 pointer-events-none rotate-180"
        />
        <img 
          src={mandalaPattern} 
          alt="" 
          className="absolute -right-32 -bottom-32 w-[280px] h-auto md:w-[400px] opacity-25 pointer-events-none rotate-180 scale-x-[-1]"
        />
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif font-bold text-secondary mb-4">{t('locations.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'en' 
                ? "Our spiritual presence spans across the sacred Braj Bhoomi."
                : "हमारी आध्यात्मिक उपस्थिति पवित्र ब्रज भूमि में फैली हुई है।"
              }
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-5 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {locations.map((loc, i) => (
              <motion.div 
                key={i} 
                variants={fadeUpItem}
                className="group relative overflow-hidden rounded-xl aspect-[3/4] bg-muted cursor-pointer"
                whileHover={{ scale: 1.03 }}
              >
                <motion.img 
                  src={i % 2 === 0 ? assets.hero : assets.meditation} 
                  alt={loc}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <motion.div 
                    className="text-white"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Ashram</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold">{loc}</h3>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* YouTube Gallery */}
      <section className="py-24 bg-stone-100">
        <div className="container mx-auto px-4">
          <motion.div 
            className="flex justify-between items-end mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-4xl font-serif font-bold text-secondary mb-2">{t('gallery.title')}</h2>
              <p className="text-muted-foreground">
                {language === 'en' ? 'Watch our latest Satsangs' : 'हमारे नवीनतम सत्संग देखें'}
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/videos" className={cn(buttonVariants({ variant: "outline" }), "hidden md:flex")}>
                {language === 'en' ? 'View All Videos' : 'सभी वीडियो देखें'}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {displayVideos.length > 0 ? (
              displayVideos.map((video, i) => (
                <motion.div 
                  key={video.id}
                  variants={fadeUpItem}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                  whileHover={{ y: -5 }}
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
                  data-testid={`card-home-video-${video.id}`}
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <motion.img 
                      src={video.thumbnailUrl} 
                      alt={video.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        animate={{ 
                          boxShadow: ["0 0 0 0 rgba(220, 38, 38, 0.4)", "0 0 0 15px rgba(220, 38, 38, 0)", "0 0 0 0 rgba(220, 38, 38, 0)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Play className="w-8 h-8 fill-current" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-secondary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </motion.div>
              ))
            ) : (
              [1, 2, 3].map((_, i) => (
                <motion.div 
                  key={i}
                  variants={fadeUpItem}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img src={assets.bhajan} alt="Video thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Play className="w-8 h-8 fill-current" />
                      </motion.div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      12:45
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded-full">Satsang</span>
                    </div>
                    <h3 className="font-bold text-lg text-secondary mb-2 line-clamp-2">
                      {language === 'en' ? `Divine Wisdom from Vrindavan - Episode ${i + 1}` : `वृंदावन से दिव्य ज्ञान - भाग ${i + 1}`}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {language === 'en' 
                        ? 'Join us for a spiritual journey into the heart of devotion.'
                        : 'भक्ति के हृदय में आध्यात्मिक यात्रा के लिए हमसे जुड़ें।'
                      }
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>

          <motion.div 
            className="mt-12 text-center md:hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/videos" className={cn(buttonVariants({ variant: "outline" }))}>
              {language === 'en' ? 'View All Videos' : 'सभी वीडियो देखें'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 text-center relative overflow-hidden -mt-px">
        <img 
          src={mandalaPattern} 
          alt="" 
          className="absolute -left-40 top-1/2 -translate-y-1/2 w-[300px] h-auto md:w-[400px] lg:w-[500px] opacity-40 pointer-events-none"
        />
        <img 
          src={mandalaPattern} 
          alt="" 
          className="absolute -right-40 top-1/2 -translate-y-1/2 w-[300px] h-auto md:w-[400px] lg:w-[500px] opacity-40 pointer-events-none scale-x-[-1]"
        />
        
        <motion.div 
          className="container mx-auto relative z-10 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-serif font-bold mb-8 text-primary"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {language === 'en' ? "Ready to begin your journey?" : "क्या आप अपनी यात्रा शुरू करने के लिए तैयार हैं?"}
          </motion.h2>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUpItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a 
                href="https://www.youtube.com/@Asthawaani" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-colors shadow-lg"
              >
                <Youtube className="w-5 h-5" />
                {language === 'en' ? "Subscribe on YouTube" : "YouTube पर सब्सक्राइब करें"}
              </a>
            </motion.div>
            <motion.div variants={fadeUpItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 shadow-md">
                  {language === 'en' ? "Contact Us" : "संपर्क करें"}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
