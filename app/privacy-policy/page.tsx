import type { Metadata } from 'next';
import PrivacyClient from './PrivacyClient';

export const metadata: Metadata = {
  title: 'Privacy Policy | Asthawaani',
  description: 'Asthawaani privacy policy. How we collect, use, and protect your personal information.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.asthawaani.com/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return <PrivacyClient />;
}
