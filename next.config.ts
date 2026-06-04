import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // All /api/* requests are handled inside the Next.js app:
  // - app/api/*    -> dedicated route handlers (blog, contact, ...)
  // - pages/api/*  -> catch-all that mounts the legacy Express CMS app
  //   (admin auth, pages CMS, contact-info, ads, news-tickers, ...)
  //
  // The legacy Express app uses CommonJS-only deps. Since package.json
  // has `"type": "module"`, Next's bundled output gets treated as ESM
  // and any leftover `require(...)` call throws "require is not defined".
  // Mark these as external so they are resolved at runtime via require()
  // from node_modules instead of being inlined into the ESM bundle.
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
