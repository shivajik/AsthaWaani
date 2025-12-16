import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context";
import { assets, offerings, values, locations } from "@/lib/data";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Play, MapPin } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Home() {
  const { t, language } = useLanguage();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105 motion-safe:animate-ken-burns"
          style={{ backgroundImage: `url(${assets.hero})` }}
        >
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/50 via-transparent to-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white drop-shadow-lg">
              Asthawaani
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl text-white/90 drop-shadow-md leading-relaxed">
              {t('hero.mission')}
            </p>
            <div className="mt-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-serif text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105">
                {t('hero.cta')}
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              {...fadeIn}
              className="relative rounded-2xl overflow-hidden shadow-2xl rotate-1"
            >
              <img src={assets.guru} alt="Guru Speaking" className="w-full h-auto object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-6">
                {t('about.title')}
              </h2>
              <p className="text-xl text-primary font-medium mb-6">
                {t('about.subtitle')}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {language === 'en' 
                  ? "Asthawaani opens a doorway for gifted spiritual voices. It connects these divine voices with seekers across India and the world — so that no true teacher remains unheard, and no true seeker remains unguided."
                  : "आस्थावाणी उन सभी दैवीय वाणियों को भारत और विश्व के भक्तों से जोड़ता है — ताकि कोई सच्चा गुरु अनसुना न रहे, और कोई सच्चा भक्त बिना मार्गदर्शन न रहे।"
                }
              </p>
              <Link href="/about" className={cn(buttonVariants({ variant: "outline" }), "border-secondary text-secondary hover:bg-secondary hover:text-white font-serif group")}>
                  {language === 'en' ? 'Read Our Story' : 'हमारी कहानी पढ़ें'}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-24 bg-secondary text-secondary-foreground relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-white mb-4">{t('offerings.title')}</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerings.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors duration-300 h-full">
                  <CardContent className="p-8 flex flex-col items-center text-center h-full">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 text-primary">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title[language]}</h3>
                    <p className="text-white/70">{item.desc[language]}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-secondary mb-4">{t('locations.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'en' 
                ? "Our spiritual presence spans across the sacred Braj Bhoomi."
                : "हमारी आध्यात्मिक उपस्थिति पवित्र ब्रज भूमि में फैली हुई है।"
              }
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {locations.map((loc, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl aspect-[3/4] bg-muted">
                 {/* Placeholder for location images - repeating the generated ones for now with tint */}
                 <img 
                  src={i % 2 === 0 ? assets.hero : assets.meditation} 
                  alt={loc}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                      <MapPin className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">Ashram</span>
                    </div>
                    <h3 className="text-2xl font-serif font-bold">{loc}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Gallery Mockup */}
      <section className="py-24 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold text-secondary mb-2">{t('gallery.title')}</h2>
              <p className="text-muted-foreground">Watch our latest Satsangs</p>
            </div>
            <Button variant="outline" className="hidden md:flex">View YouTube Channel</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-video bg-black">
                  <img src={assets.bhajan} alt="Video thumbnail" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 fill-current" />
                    </div>
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
                    Divine Wisdom from Vrindavan - Episode {i + 1}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    Join us for a spiritual journey into the heart of devotion.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10" />
        <div className="container relative z-10 px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
            {language === 'en' ? "Ready to begin your journey?" : "क्या आप अपनी यात्रा शुरू करने के लिए तैयार हैं?"}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button size="lg" className="bg-primary hover:bg-primary/90 text-secondary font-bold px-8">
                {language === 'en' ? "Subscribe on YouTube" : "YouTube पर सब्सक्राइब करें"}
             </Button>
             <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                {language === 'en' ? "Contact Us" : "संपर्क करें"}
             </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
