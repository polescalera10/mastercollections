import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { JsonLd } from '@/components/JsonLd';
import { DemoBanner } from '@/components/DemoBanner';
import { isDemo, siteUrl } from '@/lib/site';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Master Collections | Relojería sin humo · Comunidad y Watch Trading',
  description:
    'La nueva generación de la relojería. Compra, vende y aprende de relojes sin corbata y sin que te la cuelen. Únete gratis a nuestro canal de WhatsApp y Telegram.',
  keywords: [
    'compraventa relojes',
    'relojes de segunda mano',
    'comunidad relojería',
    'invertir en relojes',
    'watch trading españa',
    'Master Collections',
    'Toni Abella',
  ],
  alternates: {
    canonical: '/',
  },
  // La demo nunca se indexa: no debe competir con la web real.
  robots: isDemo
    ? { index: false, follow: false }
    : {
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
    title: 'Master Collections | Relojería sin humo · Comunidad y Watch Trading',
    description:
      'Compra, vende y aprende de relojes sin que te la cuelen. Drops, precios de calle y comunidad activa en WhatsApp y Telegram.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Master Collections | Relojería sin humo',
    description:
      'Compra, vende y aprende de relojes sin que te la cuelen. Únete gratis al canal de WhatsApp.',
  },
  category: 'lifestyle',
};

export const viewport: Viewport = {
  themeColor: '#07080A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="overflow-x-hidden">
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-action focus:px-4 focus:py-2 focus:font-bold focus:text-ink"
        >
          Saltar al contenido
        </a>
        {children}
        <JsonLd />
        <DemoBanner />
      </body>
    </html>
  );
}
