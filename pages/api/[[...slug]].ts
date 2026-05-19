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
import expressApp from '../../api/index';

export const config = {
  api: {
    // The Express app handles its own body parsing (express.json,
    // multer for multipart). Let raw bytes through.
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // `expressApp` is an Express Application, which is itself a Node
  // request handler `(req, res) => void`.
  return (expressApp as any)(req, res);
}