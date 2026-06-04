// Defense-in-depth for Vercel/Next serverless output. Keep the source project
// as ESM for Next/TypeScript, then patch only the built server output because
// Vercel's Node launcher require()s built page.js files. If any generated
// subdirectory adds its own package.json, this script forces that nearest
// package scope back to CommonJS too.
//
// Next.js itself writes package.json files into some output directories
// (e.g. .next/server/app/*) declaring "type": "module" for app router
// pages, which re-breaks require() even if we only override .next/server.
//
// Walk every directory under .next/server (and the standalone variant) and
// write/overwrite a package.json with
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
