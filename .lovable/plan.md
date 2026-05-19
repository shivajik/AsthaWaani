
## Problem

The Next.js migration is incomplete in two ways:

1. **HI button is dead.** Every page (`app/page.tsx`, `app/about/page.tsx`, `app/services/page.tsx`, etc.) has its English copy hard-coded directly in JSX. There is no `LanguageProvider`, no Hindi strings, and no `/api/pages/[slug]` route. The DB already has bilingual rows in `pages` (`title`/`title_hi`, `content`/`content_hi`, etc.) and `contact_info` — they are just never read.
2. **Admin panel is missing.** The old Vite app has full admin UI under `client/src/pages/admin/*` and an Express CMS API in `server/cms-routes.ts`, but none of it was ported to Next.js. Only `app/api/blog/*` and `app/api/contact/*` exist.

## What I'll build

### Part A — Language switching from DB

1. **`LanguageProvider`** in `app/lib/language-context.tsx` — client context with `language` ('en'|'hi'), `setLanguage`, persisted to `localStorage`. Wrap `<body>` children in `app/layout.tsx`.
2. **Header HI button** wired to `setLanguage(language === 'en' ? 'hi' : 'en')`, label flips between `HI` / `EN`. Nav labels also translated via a small static dictionary (same as `client/src/lib/context.tsx`).
3. **Page content API** — add `app/api/pages/[slug]/route.ts` and `app/api/cms/public/contact-info/route.ts` (ports of the existing Express handlers in `server/cms-routes.ts`) using the existing Drizzle `db` from `app/lib/db.ts`.
4. **Convert content pages to client components that fetch + render bilingual content.** Pages to convert:
   - `app/page.tsx` (home) — hero, about preview, offerings, locations
   - `app/about/page.tsx`
   - `app/services/page.tsx`
   - `app/brajbhoomi/page.tsx`
   - `app/contact/page.tsx` (and `ContactForm.tsx` labels)
   - `app/gallery/page.tsx`
   - `app/videos/page.tsx`
   - `app/privacy-policy/page.tsx`
   - `app/terms-of-service/page.tsx`
   - `app/community/page.tsx`, `app/join-partners/page.tsx`, `app/apply-vakta/page.tsx` (form labels only)
   - `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` (use existing `title_hi`/`content_hi` columns)
   - `app/components/Header.tsx`, `app/components/Footer.tsx` (nav + footer strings)

   Strategy: keep SEO metadata on the server, render the page body in a `'use client'` child that calls `useLanguage()` and either (a) pulls from a small inline EN/HI dictionary for static marketing copy, or (b) fetches the matching row from `/api/pages/[slug]` for CMS-managed pages and renders `title`/`content` vs `titleHi`/`contentHi`.

### Part B — Admin panel

5. **Admin auth API** — port `/api/admin/login`, `/api/admin/me`, `/api/admin/logout` from `server/cms-routes.ts` to `app/api/admin/*/route.ts`, reusing `server/auth.ts` (bcrypt + JWT cookie).
6. **CMS CRUD APIs** — port the rest of `cms-routes.ts` to `app/api/cms/*` route handlers: `pages`, `posts`, `categories`, `videos`, `offerings`, `ads`, `media`, `contact-info`, `news-tickers`, `site-settings`, `vakta-applications`, `contacts`, `seo-meta`. Same Drizzle queries, same Zod validation.
7. **Admin UI routes** — create `app/admin/page.tsx` (login + dashboard shell) and `app/admin/[...section]/page.tsx` that mounts the existing `client/src/pages/admin.tsx` + `client/src/pages/admin/contact-info.tsx` UIs as client components. Import paths get rewritten from `@/...` (Vite alias for `client/src`) to the new locations under `app/admin/_components`.
8. **Cloudinary / email / YouTube services** — copy `server/cloudinary.ts`, `server/email.service.ts`, `server/youtube.service.ts` into `app/lib/` so the new API routes can call them. Env vars (`CLOUDINARY_*`, `RESEND_API_KEY`, `YOUTUBE_API_KEY`) are read inside the handlers.

### Technical notes

- All new route handlers use `export const runtime = 'nodejs'` (Drizzle/pg needs Node).
- Existing `app/lib/db.ts` already exposes a Drizzle client — reused everywhere.
- Admin auth uses an `httpOnly` cookie set by the login route; middleware in `app/admin/layout.tsx` (server component) checks the JWT and redirects to `/admin` login when missing.
- I will NOT touch the visual design of any page — only swap hard-coded strings for `t(...)` / DB-driven fields.

### Scope check before I start

This is roughly ~30 new/modified files. Two things I want to confirm:

- **Static marketing strings on the home page** (hero, "What is Asthawaani", offerings list, locations list) — these aren't in the DB. OK to keep them as an inline EN/HI dictionary (matching how the old `client/src/lib/context.tsx` did it), right? Only the CMS-managed `pages` rows from the screenshot (about, contact, gallery, brajbhoomi, offerings, privacy, terms, home long-text) will come from the DB.
- **Admin credentials** — should I keep the existing `admins` table + bcrypt login flow from the old project untouched, so your existing admin user keeps working?

If both are "yes", I'll start with Part A (language + DB fetching) since that's what's user-visible, then Part B (admin) right after.
