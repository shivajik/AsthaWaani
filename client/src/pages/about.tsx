import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context";
import { assets, aboutContent, values } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: `url(${assets.guru})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
            {t('nav.about')}
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-stone mx-auto text-center mb-16">
              <h2 className="text-3xl font-serif font-bold text-secondary mb-8">
                {t('about.subtitle')}
              </h2>
              {aboutContent[language].map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mt-16">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow border-t-4 border-t-primary">
                  <CardContent className="pt-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-xl text-secondary">{value.title[language]}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="py-24 bg-stone-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-stone-200">
              <h3 className="text-2xl font-serif font-bold text-secondary mb-4">Our Mission</h3>
              <p className="text-lg text-muted-foreground italic">
                “To take the light of wisdom to every home, and give every true voice the place it deserves.”
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-stone-200">
              <h3 className="text-2xl font-serif font-bold text-secondary mb-4">Our Vision</h3>
              <p className="text-lg text-muted-foreground italic">
                “India’s most trusted spiritual platform — modern in technology, ancient in soul.”
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
