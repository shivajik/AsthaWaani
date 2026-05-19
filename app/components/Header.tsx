'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../lib/language-context';

const navLinks = [
  { href: '/', key: 'nav.home' },
  { href: '/about', key: 'nav.about' },
  { href: '/services', key: 'nav.services' },
  { href: '/brajbhoomi', key: 'nav.brajbhoomi' },
  { href: '/blog', key: 'nav.blog' },
  { href: '/videos', key: 'nav.videos' },
  { href: '/contact', key: 'nav.contact' },
];

export function Header() {
  const pathname = usePathname();
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isTransparent = isHome && !isScrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent py-6 text-white' : 'bg-white/95 backdrop-blur-md shadow-sm py-4 text-gray-900'}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src={isTransparent ? '/attached_assets/Asthawani-logo-h-w_1765886987919.png' : '/attached_assets/Asthawani-logo-h_1765886539362.png'}
            alt="Asthawaani Logo"
            className="h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm md:text-base font-medium transition-colors whitespace-nowrap ${
                pathname === link.href
                  ? 'text-amber-500 font-bold'
                  : isTransparent ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-amber-600'
              }`}
            >
              {t(link.key)}
            </Link>
          ))}

          {/* Language Button */}
          <button
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className={`inline-flex items-center gap-2 text-base px-3 py-1 rounded-md transition-colors ${isTransparent ? 'text-white hover:bg-white/20' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            {language === 'en' ? 'हिं' : 'EN'}
          </button>

          {/* Join Us Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-serif font-bold px-6 py-2 rounded-md text-sm transition-colors cursor-pointer"
            >
              {t('nav.joinUs')}
              <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-50">
                <Link href="/community" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600">{t('nav.community')}</Link>
                <Link href="/join-partners" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600">{t('nav.partners')}</Link>
                <Link href="/apply-vakta" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600">{t('nav.vakta')}</Link>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className={`text-base font-medium py-2 ${pathname === link.href ? 'text-amber-600 font-bold' : 'text-gray-700'}`}>
                {t(link.key)}
              </Link>
            ))}
            <hr className="my-2" />
            <button onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }} className="text-base text-amber-600 font-bold py-2 text-left">
              {language === 'en' ? 'हिंदी में देखें' : 'View in English'}
            </button>
            <Link href="/community" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-gray-700 py-2">{t('nav.community')}</Link>
            <Link href="/join-partners" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-gray-700 py-2">{t('nav.partners')}</Link>
            <Link href="/apply-vakta" onClick={() => setIsMobileMenuOpen(false)} className="text-base text-gray-700 py-2">{t('nav.vakta')}</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
