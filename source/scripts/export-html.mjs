// Builds a plain HTML version of the page that opens by double-clicking index.html
// and can be served as-is by GitHub Pages.
//
// The Next.js static export provides the rendered markup and CSS. The page's behaviour
// already lives in public/sites/nics/motion.js (plain JS), so the Next runtime scripts
// are simply dropped.
//
// Output (default: the repository root, one level above source/):
//   index.html          the page
//   assets/style.css    compiled styles (fonts and images resolved relative to it)
//   assets/motion.js    motion graphics and interactions
//   sites/nics/…        images and fonts
// Only these paths are replaced; everything else in the output folder is left alone.
//
// Usage: npm run export:html [-- <output dir>]

import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outDir = join(root, "out");
const target = resolve(root, process.argv[2] ?? "..");

execSync("npx next build", {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, STATIC_EXPORT: "1" },
});

let html = readFileSync(join(outDir, "index.html"), "utf8");

// One stylesheet, rewritten so its url()s point from assets/ to sites/.
const cssFiles = [...html.matchAll(/<link rel="stylesheet" href="\/_next\/static\/chunks\/([^"]+\.css)"[^>]*>/g)].map((m) => m[1]);
const css = cssFiles
  .map((name) => readFileSync(join(outDir, "_next/static/chunks", name), "utf8"))
  .join("\n")
  .replace(/url\((["']?)\/sites\//g, "url($1../sites/");

html = html
  // Next runtime: script tags (including the inline RSC payload), preloads, stylesheets.
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
  .replace(/<link rel="(?:preload|modulepreload)"[^>]*>/g, "")
  .replace(/<link rel="stylesheet"[^>]*>/g, "")
  // Root-absolute asset paths -> relative (images, fonts, app icons, manifest).
  .replace(/\b(src|href|srcSet)="\/sites\//g, '$1="./sites/')
  .replace(/href="\/manifest\.webmanifest"/g, 'href="./manifest.webmanifest"')
  .replace(/url\((["']?)\/sites\//g, "url($1./sites/")
  .replace("</head>", '<link rel="stylesheet" href="./assets/style.css"/></head>')
  .replace("</body>", '<script src="./assets/motion.js" defer></script></body>');

for (const generated of ["index.html", "assets", "sites", "manifest.webmanifest", "sw.js"]) {
  const path = join(target, generated);
  if (existsSync(path)) rmSync(path, { recursive: true });
}
mkdirSync(join(target, "assets"), { recursive: true });
writeFileSync(join(target, "index.html"), html);
writeFileSync(join(target, "assets/style.css"), css);
cpSync(join(outDir, "sites/nics/motion.js"), join(target, "assets/motion.js"));
cpSync(join(outDir, "sites"), join(target, "sites"), { recursive: true });
rmSync(join(target, "sites/nics/motion.js"));
// PWA: manifest + service worker at the site root (the worker's scope is its own folder).
// A fresh BUILD id makes installed apps drop the previous cache after each export.
cpSync(join(outDir, "manifest.webmanifest"), join(target, "manifest.webmanifest"));
const build = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
writeFileSync(join(target, "sw.js"), readFileSync(join(outDir, "sw.js"), "utf8").replace("__BUILD__", build));

const left = html.match(/(src|href)="\/(?!\/)[^"]*"/g) ?? [];
console.log(`\nStatic HTML written to ${target}`);
console.log(`Updated: index.html, assets/, sites/, manifest.webmanifest, sw.js (build ${build}; ${readdirSync(join(target, "sites/nics")).length} entries in sites/nics)`);
if (left.length) console.warn(`Root-absolute links left: ${left.join(" ")}`);
