import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[hsl(225,55%,35%)] text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo & Social */}
          <div className="flex flex-col items-start">
            <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 h-48 flex items-center justify-center">
              <img src="/attached_assets/Asthawani-logo-w_1765886987919.png" alt="Asthawaani" className="h-40 w-auto rounded-xl" />
            </div>
            <p className="opacity-90 max-w-sm mb-8 leading-relaxed text-lg">To take the light of wisdom to every home.</p>
            <div className="flex gap-6">
              <a href="https://www.facebook.com/share/1ACBKJFoW9/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition-all" aria-label="Facebook">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/Asthawaani" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition-all" aria-label="Instagram">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.youtube.com/@Asthawaani" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition-all" aria-label="YouTube">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6 text-amber-400">Contact</h4>
            <ul className="space-y-4 text-sm opacity-90">
              <li className="flex items-start gap-3">
                <span>Ashirwad Palace, Swej Farm, Yamunapar, Laxminagar, Mathura, Uttar Pradesh</span>
              </li>
              <li className="flex items-center gap-3">
                <span>+91 76684 09246</span>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-bold mb-6 text-amber-400">Our Locations</h4>
            <ul className="space-y-3">
              {['Mathura', 'Vrindavan', 'Gokul', 'Govardhan', 'Mahavan'].map((loc) => (
                <li key={loc}>
                  <Link href={`/brajbhoomi?location=${loc.toLowerCase()}`} className="text-sm opacity-90 hover:opacity-100 hover:text-amber-400 transition-colors">
                    {loc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-bold mb-6 text-amber-400">Map</h4>
            <div className="rounded-lg overflow-hidden border border-white/10 h-64 w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3521.0!2d77.6998269!3d27.5071311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19e9e9e9e9e9%3A0x0!2sAshirwad%20Palace%20Mathura!5e0!3m2!1sen!2sin!4v1640000000000"
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0 }}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6 text-sm opacity-90">
            <Link href="/terms-of-service" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
            <span className="hidden md:inline text-white/20">•</span>
            <Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
          </div>
          <p className="text-center text-sm opacity-60">© 2026 Asthawaani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
