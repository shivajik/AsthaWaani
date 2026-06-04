// Fixes Vercel ERR_REQUIRE_ESM for Next.js when the root package.json has
// "type": "module". The Vercel Node launcher uses require() on the built
// page.js files. Each page.js inherits the ESM type from the nearest
// parent package.json — which is the root one unless we override it.
//
// Next.js itself writes package.json files into some output directories
// (e.g. .next/server/app/*) declaring "type": "module" for app router
// pages, which re-breaks require() even if we only override .next/server.
//
// The robust fix: walk every directory under .next/server (and the
// standalone variant) and write/overwrite a package.json with
// { "type": "commonjs" }. This forces all emitted .js files to be
// treated as CommonJS so the Vercel launcher's require() works.
//
// Safe to run after every `next build`.
import { writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { resolve, join } from "node:path";

const roots = [".next/server", ".next/standalone/.next/server"];

function walk(dir) {
  // Write package.json in this directory
  const pkgPath = join(dir, "package.json");
  writeFileSync(pkgPath, JSON.stringify({ type: "commonjs" }) + "\n");

  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) walk(full);
  }
}

for (const dir of roots) {
  const full = resolve(process.cwd(), dir);
  if (!existsSync(full)) continue;
  walk(full);
  console.log("[fix-cjs-launcher] wrote package.json tree under", full);
}
