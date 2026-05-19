import type { Metadata } from 'next';
import { Playfair_Display, Inter, Merriweather, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Providers } from './components/Providers';
import { SiteHeader, HideOnAdmin } from './components/Chrome';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-merriweather',
  display: 'swap',
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-devanagari',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.asthawaani.com'),
  title: {
    default: 'Asthawaani – Online Satsang, Bhajan & Mantra Jaap from Vrindavan',
    template: '%s | Asthawaani',
  },
  description: 'Asthawaani is a spiritual platform from Mathura-Vrindavan offering daily satsang, bhajan kirtan, mantra jaap, and katha pravachan. Join the digital satsang today.',
  openGraph: {
    type: 'website',
    siteName: 'Asthawaani',
    locale: 'en_IN',
    images: [{ url: '/opengraph.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@asthawaani',
  },
  alternates: {
    languages: {
      'en': 'https://www.asthawaani.com',
      'hi': 'https://www.asthawaani.com',
    },
  },
  icons: {
    icon: '/attached_assets/Asthawani-logo_1765886539362.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${merriweather.variable} ${notoDevanagari.variable}`}>
      <head>
        {/* Schema.org JSON-LD - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Asthawaani",
              "url": "https://www.asthawaani.com",
              "logo": "https://www.asthawaani.com/logo.png",
              "sameAs": [
                "https://www.youtube.com/@Asthawaani",
                "https://www.instagram.com/Asthawaani",
                "https://www.facebook.com/share/1ACBKJFoW9/"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-76684-09246",
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": ["en", "hi"]
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ashirwad Palace, Swej Farm, Yamunapar, Laxminagar",
                "addressLocality": "Mathura",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "281001",
                "addressCountry": "IN"
              }
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-black overflow-x-hidden">
        <Providers>
          <SiteHeader />
          <main className="flex-1 w-full relative">
            {children}
          </main>
          <HideOnAdmin>
            <Footer />
          </HideOnAdmin>
        </Providers>

        {/* Google Analytics - deferred */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RKHLK6WYS4"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RKHLK6WYS4');
          `}
        </Script>

        {/* Crisp Chat - lazy loaded */}
        <Script id="crisp-init" strategy="lazyOnload">
          {`
            window.$crisp=[];
            window.CRISP_WEBSITE_ID="146efbaa-5688-456b-8fac-04a0a0be21f6";
            (function(){
              var d=document;
              var s=d.createElement("script");
              s.src="https://client.crisp.chat/l.js";
              s.async=1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
