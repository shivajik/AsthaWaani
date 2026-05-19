'use client';

import { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '../lib/language-context';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {children}
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
