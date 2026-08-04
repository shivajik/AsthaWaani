'use client';

import { useState } from 'react';
import { useLanguage } from '../lib/language-context';

export function PartnershipForm({ whatsappNumber = '917668409246' }: { whatsappNumber?: string }) {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    details: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Partnership Inquiry:\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nOrganization: ${formData.organization}\nDetails: ${formData.details}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border p-8 md:p-10">
      <h2 className="text-2xl font-serif font-bold text-[hsl(225,55%,35%)] mb-2">{hi ? 'साझेदारी फॉर्म' : 'Partnership Form'}</h2>
      <p className="text-gray-500 mb-8">{hi ? 'कृपया नीचे विवरण भरें, हम आपसे शीघ्र संपर्क करेंगे।' : 'Please fill in the details below and we will get back to you.'}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">{hi ? 'पूरा नाम' : 'Full Name'}</label>
            <input
              type="text"
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
              placeholder={hi ? 'आपका पूरा नाम' : 'Your full name'}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{hi ? 'ईमेल' : 'Email'}</label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{hi ? 'फ़ोन' : 'Phone'}</label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">{hi ? 'संस्था (वैकल्पिक)' : 'Organization (Optional)'}</label>
            <input
              type="text"
              id="organization"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors"
              placeholder={hi ? 'आपकी संस्था' : 'Your organization'}
            />
          </div>
        </div>

        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">{hi ? 'साझेदारी का विवरण' : 'Partnership Details'}</label>
          <textarea
            id="details"
            required
            rows={5}
            value={formData.details}
            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-colors resize-none"
            placeholder={hi ? 'अपनी साझेदारी के बारे में हमें बताएं...' : 'Tell us about the partnership you have in mind...'}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {hi ? 'फॉर्म जमा करें' : 'Submit Form'}
        </button>
      </form>
    </div>
  );
}
