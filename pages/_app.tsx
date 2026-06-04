import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import '../app/globals.css';
import { LanguageProvider, useLanguage } from '../app/lib/language-context';
import { FooterClient } from '../app/components/FooterClient';

const navLinks = [
  { href: '/', key: 'nav.home' },
  { href: '/about', key: 'nav.about' },
  { href: '/services', key: 'nav.services' },
  { href: '/brajbhoomi', key: 'nav.brajbhoomi' },
  { href: '/blog', key: 'nav.blog' },
  { href: '/videos', key: 'nav.videos' },
  { href: '/contact', key: 'nav.contact' },
];

function PagesHeader() {
  const { pathname } = useRouter();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm py-4 text-gray-900">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/attached_assets/Asthawani-logo-h_1765886539362.png" alt="Asthawaani Logo" className="h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform group-hover:scale-105" />
        </Link>
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`text-sm md:text-base font-medium transition-colors whitespace-nowrap ${pathname === link.href ? 'text-amber-500 font-bold' : 'text-gray-700 hover:text-amber-600'}`}>
              {t(link.key)}
            </Link>
          ))}
          <button onClick={toggleLanguage} aria-label="Toggle language" className="inline-flex items-center gap-2 text-base px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
            {language === 'en' ? 'हिं' : 'EN'}
          </button>
          <Link href="/community" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-serif font-bold px-6 py-2 rounded-md text-sm transition-colors">
            {t('nav.joinUs')}
          </Link>
        </nav>
        <Link href="/blog" className="md:hidden text-sm font-semibold text-amber-600">
          {t('nav.blog')}
        </Link>
      </div>
    </header>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
        <PagesHeader />
        <main className="flex-1 w-full relative">
          <Component {...pageProps} />
        </main>
        <FooterClient aboveFooterAds={[]} footerAds={[]} />
      </div>
    </LanguageProvider>
  );
}