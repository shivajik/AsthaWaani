/**
 * Post-build prerender script.
 * 
 * Launches a local server, visits each route with Puppeteer,
 * captures the fully-rendered HTML (with meta tags from react-helmet-async),
 * and saves it as the static HTML file for that route.
 * 
 * Usage: npx tsx script/prerender.ts
 * Run AFTER `npm run build` completes.
 */

import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import express from 'express';

const DIST_DIR = join(process.cwd(), 'dist', 'public');
const PORT = 4567;

// All routes to prerender
const ROUTES = [
  '/',
  '/about',
  '/services',
  '/brajbhoomi',
  '/blog',
  '/videos',
  '/gallery',
  '/contact',
  '/community',
  '/join-partners',
  '/apply-vakta',
  '/terms-of-service',
  '/privacy-policy',
];

async function startServer(): Promise<ReturnType<typeof createServer>> {
  const app = express();
  
  // Serve static files from dist/public
  app.use(express.static(DIST_DIR));
  
  // SPA fallback
  app.get('*', (req, res) => {
    res.sendFile(join(DIST_DIR, 'index.html'));
  });

  return new Promise((resolve) => {
    const server = app.listen(PORT, () => {
      console.log(`  📡 Preview server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function prerenderRoute(browser: any, route: string): Promise<void> {
  const page = await browser.newPage();
  
  try {
    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: 'networkidle0',
      timeout: 15000,
    });

    // Wait a bit for react-helmet-async to update the head
    await page.waitForFunction(() => {
      const title = document.title;
      return title && title !== 'Asthawaani' && title.length > 5;
    }, { timeout: 5000 }).catch(() => {
      // If title doesn't change (e.g., homepage might keep default), continue anyway
    });

    // Get the full rendered HTML
    const html = await page.content();

    // Determine output path
    let outputPath: string;
    if (route === '/') {
      outputPath = join(DIST_DIR, 'index.html');
    } else {
      // Create directory structure: /about -> /about/index.html (for clean URLs)
      // But for Vercel, we just overwrite the main index.html approach
      // Actually for Vercel SPA, we save as /about.html
      const cleanRoute = route.replace(/^\//, '');
      outputPath = join(DIST_DIR, `${cleanRoute}.html`);
      
      // Also save as directory/index.html for compatibility
      const dirPath = join(DIST_DIR, cleanRoute);
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
      }
      writeFileSync(join(dirPath, 'index.html'), html, 'utf-8');
    }

    writeFileSync(outputPath, html, 'utf-8');
    console.log(`  ✅ ${route}`);
  } catch (error: any) {
    console.error(`  ❌ ${route}: ${error.message}`);
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('\n🚀 Pre-rendering pages...\n');

  if (!existsSync(DIST_DIR)) {
    console.error('❌ dist/public not found. Run `npm run build` first.');
    process.exit(1);
  }

  const server = await startServer();
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const route of ROUTES) {
      await prerenderRoute(browser, route);
    }
  } finally {
    await browser.close();
    server.close();
  }

  console.log(`\n✨ Pre-rendered ${ROUTES.length} pages!\n`);
  console.log('The HTML files now contain full meta tags in the source.\n');
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
