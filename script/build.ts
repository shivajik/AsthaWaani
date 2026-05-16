import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, copyFile, readdir, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

// server deps to bundle to reduce openat(2) syscalls
// which helps cold start times
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  // Copy pre-rendered HTML files into dist/public for SEO
  const prerenderedDir = join(process.cwd(), "prerendered");
  const distPublic = join(process.cwd(), "dist", "public");
  if (existsSync(prerenderedDir)) {
    console.log("copying pre-rendered HTML files...");
    const files = await readdir(prerenderedDir);
    for (const file of files) {
      if (file.endsWith('.html') && file !== 'index.html') {
        // Copy about.html -> dist/public/about.html
        await copyFile(join(prerenderedDir, file), join(distPublic, file));
        
        // Also create directory version: about/index.html
        const dirName = file.replace('.html', '');
        const dirPath = join(distPublic, dirName);
        if (!existsSync(dirPath)) {
          await mkdir(dirPath, { recursive: true });
        }
        await copyFile(join(prerenderedDir, file), join(dirPath, 'index.html'));
      }
    }
    // Copy pre-rendered index.html (homepage) - overwrite the Vite-generated one
    if (existsSync(join(prerenderedDir, 'index.html'))) {
      await copyFile(join(prerenderedDir, 'index.html'), join(distPublic, 'index.html'));
    }
    console.log(`  copied ${files.length} pre-rendered pages`);
  }

  console.log("building server...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
