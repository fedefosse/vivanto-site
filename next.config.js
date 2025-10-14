const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true, // ← esto debe estar
  },
  turbopack: {
    root: path.resolve(__dirname), // fuerza a usar esta carpeta como raíz
  },
};

module.exports = nextConfig;