import type { Metadata } from 'next';
import CommunityClient from './CommunityClient';

export const metadata: Metadata = {
  title: 'Spiritual Community – Join Our Sangha | Asthawaani',
  description: 'Join Asthawaani spiritual community. Connect with fellow seekers, participate in satsang, and grow on your spiritual path.',
  openGraph: {
    title: 'Spiritual Community – Join Our Sangha | Asthawaani',
    description: 'Join Asthawaani spiritual community. Connect with fellow seekers.',
    url: 'https://www.asthawaani.com/community',
    type: 'website',
  },
  alternates: { canonical: 'https://www.asthawaani.com/community' },
};

export default function CommunityPage() {
  return <CommunityClient />;
}
