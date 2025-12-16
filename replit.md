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

### Content Management
- **Video Content**: YouTube API integration for fetching and caching channel videos
- **Sync Mechanism**: Manual sync endpoint (`POST /api/sync-youtube`) that fetches latest videos from configured YouTube channels
- **Static Assets**: Images served from `/attached_assets` directory

## External Dependencies

### Third-Party Services
- **YouTube Data API v3**: Used for fetching channel information and video metadata
  - Requires `YOUTUBE_API_KEY` environment variable
  - Service class: `server/youtube.service.ts`

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