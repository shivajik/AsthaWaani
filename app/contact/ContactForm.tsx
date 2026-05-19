'use client';

import { useState } from 'react';
import { useLanguage } from '../lib/language-context';

const ph = {
  name: { en: 'Your Name', hi: 'आपका नाम' },
  phone: { en: '+91...', hi: '+91...' },
  email: { en: 'email@example.com', hi: 'email@example.com' },
  subject: { en: 'Subject of your message', hi: 'आपके संदेश का विषय' },
  message: { en: 'Your message...', hi: 'आपका संदेश...' },
};
const ok = { en: 'Message sent successfully!', hi: 'संदेश सफलतापूर्वक भेजा गया!' };
const fail = { en: 'Failed to send. Please try again.', hi: 'भेजने में विफल। कृपया पुनः प्रयास करें।' };

export function ContactForm() {
  const { language, t } = useLanguage();
  const isHi = language === 'hi';
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">{t('common.name')}</label>
          <input type="text" placeholder={isHi ? ph.name.hi : ph.name.en} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">{t('common.phone')}</label>
          <input type="tel" placeholder={isHi ? ph.phone.hi : ph.phone.en} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">{t('common.email')}</label>
        <input type="email" placeholder={isHi ? ph.email.hi : ph.email.en} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400" required />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">{t('common.subject')}</label>
        <input type="text" placeholder={isHi ? ph.subject.hi : ph.subject.en} value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400" required />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">{t('common.message')}</label>
        <textarea placeholder={isHi ? ph.message.hi : ph.message.en} rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none" required />
      </div>
      <button type="submit" disabled={status === 'loading'} className="w-full bg-[hsl(225,55%,35%)] hover:bg-[hsl(225,55%,30%)] text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50">
        {status === 'loading' ? t('common.sending') : t('common.send')}
      </button>
      {status === 'success' && <p className="text-green-600 text-center font-medium">{isHi ? ok.hi : ok.en}</p>}
      {status === 'error' && <p className="text-red-600 text-center font-medium">{isHi ? fail.hi : fail.en}</p>}
    </form>
  );
}
