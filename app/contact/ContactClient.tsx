'use client';

import { useLanguage } from '../lib/language-context';
import { ContactForm } from './ContactForm';
import { DEFAULT_CONTACT_INFO, type ContactInfo } from '../lib/contact-info-shared';

const titleHi = 'संपर्क';
const getInTouchEn = 'Get in Touch';
const getInTouchHi = 'संपर्क में रहें';
const introEn = 'Whether you are a seeker looking for guidance or a speaker wishing to join our platform, we are here for you.';
const introHi = 'चाहे आप मार्गदर्शन की तलाश में साधक हों या हमारे मंच से जुड़ने की इच्छा रखने वाले वक्ता, हम आपके लिए यहाँ हैं।';
const addressLabelHi = 'पता';
const phoneLabelHi = 'फ़ोन';
const emailLabelHi = 'ईमेल';
export function ContactClient({ contact = DEFAULT_CONTACT_INFO }: { contact?: ContactInfo }) {
  const { language } = useLanguage();
  const isHi = language === 'hi';
  return (
    <main className="min-h-screen">
      <section className="bg-[hsl(45,90%,50%)] min-h-[300px] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center h-full flex items-center justify-center">
          <h1 className="m-0 text-4xl md:text-5xl font-serif font-bold text-white">{isHi ? titleHi : 'Contact'}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[hsl(45,90%,50%)] mb-6 italic">{isHi ? getInTouchHi : getInTouchEn}</h2>
              <p className="text-gray-600 mb-8 text-lg">{isHi ? introHi : introEn}</p>
              <div className="space-y-4">
                <p className="text-gray-700"><strong>{isHi ? addressLabelHi : 'Address'}:</strong> {isHi ? contact.addressHi : contact.address}</p>
                <p className="text-gray-700"><strong>{isHi ? phoneLabelHi : 'Phone'}:</strong> <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="hover:text-[hsl(45,90%,45%)]">{contact.phone}</a></p>
                <p className="text-gray-700"><strong>{isHi ? emailLabelHi : 'Email'}:</strong> <a href={`mailto:${contact.email}`} className="hover:text-[hsl(45,90%,45%)] break-all">{contact.email}</a></p>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
