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
  { href: '/relojes', label: 'Relojes' },
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
  return new Intl.NumberFormat('es-ES', { useGrouping: 'always' }).format(value);
}

/**
 * Cifras de prueba social ya formateadas ("+6.500"). Solo incluye las que tienen
 * dato real: nunca se pinta un placeholder en la web pública.
 */
export function socialProof(): { key: string; label: string; short: string; value: string }[] {
  const rows: { key: string; label: string; short: string; value: number | null }[] = [
    { key: 'youtube', label: 'en YouTube', short: 'YouTube', value: metrics.youtubeSubscribers },
    { key: 'tiktok', label: 'en TikTok', short: 'TikTok', value: metrics.tiktokFollowers },
    { key: 'telegram', label: 'en Telegram', short: 'Telegram', value: metrics.telegramMembers },
  ];
  return rows
    .filter((r): r is typeof r & { value: number } => r.value !== null)
    .map((r) => ({ key: r.key, label: r.label, short: r.short, value: `+${metricLabel(r.value)}` }));
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
    'Relojería sin corbata y sin humo. Compra, vende y aprende de relojes en nuestra comunidad gratuita de WhatsApp y Telegram.',
  locale: 'es-ES',
} as const;
