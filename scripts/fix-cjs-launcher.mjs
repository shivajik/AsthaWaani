// Fixes Vercel ERR_REQUIRE_ESM for Next.js when root package.json has
// "type": "module". The Vercel Node launcher uses require() on the
// built page.js files, which inherit ESM type from the nearest parent
// package.json. Writing a package.json with "type":"commonjs" inside
// .next/server/ overrides this so require() works correctly.
//
// Safe to run after every `next build`.
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const targets = [".next/server", ".next/standalone/.next/server"];

for (const dir of targets) {
  const full = resolve(process.cwd(), dir);
  if (!existsSync(full)) continue;
  const pkgPath = resolve(full, "package.json");
  writeFileSync(pkgPath, JSON.stringify({ type: "commonjs" }) + "\n");
  console.log("[fix-cjs-launcher] wrote", pkgPath);
}
