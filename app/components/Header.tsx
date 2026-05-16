'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Our Services' },
  { href: '/brajbhoomi', label: 'Brajbhoomi' },
  { href: '/blog', label: 'Blog' },
  { href: '/videos', label: 'Videos' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = isHome && !isScrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent py-6 text-white' : 'bg-white/95 backdrop-blur-md shadow-sm py-4 text-gray-900'}`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between gap-4">
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
              {link.label}
            </Link>
          ))}
          <Link href="/join-partners" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-serif font-bold px-6 py-2 rounded-md text-sm transition-colors">
            Join Us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium py-2 ${pathname === link.href ? 'text-amber-600 font-bold' : 'text-gray-700'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
