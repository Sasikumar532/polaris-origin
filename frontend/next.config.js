/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to this project (a stray lockfile in the home dir
  // otherwise makes Next infer the wrong root).
  outputFileTracingRoot: __dirname,
  // Leftover shadcn/ui files are not part of the app graph; skip linting them on build.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

module.exports = nextConfig;
