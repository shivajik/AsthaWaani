'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../../lib/language-context';
import { serviceDetails } from './content';

export default function ServiceSidebar() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const hi = language === 'hi';
  const services = Object.values(serviceDetails);

  return (
    <aside className="lg:sticky lg:top-28">
      <div className="bg-white border border-amber-200 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-[hsl(225,55%,35%)] px-5 py-3">
          <h3 className="text-white font-serif font-bold text-lg">
            {hi ? 'सभी सेवाएँ' : 'All Services'}
          </h3>
        </div>
        <nav className="p-2">
          {services.map((s) => {
            const href = `/services/${s.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={s.slug}
                href={href}
                className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? 'bg-amber-100 text-amber-800 font-semibold border-l-4 border-amber-500'
                    : 'text-gray-700 hover:bg-amber-50 hover:text-amber-700 border-l-4 border-transparent'
                }`}
              >
                {hi ? s.titleHi : s.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
