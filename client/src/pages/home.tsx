import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/context";
import { assets, offerings, locations } from "@/lib/data";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Play, MapPin, Youtube, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { cn, ensureProtocol } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import { useCmsPage } from "@/lib/useCmsPage";
import { NewsTicker } from "@/components/news-ticker";
import type { Ad } from "@shared/schema";

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

const floatingOrbs = [
  { size: 300, x: "10%", y: "20%", duration: 20, delay: 0, color: "rgba(212, 175, 55, 0.15)" },
  { size: 200, x: "80%", y: "60%", duration: 25, delay: 2, color: "rgba(139, 69, 19, 0.1)" },
  { size: 150, x: "60%", y: "10%", duration: 18, delay: 1, color: "rgba(212, 175, 55, 0.12)" },
  { size: 250, x: "20%", y: "70%", duration: 22, delay: 3, color: "rgba(255, 215, 0, 0.1)" },
  { size: 180, x: "90%", y: "30%", duration: 28, delay: 4, color: "rgba(184, 134, 11, 0.08)" },
];

const FloatingParticle = ({ delay, size }: { delay: number; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-br from-amber-200/30 to-amber-400/20"
    style={{
      width: size,
      height: size,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 6 + Math.random() * 4,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
  />
);

const GlowingOrb = ({ orb }: { orb: typeof floatingOrbs[0] }) => (
  <motion.div
    className="absolute rounded-full blur-3xl"
    style={{
      width: orb.size,
      height: orb.size,
      left: orb.x,
      top: orb.y,
      background: orb.color,
    }}
    animate={{
      x: [0, 50, -30, 0],
      y: [0, -40, 30, 0],
      scale: [1, 1.2, 0.9, 1],
    }}
    transition={{
      duration: orb.duration,
      repeat: Infinity,
      delay: orb.delay,
      ease: "easeInOut",
    }}
  />
);

const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99] as const,
    },
  }),
};

export default function Home() {
  const { t, language } = useLanguage();
  const { data: homeData } = useCmsPage("home");
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

  const { data: homeAds } = useQuery<Ad[]>({
    queryKey: ["/api/ads"],
    queryFn: async () => {
      const response = await fetch("/api/ads");
      if (!response.ok) return [];
      const allAds = await response.json();
      // Filter for active ads with home_page placement
      return allAds.filter((ad: Ad) => ad.isActive && ad.placement === "home_page");
    },
  });

  const displayVideos = videos?.slice(0, 3) || [];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section with Enhanced Animations */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden" style={{ position: 'relative' }}>
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-110"
          style={{ 
            backgroundImage: `url(${assets.hero})`,
            y: heroY,
          }}
          animate={{ scale: [1.1, 1.15, 1.1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </motion.div>
        
        {/* Floating Orbs Background */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
          {floatingOrbs.map((orb, i) => (
            <GlowingOrb key={i} orb={orb} />
          ))}
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.5} size={8 + Math.random() * 16} />
          ))}
        </div>
        
        {/* Radial Glow Effect */}
        <motion.div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)",
          }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        
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
            {/* Decorative Element Above Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              className="relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border border-amber-400/30 rounded-full absolute -top-12 left-1/2 -translate-x-1/2"
              />
              <Sparkles className="w-8 h-8 text-amber-400" />
            </motion.div>
            
            {/* Animated Title */}
            <motion.div className="relative">
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200 drop-shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
              >
                Asthawaani
              </motion.h1>
              
              {/* Glowing underline */}
              <motion.div
                className="h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "80%", opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </motion.div>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-xl md:text-2xl font-light max-w-2xl text-white/90 drop-shadow-md leading-relaxed"
            >
              {t('hero.mission')}
            </motion.p>
            
            {/* CTA Button with Glow Effect */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                {/* Button Glow */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-full opacity-50 blur-lg group-hover:opacity-75 transition-opacity"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    className="relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-white font-serif text-lg px-10 py-6 rounded-full shadow-2xl shadow-amber-500/30 border border-amber-400/30"
                    data-testid="button-hero-cta"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    {t('hero.cta')}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 w-full flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.span
            className="text-white/50 text-sm tracking-widest uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2 backdrop-blur-sm">
              <motion.div 
                className="w-1.5 h-3 bg-gradient-to-b from-amber-400 to-white rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* News Ticker */}
      <NewsTicker />

      {/* About Preview */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -50, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring" as const }}
              className="relative rounded-2xl overflow-hidden shadow-2xl sticky top-24"
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
              className="flex flex-col gap-6"
            >
              {/* Ad Placement Above Text */}
              {homeAds && homeAds.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="w-full mb-2"
                >
                  <a 
                    href={ensureProtocol(homeAds[0].link || undefined)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block relative rounded-lg overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <img 
                      src={homeAds[0].imageUrl} 
                      alt={language === 'hi' ? homeAds[0].titleHi || homeAds[0].titleEn : homeAds[0].titleEn}
                      className="w-full h-auto object-cover max-h-[200px] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-blue-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider z-10">
                      {language === 'hi' ? 'विज्ञापन' : 'Ad'}
                    </div>
                  </a>
                </motion.div>
              )}

              <div>
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-500/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-amber-500/5 rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-block text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {language === 'en' ? 'What We Offer' : 'हम क्या प्रदान करते हैं'}
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">{t('offerings.title')}</h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"
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
              <Link key={index} href="/offerings">
                <motion.div
                  variants={scaleIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group cursor-pointer h-full"
                >
                  <Card className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all duration-500 h-full overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-600/0 group-hover:from-amber-500/10 group-hover:to-amber-600/5 transition-all duration-500" />
                    
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <CardContent className="relative p-8 flex flex-col items-center text-center h-full">
                      <motion.div 
                        className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-6 border border-amber-500/20 group-hover:border-amber-500/40 transition-colors duration-300"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <item.icon className="w-9 h-9 text-amber-400" />
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors duration-300">{item.title[language]}</h3>
                      <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">{item.desc[language]}</p>
                      
                      {/* Learn more link */}
                      <motion.div 
                        className="mt-6 flex items-center gap-2 text-amber-400/70 group-hover:text-amber-400 transition-colors duration-300"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                      >
                        <span className="text-sm font-medium">{language === 'en' ? 'Learn more' : 'और जानें'}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 bg-background relative overflow-hidden">
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
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {locations.map((loc, i) => (
              <Link key={i} href={`/brajbhoomi?location=${loc.id}`}>
                <motion.div 
                  variants={fadeUpItem}
                  className="group relative overflow-hidden rounded-xl aspect-[3/4] bg-muted cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  data-testid={`location-card-${loc.id}`}
                >
                  <motion.img 
                    src={loc.image} 
                    alt={loc.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center p-4">
                    <motion.div 
                      className="text-white text-center w-full"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2 text-primary">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-wider">Ashram</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif font-bold line-clamp-2">{loc.name}</h3>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
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
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold h-12 px-8 rounded-lg transition-colors shadow-lg"
              >
                <Youtube className="w-5 h-5" />
                {language === 'en' ? "Subscribe on YouTube" : "YouTube पर सब्सक्राइब करें"}
              </a>
            </motion.div>
            <motion.div variants={fadeUpItem} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-12 px-8 border-primary/30 text-primary hover:bg-primary/10 shadow-md">
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
