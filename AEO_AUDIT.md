# AsthaWaani – AEO / SEO Implementation Audit

_Last reviewed: 2026-06-29_

Audit of the 12-phase AsthaWaani AI Search Optimization plan against the current production codebase. Status reflects what is **actually in the repository** today after this round of changes.

Legend: ✅ done · 🟡 partial · ❌ not started

---

## Phase 1 — Technical Files

| Item | Status | Where |
|---|---|---|
| `robots.txt` (allow public, block /admin & /api, sitemap ref) | ✅ | `app/robots.ts` (Next metadata route) |
| `sitemap.xml` (static + brajbhoomi + services + blog posts) | ✅ | `app/sitemap.ts` |
| `llms.txt` | ✅ refreshed | `public/llms.txt` |
| `llms-full.txt` | ✅ refreshed | `public/llms-full.txt` |
| `facts.json` | ✅ refreshed (v1.1: contact, social, location, RSS, audience, citation guidance) | `public/facts.json` |
| RSS feed (`/rss.xml`) | ✅ NEW | `app/rss.xml/route.ts` |

---

## Phase 2 — Structured Data (JSON-LD)

| Page | Schemas | Status |
|---|---|---|
| Homepage / sitewide | Organization, WebSite (SearchAction) | ✅ in `app/layout.tsx` |
| Service detail | Service, FAQPage, BreadcrumbList | ✅ NEW in `app/services/[slug]/page.tsx` |
| Blog post | BlogPosting, BreadcrumbList | ✅ NEW in `pages/blog/[slug].tsx` |
| Braj Bhoomi place | TouristDestination, BreadcrumbList | ✅ NEW in `app/brajbhoomi/[slug]/page.tsx` |
| Videos page | VideoObject (per video) | ❌ TODO — schema generator exists (`client/src/lib/schema-generator.ts`) but not wired into `app/videos/VideosClient.tsx` |
| About page | AboutPage / Person (editorial) | ❌ TODO |
| Glossary terms | DefinedTerm | ❌ TODO (page itself doesn't exist yet) |

---

## Phase 3 — Content Quality on Service Pages

| Item | Status |
|---|---|
| Intro / What is it / Why important / Benefits / Tradition | ✅ in `app/services/[slug]/content.ts` |
| FAQs (8–15 per service) | 🟡 each service has FAQs but counts vary — needs audit |
| Related Services / Articles / Videos | ✅ NEW (added related-links section) |
| 1500–2500 word length | 🟡 most under target |
| Call to action | ✅ existing footer CTA |

---

## Phase 4 — Internal Linking

| Link path | Status |
|---|---|
| Services ↔ Services (sibling) | ✅ sidebar + new Related Services |
| Services → Braj Bhoomi | ✅ NEW |
| Services → Blog / Videos / Community | ✅ NEW |
| Braj Bhoomi → Services | ✅ NEW |
| Braj Bhoomi ↔ Braj Bhoomi (sibling) | ✅ NEW |
| Blog post → Related posts | ❌ TODO |
| Videos → Services / Braj Bhoomi | ❌ TODO |

---

## Phase 5 — FAQ Coverage

| Service | FAQs present | Schema | 8–15 target |
|---|---|---|---|
| daily-satsang, katha-pravachan, bhajan-kirtan, jaap-mantras, navgrah-shanti, life-guidance, morning-aarti | ✅ | ✅ FAQPage schema emitted | 🟡 audit counts |

---

## Phase 6 — Author & Trust

| Item | Status |
|---|---|
| `/about` exists with Mission | ✅ |
| Editorial process section | ❌ TODO |
| `/author` page (Spiritual Guide profile) | ❌ TODO |
| Editorial standards section | ❌ TODO |

---

## Phase 7 — Glossary

| Item | Status |
|---|---|
| `/glossary` index | ❌ TODO |
| Terms: Aarti, Bhakti, Darshan, Dharma, Jaap, Karma, Moksha, Navgrah, Parikrama, Prasad, Pravachan, Satsang, Seva, Shraddha, Vrindavan | ❌ TODO |
| DefinedTerm schema per entry | ❌ TODO |

---

## Phase 8 — Image SEO

| Item | Status |
|---|---|
| Descriptive filenames in `attached_assets/` | 🟡 mixed — some descriptive, some `Pasted_xxx` |
| Alt text on `<Image>` | 🟡 most components set alt, full audit needed |
| Title attributes | ❌ inconsistent |
| Use Next `<Image>` with WebP | ✅ via `next/image` defaults |

---

## Phase 9 — Video SEO

| Item | Status |
|---|---|
| `/videos` listing | ✅ |
| VideoObject schema per video | ❌ TODO (generator function exists, not used) |
| Transcript per video | ❌ TODO |
| Description / thumbnail / duration in DB | 🟡 partial (duration sometimes missing) |

---

## Phase 10 — Performance / Core Web Vitals

| Item | Status |
|---|---|
| LCP < 2.5s | 🟡 not measured this round |
| CLS < 0.1 | 🟡 not measured |
| INP < 200ms | 🟡 not measured |
| Lazy loading + WebP via `next/image` | ✅ |
| Run PageSpeed Insights / Lighthouse CI | ❌ TODO |

---

## Phase 11 — Per-page Metadata

| Page | Title | Description | Canonical | OpenGraph | Twitter | OG image |
|---|---|---|---|---|---|---|
| `/` (sitewide defaults) | ✅ | ✅ | ✅ (Next metadataBase) | ✅ | ✅ | static `/opengraph.jpg` |
| `/about`, `/services`, `/brajbhoomi`, `/contact`, `/community`, `/privacy-policy`, `/terms-of-service` | ✅ | ✅ | ✅ | ✅ | ✅ | static |
| `/services/[slug]` | ✅ | ✅ | ✅ | ✅ | ✅ NEW | ✅ **dynamic OG image** NEW (`opengraph-image.tsx`) |
| `/brajbhoomi/[slug]` | ✅ | ✅ | ✅ | ✅ | ✅ NEW | ✅ **dynamic OG image** NEW |
| `/blog/[slug]` | ✅ | ✅ | ✅ | ✅ | ✅ | uses featured image or fallback |
| `/blog` index, `/videos`, `/gallery`, `/apply-vakta`, `/join-partners` | 🟡 | 🟡 | 🟡 | 🟡 | 🟡 | static |

---

## Phase 12 — File Sync

`robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `facts.json` are co-located in `public/` (or generated under `app/`) and rebuilt with every deploy. ✅

---

# What This Round Delivered

1. **WebSite JSON-LD** with SearchAction added to root layout.
2. **Service schema + BreadcrumbList** on every `/services/[slug]` page (alongside existing FAQPage).
3. **TouristDestination + BreadcrumbList** on every `/brajbhoomi/[slug]` page.
4. **BreadcrumbList** added to every blog post + RSS `<link rel="alternate">` head tag.
5. **Dynamic per-page OG images** for all services and all Braj Bhoomi pages (`opengraph-image.tsx` using `next/og`). No static fallback needed — Next picks them up automatically.
6. **Related-links section** on every service page (4 sibling services + 4 Braj places + blog/videos/community) and every Braj Bhoomi page (sibling places + 4 services + blog/videos/gallery/community).
7. **RSS 2.0 feed** at `/rss.xml` listing the 50 most recent published posts, cached 30 minutes.
8. **`facts.json` upgraded to v1.1** — added `contact`, `social`, `location`, `legal`, `audience`, `content_categories`, RSS, and `citation_guidance`. Removed non-existent service URLs (`/services/healing`, `/services/community`).
9. **`llms.txt` / `llms-full.txt` rewritten** in the cleaner uploaded structure, with only valid service URLs, RSS link added, bilingual + citation guidance.

---

# Ready-to-Use Task Form (remaining work)

Copy / paste the items you want me to ship next:

```
[ ] Videos page: emit VideoObject JSON-LD per video (wire schema-generator.ts into app/videos/VideosClient.tsx)
[ ] Blog post: add "Related Articles" block (same-category, 3–4 cards)
[ ] About page: add Editorial Process + Editorial Standards section + AboutPage schema
[ ] Create /author page with Person schema + Editorial Standards
[ ] Create /glossary index + 15 term pages (Aarti, Bhakti, Darshan, Dharma, Jaap, Karma, Moksha, Navgrah, Parikrama, Prasad, Pravachan, Satsang, Seva, Shraddha, Vrindavan) with DefinedTerm schema
[ ] Expand each service page to 1500–2500 words (pick which services to deepen first)
[ ] Standardize service FAQ counts to 8–15 each
[ ] Per-page OG images for: blog list, /videos, /gallery, /apply-vakta, /join-partners
[ ] Per-page meta titles/descriptions for: /blog, /videos, /gallery, /apply-vakta, /join-partners
[ ] Image SEO audit: rename non-descriptive files in attached_assets, add title attrs
[ ] Video transcripts (which 5–10 videos first?)
[ ] Run Lighthouse / PageSpeed Insights and fix LCP/CLS/INP regressions
[ ] Add Sitemap reference for /rss.xml in robots.ts
[ ] Add a "Related Braj Bhoomi places" block to blog posts that mention Mathura/Vrindavan/etc.
```

Tell me which boxes to tick and I'll ship them.
