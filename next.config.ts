import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Use the existing Express API as an external backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:5001/api/:path*'  // Dev: proxy to Express server
          : '/api/:path*',  // Prod: Vercel serverless functions handle it
      },
    ];
  },
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
