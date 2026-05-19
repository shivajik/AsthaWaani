'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Header } from './Header';

/**
 * Renders the public Header on every route except /admin (which has its own
 * full-screen layout). Footer is rendered separately as a server component
 * in layout.tsx after children, and is also hidden on /admin via this
 * component's sibling AdminAware wrapper if needed.
 */
export function SiteHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <Header />;
}

export function HideOnAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <>{children}</>;
}
