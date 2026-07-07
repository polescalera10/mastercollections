/**
 * Configuración central del sitio.
 * Todos los enlaces reales y los datos pendientes viven aquí para que el dueño
 * pueda rellenar los placeholders en un único lugar.
 */

export const siteUrl = 'https://www.mastercollectionsclub.com';

export const links = {
  telegram: 'https://t.me/+ftxLu95f1scyZmZk',
  youtube: 'https://www.youtube.com/@MasterCollectionsClub',
  instagram: 'https://www.instagram.com/mastercollections_',
  // TikTok = perfil personal de Toni.
  tiktok: 'https://www.tiktok.com/@toniiabella',
} as const;

/** URL del ebook alojado en nuestra propia web (sustituye a la librería de WordPress). */
export const ebookPdf = '/ebook-master-collections.pdf';
export const ebookTitle = 'No la cagues con tu primer reloj';

/**
 * Métricas. NO INVENTADAS.
 * Sustituye cada `null` por el número real. Mientras sea `null`, la cifra se
 * muestra como un placeholder visible y la métrica puede ocultarse si procede.
 */
export const metrics: {
  telegramMembers: number | null;
  youtubeSubscribers: number | null;
  operations: number | null;
  years: number | null;
} = {
  telegramMembers: 2000,
  youtubeSubscribers: 6500,
  // TODO (Directiva Omnibus / competencia desleal): "operaciones" y "años" estaban
  // publicados sin fuente verificada (+5.000 / +10). Retirados de la UI el 2026-07-07.
  // Verificar con Pol/Toni el dato real antes de reactivar (basta con poner el número).
  operations: null,
  years: null,
};

/**
 * Devuelve la cifra formateada (es-ES) o un placeholder visible si aún es `null`.
 * Así nunca se muestra un número inventado.
 */
export function metricLabel(value: number | null, placeholder = '[dato]'): string {
  if (value === null) return placeholder;
  return new Intl.NumberFormat('es-ES').format(value);
}

export const site = {
  name: 'Master Collections',
  legalName: 'Master Collections',
  // TODO: nombre completo / marca registrada si la hay para el aviso legal.
  description:
    'Comunidad de compraventa y aprendizaje sobre relojes de segunda mano. Compra, vende y aprende sin que te la cuelen.',
  locale: 'es-ES',
} as const;
