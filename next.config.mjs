/**
 * Cabeceras de seguridad aplicadas a todas las rutas.
 * Nota: no se define una Content-Security-Policy completa porque los scripts
 * inline de Next.js exigirían nonces/hashes y romperían el render; se limita
 * a frame-ancestors (anti-clickjacking). HSTS no se añade aquí porque Netlify
 * ya la sirve por defecto en dominios con HTTPS.
 */
const securityHeaders = [
  // Evita que el navegador "adivine" content-types (mitiga XSS por sniffing).
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // No filtrar la URL completa a terceros al navegar fuera.
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Anti-clickjacking: nadie puede meter la web en un iframe externo.
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
  // La web no usa cámara, micro ni geolocalización.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // TODO: si las fotos reales se sirven desde un CDN/dominio externo,
    // añade aquí los remotePatterns correspondientes.
    // Miniaturas de los últimos vídeos de YouTube.
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' }],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
