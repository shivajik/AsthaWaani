import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { getSessionConfig } from "./auth";
import cmsRoutes from "./cms-routes";

const app = express();

// Trust proxy for rate limiting and security headers in all environments
app.set('trust proxy', 1);

const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

// Session middleware for CMS authentication
app.use(getSessionConfig());

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

// CMS API routes
app.use("/api/cms", cmsRoutes);

// SEO routes - robots.txt
app.get('/robots.txt', (req, res) => {
  const robotsTxt = `# robots.txt for https://asthawaani.com

# Default rules for all crawlers
User-agent: *
Allow: /
Allow: /about
Allow: /services
Allow: /brajbhoomi
Allow: /blog
Allow: /videos
Allow: /gallery
Allow: /contact
Allow: /community
Disallow: /admin
Disallow: /api

# GPTBot - OpenAI crawler
User-agent: GPTBot
Allow: /
Allow: /about
Allow: /services
Allow: /brajbhoomi
Allow: /blog
Allow: /videos
Allow: /gallery
Allow: /contact
Allow: /community
Disallow: /admin
Disallow: /api

# ClaudeBot - Anthropic crawler
User-agent: ClaudeBot
Allow: /
Allow: /about
Allow: /services
Allow: /brajbhoomi
Allow: /blog
Allow: /videos
Allow: /gallery
Allow: /contact
Allow: /community
Disallow: /admin
Disallow: /api

# PerplexityBot - Perplexity AI crawler
User-agent: PerplexityBot
Allow: /
Allow: /about
Allow: /services
Allow: /brajbhoomi
Allow: /blog
Allow: /videos
Allow: /gallery
Allow: /contact
Allow: /community
Disallow: /admin
Disallow: /api

Sitemap: https://asthawaani.com/sitemap.xml
`;
  res.type('text/plain');
  res.send(robotsTxt);
});

// SEO routes - dynamic sitemap.xml
app.get('/sitemap.xml', async (req, res) => {
  try {
    const { storage: storageInstance } = await import("./storage");
    const publishedPosts = await storageInstance.getPublishedPosts();
    const allPages = await storageInstance.getAllPages();
    const publishedPages = allPages.filter(p => p.isPublished);

    const baseUrl = 'https://asthawaani.com';
    
    const staticRoutes = [
      { path: '/', priority: '1.0', changefreq: 'weekly' },
      { path: '/about', priority: '0.8', changefreq: 'monthly' },
      { path: '/services', priority: '0.8', changefreq: 'monthly' },
      { path: '/brajbhoomi', priority: '0.8', changefreq: 'monthly' },
      { path: '/blog', priority: '0.9', changefreq: 'daily' },
      { path: '/videos', priority: '0.7', changefreq: 'weekly' },
      { path: '/gallery', priority: '0.6', changefreq: 'weekly' },
      { path: '/contact', priority: '0.6', changefreq: 'monthly' },
      { path: '/community', priority: '0.6', changefreq: 'monthly' },
      { path: '/join-partners', priority: '0.5', changefreq: 'monthly' },
      { path: '/apply-vakta', priority: '0.5', changefreq: 'monthly' },
      { path: '/terms-of-service', priority: '0.3', changefreq: 'yearly' },
      { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    ];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    for (const route of staticRoutes) {
      const lastmod = new Date().toISOString().split('T')[0];
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${route.path}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="hi" href="${baseUrl}${route.path}" />\n`;
      xml += `  </url>\n`;
    }

    for (const post of publishedPosts) {
      const lastmod = post.updatedAt ? new Date(post.updatedAt).toISOString().split('T')[0] :
                      post.publishedAt ? new Date(post.publishedAt).toISOString().split('T')[0] :
                      new Date().toISOString().split('T')[0];
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/blog/${post.slug}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="hi" href="${baseUrl}/blog/${post.slug}" />\n`;
      xml += `  </url>\n`;
    }

    for (const page of publishedPages) {
      const lastmod = page.updatedAt ? new Date(page.updatedAt).toISOString().split('T')[0] :
                      new Date().toISOString().split('T')[0];
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/${page.slug}</loc>\n`;
      xml += `    <lastmod>${lastmod}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.6</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += '</urlset>';
    res.type('application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(503).set('Retry-After', '60').type('text/plain').send('Service temporarily unavailable');
  }
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
