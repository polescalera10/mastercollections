import type { NavItem, SiteMetrics } from './types';

/**
 * Configuración central del sitio.
 * Todos los enlaces reales y las métricas verificadas viven en este archivo
 * como única fuente de verdad (Single Source of Truth).
 */

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mastercollectionsclub.com'
).replace(/\/$/, '');

/**
 * Modo demo: despliegue de pruebas con datos ficticios. Muestra un aviso visible
 * y bloquea la indexación en buscadores (no debe competir con la web real).
 */
export const isDemo = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const links = {
  whatsapp: 'https://whatsapp.com/channel/0029Vb8lW8k2kNFnFV5F5P40',
  telegram: 'https://t.me/+ftxLu95f1scyZmZk',
  youtube: 'https://www.youtube.com/@MasterCollectionsClub',
  instagram: 'https://www.instagram.com/mastercollections_',
  tiktok: 'https://www.tiktok.com/@toniiabella',
} as const;

/** Navegación principal del sitio (Mobile-First). */
export const navItems: NavItem[] = [
  { href: '/relojes', label: 'Drops / Relojes' },
  { href: '/#comunidad', label: 'Comunidad' },
  { href: '/#contenido', label: 'Contenido' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/ebook-gratis', label: 'Ebook Gratis', highlight: true },
];

/** URL del ebook alojado en nuestra propia web. */
export const ebookPdf = '/ebook-master-collections.pdf';
export const ebookTitle = 'No la cagues con tu primer reloj';

/**
 * Métricas reales verificadas.
 * Cualquier métrica a `null` se oculta automáticamente en la UI (cumplimiento Directiva Omnibus).
 */
export const metrics: SiteMetrics = {
  telegramMembers: 2000,
  youtubeSubscribers: 6500,
  // TODO: confirmar con Toni la cifra real antes de mostrarla (@toniiabella es su cuenta personal).
  tiktokFollowers: null,
  operations: null,
  years: null,
};

/**
 * Devuelve la cifra formateada (es-ES) o un placeholder visible si aún es `null`.
 */
export function metricLabel(value: number | null, placeholder = '[dato]'): string {
  if (value === null) return placeholder;
  return new Intl.NumberFormat('es-ES').format(value);
}

/**
 * Formatea un precio en euros sin decimales (ej: 8.450 €).
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
    useGrouping: 'always',
  }).format(amount);
}

export const site = {
  name: 'Master Collections',
  legalName: 'Master Collections',
  founder: 'Toni Abella',
  description:
    'Relojería sin corbata y sin humo. Compra, vende y aprende de relojes con criterio real en nuestra comunidad de WhatsApp y Telegram.',
  locale: 'es-ES',
} as const;
