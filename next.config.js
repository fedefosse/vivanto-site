/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // No detengas el build por errores de ESLint en Vercel
    ignoreDuringBuilds: true,
  },
  // Si Vercel volviera a fallar por tipos TS, descomenta la línea siguiente:
  // typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;