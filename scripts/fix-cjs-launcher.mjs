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
// Walk every directory under .next/server (and the standalone variant),
// write/overwrite a package.json with { "type": "commonjs" }, then add
// those package.json files to Next's .nft.json traces. The trace update is
// important on Vercel: files created after `next build` are otherwise not
// copied into each serverless function, so production falls back to the root
// package.json's { "type": "module" } and the CJS launcher crashes.
//
// Safe to run after every `next build`.
import { writeFileSync, existsSync, readdirSync, statSync, readFileSync } from "node:fs";
import { resolve, join, dirname, relative, sep } from "node:path";

const roots = [".next/server", ".next/standalone/.next/server"];
const writtenPackageFiles = [];
const shouldPatchRootPackage =
  process.env.PATCH_NEXT_RUNTIME_PACKAGE === "1" ||
  process.env.VERCEL === "1" ||
  Boolean(process.env.VERCEL_ENV);

function patchRootPackageForRuntime() {
  if (!shouldPatchRootPackage) return;

  const pkgPath = resolve(process.cwd(), "package.json");
  let pkg;
  try {
    pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  } catch (error) {
    console.warn("[fix-cjs-launcher] could not read root package.json", error);
    return;
  }

  if (pkg.type !== "commonjs") {
    pkg.type = "commonjs";
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    console.log("[fix-cjs-launcher] changed deployed package.json type to commonjs after build");
  }
}

function walk(dir) {
  // Write package.json in this directory
  const pkgPath = join(dir, "package.json");
  writeFileSync(pkgPath, JSON.stringify({ type: "commonjs" }) + "\n");
  writtenPackageFiles.push(pkgPath);

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

function collectNftFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) collectNftFiles(full, out);
    else if (entry.endsWith(".nft.json")) out.push(full);
  }
  return out;
}

function toTracePath(fromDir, file) {
  return relative(fromDir, file).split(sep).join("/");
}

function addPackagesToTraces(serverRoot) {
  const traceFiles = collectNftFiles(serverRoot);
  const packagesInRoot = writtenPackageFiles.filter((file) => file.startsWith(serverRoot + sep));

  for (const traceFile of traceFiles) {
    let trace;
    try {
      trace = JSON.parse(readFileSync(traceFile, "utf8"));
    } catch {
      continue;
    }
    if (!Array.isArray(trace.files)) continue;

    const traceDir = dirname(traceFile);
    const files = new Set(trace.files);
    for (const pkgFile of packagesInRoot) {
      files.add(toTracePath(traceDir, pkgFile));
    }
    trace.files = [...files].sort();
    writeFileSync(traceFile, JSON.stringify(trace, null, 2) + "\n");
  }

  console.log(`[fix-cjs-launcher] patched ${traceFiles.length} nft trace files under ${serverRoot}`);
}

for (const dir of roots) {
  const full = resolve(process.cwd(), dir);
  if (!existsSync(full)) continue;
  walk(full);
  addPackagesToTraces(full);
  console.log("[fix-cjs-launcher] wrote package.json tree under", full);
}

patchRootPackageForRuntime();
