import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // cap generated sizes: sources are ≤2000px wide, so 3840w variants only upscale (and slow the first load)
  images: { deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2048] },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
