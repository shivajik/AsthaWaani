import { Link, useLocation } from "wouter";
import { useLanguage } from "@/lib/context";
import { Menu, X, Globe, Phone, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@assets/generated_images/asthawaani_logo_saffron.png";

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
    { href: "/gallery", label: t('nav.gallery') },
    { href: "/contact", label: t('nav.contact') },
  ];

  // Determine header style based on page and scroll state
  const isTransparent = isHome && !isScrolled;
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isTransparent
          ? "bg-transparent py-4 text-white"
          : "bg-white/95 backdrop-blur-md shadow-sm py-2 text-secondary"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src={logo} alt="Asthawaani Logo" className="h-10 w-auto" />
          <span className={cn(
            "text-2xl font-serif font-bold tracking-tight hover:opacity-90 transition-opacity", 
            isTransparent ? "text-white" : "text-primary"
          )}>
            Asthawaani
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location === link.href 
                  ? "text-primary font-bold" 
                  : (isTransparent ? "text-white/90" : "text-secondary/80")
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
              "gap-2", 
              isTransparent 
                ? "text-white hover:text-white hover:bg-white/20" 
                : "text-secondary hover:text-primary hover:bg-primary/10"
            )}
          >
            <Globe className="h-4 w-4" />
            {language === 'en' ? 'HI' : 'EN'}
          </Button>

          <Button 
            className={cn("bg-primary text-primary-foreground hover:bg-primary/90 font-serif")}
          >
            {t('nav.join')}
          </Button>
        </nav>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "md:hidden", 
                isTransparent 
                  ? "text-white hover:bg-white/20" 
                  : "text-secondary hover:bg-secondary/10"
              )}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background/95 backdrop-blur-xl border-l-primary/20">
            <div className="flex flex-col gap-8 mt-8">
              <Link href="/" className="flex items-center gap-2">
                <img src={logo} alt="Asthawaani" className="h-12 w-auto" />
                <span className="text-3xl font-serif font-bold text-primary">Asthawaani</span>
              </Link>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                      {link.label}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center gap-4 mt-4">
                <Button variant="outline" onClick={toggleLanguage} className="w-full">
                  <Globe className="mr-2 h-4 w-4" />
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
  
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Asthawaani" className="h-8 w-auto brightness-0 invert opacity-80" />
              <h3 className="text-2xl font-serif font-bold text-primary">Asthawaani</h3>
            </div>
            <p className="opacity-80 max-w-xs mb-6 leading-relaxed">
              {t('hero.mission')}
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.047-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.067-.06-1.407-.06-4.123v-.066c0-2.292-.013-3.808-.06-4.813-.049-.99-.218-1.639-.465-2.127a2.902 2.902 0 00-1.153-1.153c-.488-.247-1.137-.416-2.127-.465-1.005-.047-2.52-.06-4.813-.06h-.066z" clipRule="evenodd" /></svg>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-primary">Contact</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-primary" />
                <span>Ashirwad Palace, Swej Farm, Yamunapar, Laxminagar, Mathura, Uttar Pradesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>+91 76684 09246</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-primary">Map</h4>
            <div className="bg-white/10 rounded-lg h-32 flex items-center justify-center border border-white/10">
              <span className="text-sm opacity-60">Map Embed Placeholder</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm opacity-60">
          <p>&copy; {new Date().getFullYear()} Asthawaani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
