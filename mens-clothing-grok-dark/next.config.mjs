/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Keep using native <img> tags exactly as before — no next/image forced conversion
    unoptimized: true,
  },
};

export default nextConfig;
