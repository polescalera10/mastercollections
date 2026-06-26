/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // TODO: si las fotos reales se sirven desde un CDN/dominio externo,
    // añade aquí los remotePatterns correspondientes.
    remotePatterns: [],
  },
};

export default nextConfig;
