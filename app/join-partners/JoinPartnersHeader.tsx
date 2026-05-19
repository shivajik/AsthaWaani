'use client';
import { useLanguage } from '../lib/language-context';

export default function JoinPartnersHeader() {
  const { language } = useLanguage();
  const hi = language === 'hi';
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">{hi ? 'साझेदार के रूप में जुड़ें' : 'Join as Partners'}</h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">{hi ? 'आध्यात्मिक यात्रा में आस्थावाणी के साथ साझेदारी करें' : 'Collaborate with Asthawaani in the spiritual journey'}</p>
    </div>
  );
}