'use client';

import Link from 'next/link';
import { useLanguage } from '../lib/language-context';
import { DEFAULT_CONTACT_INFO, toDialDigits, type ContactInfo } from '../lib/contact-info-shared';

type Ad = { id: string; titleEn: string; imageUrl: string; link?: string | null };

export function FooterClient({ aboveFooterAds, footerAds, contact = DEFAULT_CONTACT_INFO }: { aboveFooterAds: Ad[]; footerAds: Ad[]; contact?: ContactInfo }) {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';
  const waDigits = toDialDigits(contact.whatsapp);
  return (
    <>
      {/* Above Footer Ad */}
      <div className="w-full flex justify-center py-8">
        {aboveFooterAds.length > 0 ? (
          aboveFooterAds.map((ad) => (
            <a key={ad.id} href={ad.link || '#'} target="_blank" rel="noopener noreferrer" className="block max-w-3xl mx-auto">
              <img src={ad.imageUrl} alt={ad.titleEn} className="w-full h-auto rounded-lg" />
            </a>
          ))
        ) : (
          <img
            src="/attached_assets/channels4_banner_1765890087938.jpg"
            alt="Follow Asthawaani"
            className="max-w-3xl w-full h-auto rounded-lg mx-auto"
          />
        )}
      </div>

      <footer className="bg-[hsl(225,55%,20%)] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="mb-6">
                <img src="/attached_assets/Asthawani-logo-w_1765886987919.png" alt="Asthawaani" className="h-16 w-auto" />
              </div>
              <p className="text-white/70 text-sm mb-6 leading-relaxed">{t('footer.tagline')}</p>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/share/1ACBKJFoW9/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition-all" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://www.instagram.com/Asthawaani" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition-all" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="https://www.youtube.com/@Asthawaani" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition-all" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                </a>
                <a href={`https://wa.me/${waDigits}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition-all" aria-label="WhatsApp">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-amber-400 text-sm uppercase tracking-wider">{t('footer.contact')}</h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>{isHi ? contact.addressHi : contact.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="hover:text-amber-400 transition-colors">{contact.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <a href={`mailto:${contact.email}`} className="hover:text-amber-400 transition-colors break-all">{contact.email}</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-amber-400 text-sm uppercase tracking-wider">{t('footer.sponsored')}</h4>
              <div className="rounded-lg overflow-hidden border border-white/10">
                {footerAds.length > 0 ? (
                  <a href={footerAds[0].link || '#'} target="_blank" rel="noopener noreferrer">
                    <img src={footerAds[0].imageUrl} alt={footerAds[0].titleEn} className="w-full h-auto" />
                  </a>
                ) : (
                  <img src="/attached_assets/image_1765904066290.png" alt="Join as a Creator" className="w-full h-auto" />
                )}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-amber-400 text-sm uppercase tracking-wider">{t('footer.map')}</h4>
              <div className="rounded-lg overflow-hidden border border-white/10 h-48 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3521.0!2d77.6998269!3d27.5071311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e9e9e9e9e9%3A0x0!2sAshirwad%20Palace%20Mathura!5e0!3m2!1sen!2sin!4v1640000000000"
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: 0 }}
                  title="Asthawaani Location Map"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-white/60">
              <Link href="/terms-of-service" className="hover:text-amber-400 transition-colors">{t('footer.terms')}</Link>
              <span className="hidden md:inline text-white/20">|</span>
              <Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">{t('footer.privacy')}</Link>
              <span className="hidden md:inline text-white/20">|</span>
              <span>{t('footer.rights')}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
