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
} as const;

/**
 * Métricas. NO INVENTADAS.
 * Sustituye cada `null` por el número real. Mientras sea `null`, la cifra se
 * muestra como un placeholder visible y la métrica puede ocultarse si procede.
 */
export const metrics = {
  telegramMembers: 2000,
  youtubeSubscribers: 6500,
  operations: 5000,
  years: 10,
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
