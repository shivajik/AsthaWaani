'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// Static EN/HI dictionary for non-CMS marketing strings.
// CMS-managed long-form content (about, contact, services, gallery,
// brajbhoomi, privacy, terms, home long-text) is fetched from the
// database via /api/pages/:slug and rendered using `title_hi` / `content_hi`.
const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'मुखपृष्ठ' },
  'nav.about': { en: 'About', hi: 'हमारे बारे में' },
  'nav.services': { en: 'Our Services', hi: 'हमारी सेवाएँ' },
  'nav.brajbhoomi': { en: 'Brajbhoomi', hi: 'ब्रजभूमि' },
  'nav.blog': { en: 'Blog', hi: 'ब्लॉग' },
  'nav.videos': { en: 'Videos', hi: 'वीडियो' },
  'nav.gallery': { en: 'Gallery', hi: 'गैलरी' },
  'nav.contact': { en: 'Contact', hi: 'संपर्क' },
  'nav.community': { en: 'Join Our Community', hi: 'हमारे समुदाय से जुड़ें' },
  'nav.partners': { en: 'Join as Partners', hi: 'साझेदार के रूप में जुड़ें' },
  'nav.vakta': { en: 'Join as Vakta', hi: 'वक्ता के रूप में जुड़ें' },
  'nav.joinUs': { en: 'Join Us', hi: 'हमसे जुड़ें' },

  // Hero
  'hero.title': { en: 'Asthawaani', hi: 'आस्थावाणी' },
  'hero.tagline': {
    en: 'To take the light of wisdom to every home.',
    hi: 'ज्ञान के प्रकाश को हर घर तक पहुँचाना।',
  },
  'hero.cta': { en: '✨ Join the Digital Satsang', hi: '✨ डिजिटल सत्संग से जुड़ें' },
  'hero.scroll': { en: 'Scroll', hi: 'नीचे जाएँ' },

  // Home — About preview
  'home.about.title': { en: 'What is Asthawaani?', hi: 'आस्थावाणी क्या है?' },
  'home.about.subtitle': {
    en: 'A spiritual platform born from Mathura–Vrindavan.',
    hi: 'मथुरा-वृंदावन से जन्मा एक आध्यात्मिक मंच।',
  },
  'home.about.cta': { en: 'Read Our Story', hi: 'हमारी कहानी पढ़ें' },

  // Offerings
  'home.offerings.title': { en: 'Our Services', hi: 'हमारी सेवाएँ' },
  'home.offerings.subtitle': {
    en: 'Daily spiritual practices to nurture your soul.',
    hi: 'आपकी आत्मा को पोषित करने के लिए दैनिक आध्यात्मिक अभ्यास।',
  },
  'offerings.satsang.title': { en: 'Daily Satsang', hi: 'दैनिक सत्संग' },
  'offerings.satsang.desc': { en: 'Live wisdom from Vrindavan.', hi: 'वृंदावन से सजीव ज्ञान।' },
  'offerings.bhajan.title': { en: 'Bhajan Kirtan', hi: 'भजन कीर्तन' },
  'offerings.bhajan.desc': {
    en: 'Devotional music for the soul.',
    hi: 'आत्मा के लिए भक्ति संगीत।',
  },
  'offerings.aarti.title': { en: 'Morning Aarti', hi: 'प्रातः आरती' },
  'offerings.aarti.desc': {
    en: 'Start your day with blessings.',
    hi: 'अपने दिन की शुरुआत आशीर्वाद से करें।',
  },
  'offerings.community.title': { en: 'Community', hi: 'समुदाय' },
  'offerings.community.desc': {
    en: 'Connect with fellow seekers.',
    hi: 'साथी साधकों से जुड़ें।',
  },

  // Locations
  'home.locations.title': { en: 'Sacred Locations of Braj', hi: 'ब्रज के पवित्र स्थान' },
  'home.locations.subtitle': {
    en: "Visit the divine places of Krishna's leelas.",
    hi: 'कृष्ण की लीलाओं के दिव्य स्थलों के दर्शन करें।',
  },
  'loc.mathura': { en: 'Mathura', hi: 'मथुरा' },
  'loc.vrindavan': { en: 'Vrindavan', hi: 'वृंदावन' },
  'loc.gokul': { en: 'Gokul', hi: 'गोकुल' },
  'loc.govardhan': { en: 'Govardhan', hi: 'गोवर्धन' },
  'loc.mahavan': { en: 'Mahavan', hi: 'महावन' },

  // Videos section
  'home.videos.title': { en: 'Latest Videos', hi: 'नवीनतम वीडियो' },
  'home.videos.subtitle': {
    en: 'Spiritual discourses from our YouTube channel.',
    hi: 'हमारे यूट्यूब चैनल से आध्यात्मिक प्रवचन।',
  },
  'home.videos.viewAll': { en: 'View All Videos', hi: 'सभी वीडियो देखें' },

  // Common
  'common.loading': { en: 'Loading...', hi: 'लोड हो रहा है...' },
  'common.readMore': { en: 'Read More', hi: 'और पढ़ें' },
  'common.viewAll': { en: 'View All', hi: 'सभी देखें' },
  'common.send': { en: 'Send Message', hi: 'संदेश भेजें' },
  'common.sending': { en: 'Sending...', hi: 'भेज रहे हैं...' },
  'common.name': { en: 'Name', hi: 'नाम' },
  'common.email': { en: 'Email', hi: 'ईमेल' },
  'common.phone': { en: 'Phone', hi: 'फ़ोन' },
  'common.subject': { en: 'Subject', hi: 'विषय' },
  'common.message': { en: 'Message', hi: 'संदेश' },

  // Footer
  'footer.contact': { en: 'Contact', hi: 'संपर्क' },
  'footer.sponsored': { en: 'Sponsored', hi: 'प्रायोजित' },
  'footer.map': { en: 'Map', hi: 'मानचित्र' },
  'footer.tagline': {
    en: 'To take the light of wisdom to every home, and give every true voice the place it deserves.',
    hi: 'ज्ञान के प्रकाश को हर घर तक पहुँचाना, और हर सच्ची आवाज़ को उसका योग्य स्थान देना।',
  },
  'footer.address': {
    en: 'Ashirwad Palace, Swej Farm, Yamunapar, Laxminagar, Mathura, Uttar Pradesh',
    hi: 'आशीर्वाद पैलेस, स्वेज फार्म, यमुनापार, लक्ष्मीनगर, मथुरा, उत्तर प्रदेश',
  },
  'footer.terms': { en: 'Terms of Service', hi: 'सेवा की शर्तें' },
  'footer.privacy': { en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
  'footer.rights': {
    en: '© 2026 Asthawaani. All rights reserved.',
    hi: '© 2026 आस्थावाणी. सर्वाधिकार सुरक्षित।',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Restore persisted language on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('asthawaani-lang') as Language | null;
      if (saved === 'en' || saved === 'hi') setLanguageState(saved);
    } catch {}
  }, []);

  // Update <html lang="..."> for SEO/accessibility
  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {}
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('asthawaani-lang', lang);
    } catch {}
  };

  const toggleLanguage = () => setLanguage(language === 'en' ? 'hi' : 'en');

  const t = (key: string) => translations[key]?.[language] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

/**
 * Hook to fetch a CMS page row from /api/pages/:slug and pick the right
 * language fields for the current Language setting.
 */
export function useCmsPage(slug: string) {
  const { language } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`/api/pages/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled) {
          setData(d);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const title = data ? (language === 'hi' ? data.titleHi || data.title : data.title) : '';
  const content = data
    ? language === 'hi'
      ? data.contentHi || data.content || ''
      : data.content || ''
    : '';

  return { page: data, title, content, loading };
}
