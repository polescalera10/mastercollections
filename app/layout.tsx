import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { JsonLd } from '@/components/JsonLd';
import { siteUrl } from '@/lib/site';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Master Collections | Comunidad de compraventa de relojes de segunda mano',
  description:
    'Compra, vende y aprende de relojes de segunda mano sin que te la cuelen. Comunidad gratuita de relojería: compraventa segura, guías reales y análisis de mercado.',
  keywords: [
    'compraventa relojes',
    'relojes de segunda mano',
    'comunidad relojería',
    'invertir en relojes',
    'comprar relojes seguro',
    'vender relojes',
  ],
  alternates: {
    canonical: '/',
  },
  // La home DEBE ser indexable: corrige el noindex de la web anterior.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: 'Master Collections',
    title: 'Master Collections | Comunidad de compraventa de relojes de segunda mano',
    description:
      'Compra, vende y aprende de relojes de segunda mano sin que te la cuelen. Comunidad gratuita: compraventa segura, guías reales y análisis de mercado.',
    images: [
      {
        // TODO: crear imagen OG dedicada 1200x630 y guardarla en /public/og.jpg
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Master Collections — comunidad de compraventa de relojes de segunda mano',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Master Collections | Comunidad de relojes de segunda mano',
    description:
      'Compra, vende y aprende de relojes de segunda mano sin que te la cuelen. Comunidad gratuita en Telegram.',
    images: ['/og.jpg'], // TODO: misma imagen OG dedicada
  },
  icons: {
    // TODO: añadir favicon real en /app/favicon.ico
    icon: '/favicon.ico',
  },
  category: 'lifestyle',
};

export const viewport: Viewport = {
  themeColor: '#0B0A09',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-action focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
