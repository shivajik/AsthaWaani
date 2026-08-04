import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';
import { getContactInfo } from '../lib/contact-info';

export const metadata: Metadata = {
  title: 'Contact Asthawaani – Reach Us in Mathura, Uttar Pradesh',
  description: 'Get in touch with Asthawaani Kendra, Mathura. Call +91 76684 09246 or email us. Whether you are a seeker or a spiritual speaker, we are here for you.',
  openGraph: {
    title: 'Contact Asthawaani – Reach Us in Mathura, Uttar Pradesh',
    description: 'Get in touch with Asthawaani Kendra, Mathura. Call +91 76684 09246 or email us.',
    url: 'https://www.asthawaani.com/contact',
    type: 'website',
    images: [{ url: 'https://www.asthawaani.com/opengraph.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://www.asthawaani.com/contact' },
};

export default async function ContactPage() {
  const contact = await getContactInfo();
  return <ContactClient contact={contact} />;
}

