import type { Metadata } from 'next';
import TermsClient from './TermsClient';

export const metadata: Metadata = {
  title: 'Terms of Service | Asthawaani',
  description: 'Terms of service for using the Asthawaani spiritual platform.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.asthawaani.com/terms-of-service' },
};

export default function TermsOfServicePage() {
  return <TermsClient />;
}
