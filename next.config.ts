import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Force single canonical URL shape (no trailing slash) so Google does
  // not see /page and /page/ as two different URLs (duplicate-canonical fix).
  trailingSlash: false,
  // All /api/* requests are handled inside the Next.js app:
  // - app/api/*    -> dedicated route handlers (blog, contact, ...)
  // - pages/api/*  -> catch-all that mounts the legacy Express CMS app
  //   (admin auth, pages CMS, contact-info, ads, news-tickers, ...)
  //
  // The legacy Express app uses CommonJS-oriented deps. Keep them external
  // so the production runtime resolves them from node_modules instead of
  // inlining brittle server-only code into route bundles.
  serverExternalPackages: [
    'express',
    'express-session',
    'express-rate-limit',
    'connect-pg-simple',
    'multer',
    'pg',
    'drizzle-orm',
    'cloudinary',
    'nodemailer',
    'bcryptjs',
    'sanitize-html',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'www.asthawaani.com' },
    ],
  },
  // Allow importing from the shared folder
  transpilePackages: [],
};

export default nextConfig;
