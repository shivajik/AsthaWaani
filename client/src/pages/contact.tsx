import { useLanguage } from "@/lib/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import { useCmsPage } from "@/lib/useCmsPage";
import { useQuery } from "@tanstack/react-query";
import { type ContactInfo } from "@shared/schema";

export default function Contact() {
  const { language, t } = useLanguage();
  const { data: pageData } = useCmsPage("contact");
  const { data: contactData } = useQuery<ContactInfo | null>({
    queryKey: ["/api/cms/public/contact-info"],
    queryFn: async () => {
      const res = await fetch("/api/cms/public/contact-info");
      if (!res.ok) return null;
      return res.json();
    },
  });

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-secondary py-20 text-white text-center">
        <h1 className="text-5xl font-serif font-bold">{t('nav.contact')}</h1>
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-secondary mb-8">
              {pageData?.title || (language === 'en' ? "Get in Touch" : "संपर्क करें")}
            </h2>
            <p className="text-muted-foreground mb-12 text-lg">
              {pageData && pageData.content && (
                <div dangerouslySetInnerHTML={{ __html: language === 'hi' ? (pageData.contentHi || pageData.content) : pageData.content }} />
              )}
              {!pageData && (
                <>
                  {language === 'en' 
                    ? "Whether you are a seeker looking for guidance or a speaker wishing to join our platform, we are here for you."
                    : "चाहे आप मार्गदर्शन की तलाश में एक साधक हों या हमारे मंच से जुड़ने की इच्छा रखने वाले वक्ता, हम आपके लिए यहां हैं।"
                  }
                </>
              )}
            </p>
            
            <div className="space-y-8">
              {contactData && (
                <>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">
                        {language === 'hi' ? (contactData.nameHi || contactData.name) : contactData.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {language === 'hi' ? (contactData.addressHi || contactData.address) : contactData.address}<br/>
                        {contactData.city && <>{language === 'hi' ? (contactData.cityHi || contactData.city) : contactData.city}, </>}
                        {contactData.state} {contactData.postalCode}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">WhatsApp / Call</h3>
                      <p className="text-muted-foreground">{contactData.whatsapp || contactData.phone}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 shadow-sm">
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input placeholder="+91..." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="How can we help you?" className="min-h-[150px]" />
              </div>
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
