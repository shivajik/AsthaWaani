import type { Metadata } from 'next';

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
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">Contact Us</h1>
          <p className="text-gray-600">Get in touch with Asthawaani</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[hsl(225,55%,35%)] mb-6">Our Address</h2>
            <p className="text-gray-600 mb-4">Ashirwad Palace, Swej Farm, Yamunapar, Laxminagar, Mathura, Uttar Pradesh 281001</p>
            <p className="text-gray-600 mb-4"><strong>Phone:</strong> +91 76684 09246</p>
            <p className="text-gray-600"><strong>Email:</strong> contact@asthawaani.com</p>
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-[hsl(225,55%,35%)] mb-6">Send a Message</h2>
            <p className="text-gray-500">Contact form coming soon. For now, please call or email us directly.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
