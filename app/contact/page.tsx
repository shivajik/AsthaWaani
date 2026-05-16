import type { Metadata } from 'next';
import { ContactForm } from './ContactForm';

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

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Yellow Banner */}
      <section className="bg-[hsl(45,90%,50%)] pt-28 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">Contact</h1>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left - Info */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-[hsl(45,90%,50%)] mb-6 italic">Get in Touch</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Whether you are a seeker looking for guidance or a speaker wishing to join our platform, we are here for you.
              </p>
              <div className="space-y-4">
                <p className="text-gray-700"><strong>Address:</strong> Ashirwad Palace, Swej Farm, Yamunapar, Laxminagar, Mathura, Uttar Pradesh 281001</p>
                <p className="text-gray-700"><strong>Phone:</strong> +91 76684 09246</p>
                <p className="text-gray-700"><strong>Email:</strong> contact@asthawaani.com</p>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
