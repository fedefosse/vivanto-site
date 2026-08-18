const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true, // ← esto debe estar
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  turbopack: {
    root: path.resolve(__dirname), // fuerza a usar esta carpeta como raíz
  },
  async headers() {
    // Nota: no incluye Content-Security-Policy todavía — GTM (GTM-MNR25VQ3) inyecta
    // tags (GA4, y potencialmente otros) configurados en el propio panel de Tag Manager,
    // fuera de este repo. Un CSP mal calibrado podría romperlos en silencio. Agregar
    // Content-Security-Policy después de confirmar qué dominios usa el contenedor de GTM,
    // idealmente probando primero con Content-Security-Policy-Report-Only.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;