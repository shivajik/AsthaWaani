import { Link, useLocation } from "wouter";
import { useLanguage } from "@/lib/context";
import { Menu, X, Globe, Phone, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// Using the provided logo files
import logoHorizontal from "@assets/Asthawani-logo-h_1765886539362.png";
import logoSquare from "@assets/Asthawani-logo_1765886539362.png";
import logoHorizontalWhite from "@assets/Asthawani-logo-h-w_1765886987919.png";
import logoSquareWhite from "@assets/Asthawani-logo-w_1765886987919.png";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const navLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/about", label: t('nav.about') },
    { href: "/offerings", label: language === 'en' ? 'Offerings' : 'प्रसाद' },
    { href: "/brajbhoomi", label: language === 'en' ? 'Brajbhoomi' : 'ब्रजभूमि' },
    // { href: "/blog", label: language === 'en' ? 'Blog' : 'ब्लॉग' },
    { href: "/videos", label: t('nav.videos') || "Videos" },
    // { href: "/gallery", label: t('nav.gallery') },
    { href: "/contact", label: t('nav.contact') },
  ];

  // Determine header style
  const isTransparent = isHome && !isScrolled;
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent py-6 text-white"
          : "bg-white/95 backdrop-blur-md shadow-sm py-4 text-foreground"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {/* 
             Logic for Logo Visibility:
             1. When Transparent (Dark BG): Use Horizontal White Logo
             2. When Scrolled (White BG): Use Horizontal Dark Logo
          */}
          {isTransparent ? (
            <img 
              src={logoHorizontalWhite} 
              alt="Asthawaani Logo" 
              className="h-16 w-auto object-contain drop-shadow-lg transition-transform group-hover:scale-105" 
            />
          ) : (
            <img 
              src={logoHorizontal} 
              alt="Asthawaani Logo" 
              className="h-16 w-auto object-contain transition-transform group-hover:scale-105" 
            />
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "text-base font-medium transition-colors hover:text-secondary",
                location === link.href 
                  ? "text-secondary font-bold" 
                  : (isTransparent ? "text-white/90 hover:text-white" : "text-foreground/80")
              )}
            >
                {link.label}
            </Link>
          ))}
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleLanguage}
            className={cn(
              "gap-2 text-base", 
              isTransparent 
                ? "text-white hover:text-white hover:bg-white/20" 
                : "text-foreground hover:text-primary hover:bg-primary/10"
            )}
          >
            <Globe className="h-5 w-5" />
            {language === 'en' ? 'HI' : 'EN'}
          </Button>

          <Link href="/contact">
            <Button 
              size="lg"
              className={cn("bg-secondary text-secondary-foreground hover:bg-secondary/90 font-serif font-bold px-6")}
            >
              {t('nav.join')}
            </Button>
          </Link>
        </nav>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "md:hidden h-10 w-10", 
                isTransparent 
                  ? "text-white hover:bg-white/20" 
                  : "text-foreground hover:bg-foreground/10"
              )}
            >
              <Menu className="h-8 w-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l-primary/20">
            <div className="flex flex-col gap-8 mt-8">
              <Link href="/" className="flex items-center gap-2">
                <img src={logoHorizontal} alt="Asthawaani" className="h-14 w-auto" />
              </Link>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="text-xl font-medium hover:text-primary transition-colors"
                  >
                      {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center gap-4 mt-4">
                <Button variant="outline" onClick={toggleLanguage} className="w-full text-lg py-6">
                  <Globe className="mr-2 h-5 w-5" />
                  {language === 'en' ? 'Hindi' : 'English'}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function Footer() {
  const { t } = useLanguage();
  const locations = [
    { label: 'Mathura', id: 'mathura', hi: 'मथुरा' },
    { label: 'Vrindavan', id: 'vrindavan', hi: 'वृंदावन' },
    { label: 'Gokul', id: 'gokul', hi: 'गोकुल' },
    { label: 'Govardhan', id: 'govardhan', hi: 'गोवर्धन' },
    { label: 'Mahavan', id: 'mahavan', hi: 'महावन' },
  ];
  
  return (
    <footer className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="flex flex-col items-start">
            <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-white/20 transition-colors">
              <img 
                src={logoSquareWhite} 
                alt="Asthawaani" 
                className="h-48 w-auto rounded-xl" 
              />
            </div>
            <p className="opacity-90 max-w-sm mb-8 leading-relaxed text-lg">
              {t('hero.mission')}
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1ACBKJFoW9/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors" aria-label="Facebook" data-testid="link-facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="https://www.instagram.com/Asthawaani" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors" aria-label="Instagram" data-testid="link-instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772-1.153c-.636.247-1.363.416-2.427.465-1.067.047-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.067-.06-1.407-.06-4.123v-.066c0-2.292-.013-3.808-.06-4.813-.049-.99-.218-1.639-.465-2.127a2.902 2.902 0 00-1.153-1.153c-.488-.247-1.137-.416-2.127-.465-1.005-.047-2.52-.06-4.813v-.066c0-2.292-.013-3.808-.06-4.813-.049-.99-.218-1.639-.465-2.127a2.902 2.902 0 00-1.153-1.153c-.488-.247-1.137-.416-2.127-.465-1.005-.047-2.52-.06-4.813-.06h-.066z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-secondary">Contact</h4>
            <ul className="space-y-4 text-sm opacity-90">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-secondary" />
                <span>Ashirwad Palace, Swej Farm, Yamunapar, Laxminagar, Mathura, Uttar Pradesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <span>+91 76684 09246</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-secondary">Our Locations</h4>
            <ul className="space-y-3">
              {locations.map((location) => (
                <li key={location.id}>
                  <Link 
                    href={`/brajbhoomi?location=${location.id}`}
                    className="text-sm opacity-90 hover:opacity-100 hover:text-secondary transition-colors inline-flex items-center gap-2 group"
                    data-testid={`link-location-${location.id}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:scale-125 transition-transform" />
                    <span>{location.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-secondary">Map</h4>
            <div className="rounded-lg overflow-hidden border border-white/10 h-64 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3521.0!2d77.6998269!3d27.5071311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e9e9e9e9e9%3A0x0!2sAshirwad%20Palace%20Mathura!5e0!3m2!1sen!2sin!4v1640000000000"
                className="w-full h-full"
                style={{ border: 0, margin: 0, padding: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6 text-sm opacity-90">
            <Link 
              href="/terms-of-service"
              className="hover:text-secondary transition-colors"
              data-testid="link-terms-of-service"
            >
              {t('footer.terms') || 'Terms of Service'}
            </Link>
            <span className="hidden md:inline text-white/20">•</span>
            <Link 
              href="/privacy-policy"
              className="hover:text-secondary transition-colors"
              data-testid="link-privacy-policy"
            >
              {t('footer.privacy') || 'Privacy Policy'}
            </Link>
          </div>
          <p className="text-center text-sm opacity-60">&copy; {new Date().getFullYear()} Asthawaani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
