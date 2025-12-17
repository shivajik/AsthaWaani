# Asthawaani - Spiritual CMS Website

## Overview

Asthawaani is a bilingual (English/Hindi) spiritual content platform born from Mathura-Vrindavan, designed to bring devotional wisdom to every home through digital satsang. The website features YouTube video integration, a gallery of spiritual content, and contact functionality. It's built as a CMS-driven spiritual website with future mobile app scalability in mind.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state management
- **Styling**: Tailwind CSS v4 with CSS variables for theming, using shadcn/ui component library (New York style)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Internationalization**: Custom context-based language provider supporting English and Hindi translations

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints under `/api/*` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod for runtime validation, drizzle-zod for schema generation

### Data Storage
- **Database**: PostgreSQL (configured via DATABASE_URL environment variable)
- **Schema Design**: Three main tables:
  - `users` - Basic user authentication
  - `youtube_channels` - YouTube channel metadata and sync tracking
  - `videos` - Cached YouTube video data with foreign key to channels
- **Migrations**: Drizzle Kit for database migrations (output to `/migrations`)

### Key Design Patterns
- **Monorepo Structure**: Client, server, and shared code in single repository
  - `/client` - React frontend application
  - `/server` - Express backend API
  - `/shared` - Shared types and database schema
- **Path Aliases**: `@/` for client code, `@shared/` for shared modules
- **Build Strategy**: Vite for frontend, esbuild for server bundling with selective dependency bundling for cold start optimization

### Content Management System (CMS)
- **Admin Panel**: Available at `/admin` with secure authentication
- **Default Admin**: admin@asthawaani.com / admin123 (change password after first login)
- **Features**:
  - Page Management: Create and edit static pages with bilingual content (English/Hindi)
  - Blog Posts: Full blog system with draft/publish workflow, SEO fields
  - Media Library: Cloudinary-powered image upload with optimization
  - YouTube Sync: Integration for fetching and caching channel videos
  - SEO Controls: Meta tags, OpenGraph, Twitter cards per page/post

### CMS Database Tables
- `admins` - CMS administrator accounts with hashed passwords
- `pages` - Static page content with bilingual support
- `posts` - Blog posts with status, SEO fields, featured images
- `media` - Cloudinary media assets with metadata
- `seo_meta` - SEO metadata for pages and posts
- `site_settings` - Global site configuration
- `session` - PostgreSQL session store for admin authentication

### Video Content
- **Sync Mechanism**: Manual sync endpoint (`POST /api/sync-youtube`) that fetches latest videos from configured YouTube channels
- **Static Assets**: Images served from `/attached_assets` directory

## External Dependencies

### Third-Party Services
- **YouTube Data API v3**: Used for fetching channel information and video metadata
  - Requires `YOUTUBE_API_KEY` environment variable
  - Service class: `server/youtube.service.ts`
- **Cloudinary**: Cloud-based image and media management
  - Requires `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` environment variables
  - Service class: `server/cloudinary.ts`

### Database
- **PostgreSQL**: Primary data store
  - Connection via `DATABASE_URL` environment variable
  - Uses `pg` driver with connection pooling

### UI Component Libraries
- **Radix UI**: Headless primitives for accessible components (dialogs, dropdowns, accordions, etc.)
- **shadcn/ui**: Pre-styled component collection built on Radix
- **Lucide React**: Icon library

### Deployment
- **Vercel**: Configured via `vercel.json` with:
  - SPA fallback routing for client-side navigation
  - API routes proxied to serverless functions
  - Static asset caching with immutable headers

### Development Tools
- **Replit Plugins**: Dev banner, cartographer, and runtime error overlay for Replit environment
- **Meta Images Plugin**: Custom Vite plugin for OpenGraph image handling