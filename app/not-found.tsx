import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-8xl font-serif font-bold text-amber-500 mb-4">404</h1>
        <h2 className="text-2xl font-serif font-bold text-[hsl(225,55%,35%)] mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-lg transition-colors">
            Go to Homepage
          </Link>
          <Link href="/blog" className="inline-flex items-center justify-center border border-[hsl(225,55%,35%)] text-[hsl(225,55%,35%)] hover:bg-[hsl(225,55%,35%)] hover:text-white font-bold px-8 py-3 rounded-lg transition-colors">
            Visit Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
