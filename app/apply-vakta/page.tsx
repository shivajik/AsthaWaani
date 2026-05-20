'use client';

import { useState } from 'react';
import { useLanguage } from '../lib/language-context';
import { CheckCircle, Loader2, MapPin, Phone, Mail, User, Sparkles, Mic2, Music, BookOpen, Play } from 'lucide-react';

const vaktaCategories = [
  'Katha Vachak',
  'Bhajan',
  'Pravachan',
  'Motivational',
  'Bhakti Sangeet',
  'Live Darshan',
] as const;

const categoryIcons: Record<string, typeof Mic2> = {
  'Katha Vachak': BookOpen,
  Bhajan: Music,
  Pravachan: Mic2,
  Motivational: Sparkles,
  'Bhakti Sangeet': Music,
  'Live Darshan': Play,
};

const categoryHi: Record<string, string> = {
  'Katha Vachak': 'कथा वाचक',
  Bhajan: 'भजन',
  Pravachan: 'प्रवचन',
  Motivational: 'प्रेरणा',
  'Bhakti Sangeet': 'भक्ति संगीत',
  'Live Darshan': 'लाइव दर्शन',
};

const t = {
  badge: { en: 'Mathura Vrindavan Dham', hi: 'मथुरा वृंदावन धाम' },
  heading: { en: 'Apply Now as', hi: 'अभी आवेदन करें' },
  vakta: { en: 'Vakta', hi: 'वक्ता' },
  sub: {
    en: 'Join our platform to share your spiritual knowledge and connect with devotees worldwide. We are looking for talented speakers, singers, and spiritual guides.',
    hi: 'अपना आध्यात्मिक ज्ञान साझा करने और दुनिया भर के भक्तों से जुड़ने के लिए हमारे मंच से जुड़ें। हम प्रतिभाशाली वक्ताओं, गायकों और आध्यात्मिक मार्गदर्शकों की तलाश में हैं।',
  },
  formTitle: { en: 'Registration Form', hi: 'पंजीकरण फॉर्म' },
  formSub: { en: 'Fill out the form below to apply', hi: 'आवेदन के लिए नीचे का फॉर्म भरें' },
  name: { en: 'Name', hi: 'नाम' },
  namePh: { en: 'Enter your full name', hi: 'अपना पूरा नाम दर्ज करें' },
  phone: { en: 'Contact Number', hi: 'संपर्क नंबर' },
  phonePh: { en: 'Enter your phone number', hi: 'अपना फोन नंबर दर्ज करें' },
  email: { en: 'Email ID', hi: 'ईमेल आईडी' },
  emailPh: { en: 'Enter your email address', hi: 'अपना ईमेल पता दर्ज करें' },
  interest: { en: 'Are you interested in? (Select all that apply)', hi: 'आपकी रुचि किस में है? (लागू सभी चुनें)' },
  exp: { en: 'Tell us about your experience', hi: 'अपने अनुभव के बारे में बताएं' },
  expPh: {
    en: 'Describe your experience in katha, bhajan, pravachan, or other spiritual activities. Include any notable events or programs you have participated in...',
    hi: 'कथा, भजन, प्रवचन या अन्य आध्यात्मिक गतिविधियों में अपने अनुभव का वर्णन करें। उन कार्यक्रमों का उल्लेख करें जिनमें आपने भाग लिया है...',
  },
  submit: { en: 'Submit Application', hi: 'आवेदन जमा करें' },
  submitting: { en: 'Submitting...', hi: 'जमा हो रहा है...' },
  successTitle: { en: 'Application Submitted Successfully!', hi: 'आवेदन सफलतापूर्वक जमा हो गया!' },
  successMsg: {
    en: 'Thank you for your interest in joining as a Vakta. Our team will review your application and contact you soon.',
    hi: 'वक्ता के रूप में जुड़ने में आपकी रुचि के लिए धन्यवाद। हमारी टीम आपके आवेदन की समीक्षा कर शीघ्र संपर्क करेगी।',
  },
  successFoot: {
    en: 'We promote spiritual content from Mathura Vrindavan Dham and look forward to having you on our platform.',
    hi: 'हम मथुरा वृंदावन धाम से आध्यात्मिक सामग्री का प्रचार करते हैं और आपका हमारे मंच पर स्वागत है।',
  },
  sideTitle: { en: 'Join Our Spiritual Community', hi: 'हमारे आध्यात्मिक समुदाय से जुड़ें' },
  sideDesc: {
    en: 'We are promoting spiritual content from Mathura Vrindavan Dham. If you are a Katha Vachak, Bhajan singer, or spiritual guide, we want to help you reach a wider audience.',
    hi: 'हम मथुरा वृंदावन धाम से आध्यात्मिक सामग्री का प्रचार कर रहे हैं। यदि आप कथा वाचक, भजन गायक या आध्यात्मिक मार्गदर्शक हैं, तो हम आपको व्यापक दर्शकों तक पहुँचाने में मदद करना चाहते हैं।',
  },
  bullet1: { en: 'Reach thousands of devotees worldwide', hi: 'दुनिया भर के हजारों भक्तों तक पहुँचें' },
  bullet2: { en: 'Professional video production support', hi: 'पेशेवर वीडियो प्रोडक्शन सहायता' },
  bullet3: { en: 'Grow your spiritual presence online', hi: 'ऑनलाइन अपनी आध्यात्मिक उपस्थिति बढ़ाएँ' },
  errReq: { en: 'Please fill all required fields.', hi: 'कृपया सभी आवश्यक फ़ील्ड भरें।' },
  errCat: { en: 'Please select at least one category.', hi: 'कृपया कम से कम एक श्रेणी चुनें।' },
  errFail: { en: 'Failed to submit. Please try again.', hi: 'जमा करने में विफल। कृपया पुनः प्रयास करें।' },
};

