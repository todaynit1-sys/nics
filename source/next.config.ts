import type { NextConfig } from "next";

// STATIC_EXPORT=1 writes plain HTML/CSS/JS to out/ (see scripts/export-html.mjs).
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = isStaticExport
  ? { output: "export", images: { unoptimized: true } }
  : { output: "standalone" };

export default nextConfig;
