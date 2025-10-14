/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true, // ← esto debe estar
  },
};

module.exports = nextConfig;