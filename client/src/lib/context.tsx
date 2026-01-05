import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'मुखपृष्ठ' },
  'nav.about': { en: 'About', hi: 'हमारे बारे में' },
  'nav.gallery': { en: 'Gallery', hi: 'गैलरी' },
  'nav.videos': { en: 'Videos', hi: 'वीडियो' },
  'nav.contact': { en: 'Contact', hi: 'संपर्क' },
  'nav.join': { en: 'Join Satsang', hi: 'सत्संग से जुड़ें' },

  // Hero
  'hero.mission': { en: 'To take the light of wisdom to every home.', hi: 'ज्ञान के प्रकाश को हर घर तक पहुँचाना।' },
  'hero.cta': { en: 'Join the Digital Satsang', hi: 'डिजिटल सत्संग से जुड़ें' },

  // About Preview
  'about.title': { en: 'What is Asthawaani?', hi: 'आस्थावाणी क्या है?' },
  'about.subtitle': { en: 'A spiritual platform born from Mathura–Vrindavan.', hi: 'मथुरा-वृंदावन से जन्मा एक आध्यात्मिक मंच।' },
  
  // Sections
  'offerings.title': { en: 'Our Services', hi: 'हमारी सेवाएँ' },
  'locations.title': { en: 'Our Locations', hi: 'हमारे स्थान' },
  'gallery.title': { en: 'Divine Gallery', hi: 'दिव्य गैलरी' },
  'contact.title': { en: 'Contact Us', hi: 'संपर्क करें' },
  
  // Footer
  'footer.address': { en: 'Asthawaani Kendra, Mathura', hi: 'आस्थावाणी केंद्र, मथुरा' },
  'footer.terms': { en: 'Terms of Service', hi: 'सेवा की शर्तें' },
  'footer.privacy': { en: 'Privacy Policy', hi: 'गोपनीयता नीति' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
