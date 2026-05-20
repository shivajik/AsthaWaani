// Catch-all Pages-Router API route that mounts the legacy Express CMS app.
// This is the single bridge that makes the entire existing /api/cms/*,
// /api/admin/*, /api/pages/:slug, /api/ads, /api/news-tickers, /api/categories,
// /api/offerings, /api/videos, /api/channel, /api/og, /api/sync-youtube
// surface available to the new Next.js front-end without rewriting 2500
// lines of Express handlers.
//
// More specific Next App-Router routes (e.g. app/api/contact, app/api/blog/*)
// take precedence over this catch-all, so they keep working as-is.
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    // The Express app handles its own body parsing (express.json,
    // multer for multipart). Let raw bytes through.
    bodyParser: false,
    externalResolver: true,
  },
};

// Lazily import the Express app so a module-load error in /api/index.ts
// can be reported in the response instead of crashing the whole serverless
// function (which Vercel surfaces as an opaque "500 Internal Server Error").
let expressAppPromise: Promise<any> | undefined;
function getExpressApp() {
  if (!expressAppPromise) {
    expressAppPromise = import('../../api/index').then((m) => m.default ?? m);
  }
  return expressAppPromise;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const expressApp = await getExpressApp();
    return (expressApp as any)(req, res);
  } catch (err) {
    console.error('[api catch-all] failed to load express app', err);
    res.status(500).json({ error: 'Internal Server Error', message: (err as Error)?.message });
  }
}