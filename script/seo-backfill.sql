-- ============================================================
-- SEO Backfill Migration
-- ============================================================
-- Purpose: Ensure every DB-driven public surface (blog posts,
-- CMS pages, offerings) has populated meta_title / meta_description
-- / excerpt so the runtime <head> tags and JSON-LD always have
-- meaningful content instead of falling back to the page title.
--
-- Safe to re-run: every statement is idempotent (NULL or '' only).
-- ============================================================

-- ---------- 1. POSTS (blog) ------------------------------------
-- meta_title = title (capped at 60 chars) when missing
UPDATE posts
SET meta_title = LEFT(title, 60)
WHERE meta_title IS NULL OR meta_title = '';

-- excerpt: derive from first 200 chars of plain-text content
UPDATE posts
SET excerpt = LEFT(
  REGEXP_REPLACE(
    REGEXP_REPLACE(COALESCE(content, ''), '<[^>]+>', ' ', 'g'),
    '\s+', ' ', 'g'
  ),
  200
)
WHERE (excerpt IS NULL OR excerpt = '')
  AND content IS NOT NULL;

-- meta_description: prefer excerpt, then stripped content, cap 160
UPDATE posts
SET meta_description = LEFT(
  COALESCE(
    NULLIF(excerpt, ''),
    REGEXP_REPLACE(
      REGEXP_REPLACE(COALESCE(content, ''), '<[^>]+>', ' ', 'g'),
      '\s+', ' ', 'g'
    )
  ),
  160
)
WHERE meta_description IS NULL OR meta_description = '';

-- Hindi excerpt fallback from content_hi
UPDATE posts
SET excerpt_hi = LEFT(
  REGEXP_REPLACE(
    REGEXP_REPLACE(COALESCE(content_hi, ''), '<[^>]+>', ' ', 'g'),
    '\s+', ' ', 'g'
  ),
  200
)
WHERE (excerpt_hi IS NULL OR excerpt_hi = '')
  AND content_hi IS NOT NULL;

-- Ensure published posts have a published_at (sitemap lastmod uses it)
UPDATE posts
SET published_at = COALESCE(published_at, updated_at, created_at, NOW())
WHERE status = 'published' AND published_at IS NULL;

-- ---------- 2. PAGES (CMS) -------------------------------------
UPDATE pages
SET meta_title = LEFT(title, 60)
WHERE meta_title IS NULL OR meta_title = '';

UPDATE pages
SET meta_description = LEFT(
  REGEXP_REPLACE(
    REGEXP_REPLACE(COALESCE(content, title), '<[^>]+>', ' ', 'g'),
    '\s+', ' ', 'g'
  ),
  160
)
WHERE meta_description IS NULL OR meta_description = '';

-- ---------- 3. OFFERINGS ---------------------------------------
-- Keywords + description fallbacks (used by /services/[slug] hero copy)
UPDATE offerings
SET description = COALESCE(NULLIF(description, ''), subtitle, title)
WHERE description IS NULL OR description = '';

UPDATE offerings
SET keywords = LOWER(
  CONCAT(
    title, ', ',
    REPLACE(title, ' ', '-'), ', ',
    'vrindavan, mathura, satsang, bhajan, asthawaani'
  )
)
WHERE keywords IS NULL OR keywords = '';

-- ---------- 4. CATEGORIES --------------------------------------
UPDATE categories
SET description = CONCAT(
  'Read the latest ', name,
  ' articles, bhajans, and spiritual stories from Asthawaani.'
)
WHERE description IS NULL OR description = '';

-- ---------- 5. SEO_META rollup ---------------------------------
-- Seed/refresh seo_meta rows for every published post so the
-- runtime can read OG/Twitter/JSON-LD overrides from one table.
INSERT INTO seo_meta (
  entity_type, entity_id,
  meta_title, meta_description,
  og_title, og_description, og_image,
  twitter_title, twitter_description, twitter_image,
  canonical_url, schema_type
)
SELECT
  'post', p.id,
  COALESCE(p.meta_title, p.title),
  COALESCE(p.meta_description, p.excerpt),
  COALESCE(p.meta_title, p.title),
  COALESCE(p.meta_description, p.excerpt),
  COALESCE(p.featured_image, 'https://www.asthawaani.com/opengraph.jpg'),
  COALESCE(p.meta_title, p.title),
  COALESCE(p.meta_description, p.excerpt),
  COALESCE(p.featured_image, 'https://www.asthawaani.com/opengraph.jpg'),
  CONCAT('https://www.asthawaani.com/blog/', p.slug),
  'BlogPosting'
FROM posts p
WHERE p.status = 'published'
  AND NOT EXISTS (
    SELECT 1 FROM seo_meta s
    WHERE s.entity_type = 'post' AND s.entity_id = p.id
  );

-- Done.