export default function ApplyVaktaPage() {
  const { language } = useLanguage();
  const hi = language === 'hi';
  const pick = (k: keyof typeof t) => (hi ? t[k].hi : t[k].en);

  const [form, setForm] = useState({ name: '', phone: '', email: '', experience: '' });
  const [categories, setCategories] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleCat = (cat: string) =>
    setCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.phone || !form.email || !form.experience) {
      setError(pick('errReq'));
      return;
    }
    if (categories.length === 0) {
      setError(pick('errCat'));
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/vakta-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, categories }),
      });
      if (!res.ok) throw new Error('failed');
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError(pick('errFail'));
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen pt-28 pb-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <div className="max-w-lg w-full text-center bg-white rounded-2xl shadow-xl p-8 border border-orange-200">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{pick('successTitle')}</h2>
            <p className="text-gray-600 mb-6">{pick('successMsg')}</p>
            <p className="text-sm text-gray-500">{pick('successFoot')}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
            <MapPin className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700">{pick('badge')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            {pick('heading')} <span className="text-orange-600">{pick('vakta')}</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{pick('sub')}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-6xl mx-auto">
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl border border-orange-200/50 p-6 md:p-8">
              <div className="text-center pb-4 mb-2">
                <h2 className="text-2xl font-bold text-gray-800">{pick('formTitle')}</h2>
                <p className="text-sm text-gray-500">{pick('formSub')}</p>
              </div>
              <form onSubmit={onSubmit} className="space-y-6">
                <Field label={pick('name')} icon={<User className="w-4 h-4" />}>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={pick('namePh')} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </Field>
                <Field label={pick('phone')} icon={<Phone className="w-4 h-4" />}>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder={pick('phonePh')} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </Field>
                <Field label={pick('email')} icon={<Mail className="w-4 h-4" />}>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={pick('emailPh')} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </Field>

                <div>
                  <label className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-700">
                    <Sparkles className="w-4 h-4" /> {pick('interest')}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {vaktaCategories.map((cat) => {
                      const Icon = categoryIcons[cat] || Mic2;
                      const checked = categories.includes(cat);
                      return (
                        <button type="button" key={cat} onClick={() => toggleCat(cat)} className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${checked ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white hover:border-orange-300'}`}>
                          <span className={`w-4 h-4 inline-block rounded border ${checked ? 'bg-orange-500 border-orange-500' : 'border-gray-300'}`}>
                            {checked && <CheckCircle className="w-4 h-4 text-white" />}
                          </span>
                          <Icon className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium text-gray-700">{hi ? categoryHi[cat] : cat}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{pick('exp')}</label>
                  <textarea value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder={pick('expPh')} className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-32 resize-none" />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button type="submit" disabled={submitting} className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white font-semibold py-3 rounded-md transition-colors flex items-center justify-center gap-2">
                  {submitting ? (<><Loader2 className="w-4 h-4 animate-spin" /> {pick('submitting')}</>) : pick('submit')}
                </button>
              </form>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:sticky lg:top-28">
            <div className="bg-white rounded-2xl shadow-xl border border-orange-200/50 overflow-hidden">
              <div className="aspect-video relative bg-black">
                <video src="https://www.asthawaani.com/Asthawani_Video_.mp4" controls playsInline className="w-full h-full" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{pick('sideTitle')}</h3>
                <p className="text-gray-600 mb-4">{pick('sideDesc')}</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> {pick('bullet1')}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> {pick('bullet2')}</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> {pick('bullet3')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">{icon} {label}</label>
      {children}
    </div>
  );
}
