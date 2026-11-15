import type { WatchItem } from './types';

/**
 * DATOS FICTICIOS DE DEMOSTRACIÓN.
 * Piezas, precios y descripciones inventados para enseñar el catálogo y el panel
 * /admin. No son ofertas reales. Las imágenes son ilustraciones genéricas
 * (public/demo/*.svg, generadas con scripts/generate-demo-watches.mjs).
 *
 * Solo se cargan en el despliegue de demo (NEXT_PUBLIC_DEMO_MODE=true) y la primera
 * vez que el catálogo está vacío. Nunca en producción.
 */

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const channels = { web: true, telegram: true, whatsapp: true, telegramMessageId: null };

type Seed = Omit<WatchItem, 'createdAt' | 'publishedChannels'> & { ageMs: number };

const seeds: Seed[] = [
  {
    id: 'demo-001',
    slug: 'rolex-submariner-date-126610ln-demo-001',
    brand: 'Rolex',
    model: 'Submariner Date',
    reference: '126610LN',
    year: 2021,
    price: 13900,
    condition: 'Excelente',
    delivery: 'Full Set (Caja y papeles)',
    caseSizeMm: 41,
    movement: 'Automático',
    description:
      'Acero y bisel cerámico negro. Pulsera Oyster con todos los eslabones. Sin pulidos agresivos, cristal impecable.',
    images: ['/demo/watch-diver-black.svg'],
    status: 'disponible',
    featured: true,
    ageMs: HOUR,
  },
  {
    id: 'demo-002',
    slug: 'omega-speedmaster-professional-moonwatch-demo-002',
    brand: 'Omega',
    model: 'Speedmaster Professional Moonwatch',
    reference: '310.30.42.50.01.001',
    year: 2020,
    price: 5400,
    condition: 'Muy bueno',
    delivery: 'Full Set (Caja y papeles)',
    caseSizeMm: 42,
    movement: 'Cuerda manual',
    description:
      'El cronógrafo de referencia. Calibre de cuerda manual, cristal Hesalite y correa de cuero negra.',
    images: ['/demo/watch-chrono-black.svg'],
    status: 'disponible',
    featured: true,
    ageMs: DAY,
  },
  {
    id: 'demo-003',
    slug: 'tudor-black-bay-58-79030n-demo-003',
    brand: 'Tudor',
    model: 'Black Bay 58',
    reference: '79030N',
    year: 2019,
    price: 2950,
    condition: 'Excelente',
    delivery: 'Solo reloj',
    caseSizeMm: 39,
    movement: 'Automático',
    description:
      'Formato 39 mm que sienta de lujo en muñecas medianas. Bisel burdeos y correa de cuero marrón. Se vende sin caja ni papeles.',
    images: ['/demo/watch-heritage-burgundy.svg'],
    status: 'disponible',
    featured: true,
    ageMs: 2 * DAY,
  },
  {
    id: 'demo-004',
    slug: 'cartier-santos-de-cartier-wssa0029-demo-004',
    brand: 'Cartier',
    model: 'Santos de Cartier',
    reference: 'WSSA0029',
    year: 2022,
    price: 6200,
    condition: 'Nuevo / Sin uso',
    delivery: 'Full Set (Caja y papeles)',
    caseSizeMm: 40,
    movement: 'Automático',
    description:
      'Esfera blanca y caja cuadrada en acero. Sin usar, con película protectora de fábrica. Reservado por un miembro de la comunidad.',
    images: ['/demo/watch-square-white.svg'],
    status: 'reservado',
    featured: false,
    ageMs: 3 * DAY,
  },
  {
    id: 'demo-005',
    slug: 'seiko-presage-cocktail-time-srpb43j1-demo-005',
    brand: 'Seiko',
    model: 'Presage Cocktail Time',
    reference: 'SRPB43J1',
    year: 2021,
    price: 290,
    condition: 'Muy bueno',
    delivery: 'Solo caja',
    caseSizeMm: 41,
    movement: 'Automático',
    description:
      'Esfera turquesa con acabado sunburst. Ideal como primer automático sin dejarte media nómina. Incluye caja, sin papeles.',
    images: ['/demo/watch-dress-teal.svg'],
    status: 'disponible',
    featured: false,
    ageMs: 5 * DAY,
  },
  {
    id: 'demo-006',
    slug: 'grand-seiko-snowflake-sbga211-demo-006',
    brand: 'Grand Seiko',
    model: 'Snowflake',
    reference: 'SBGA211',
    year: 2019,
    price: 4850,
    condition: 'Excelente',
    delivery: 'Full Set (Caja y papeles)',
    caseSizeMm: 41,
    movement: 'Automático',
    description:
      'Esfera texturizada tipo nieve y movimiento Spring Drive. Vendido en la comunidad la semana pasada.',
    images: ['/demo/watch-snowflake-silver.svg'],
    status: 'vendido',
    featured: false,
    ageMs: 9 * DAY,
  },
];

export function buildDemoWatches(now = Date.now()): WatchItem[] {
  return seeds.map(({ ageMs, ...rest }) => ({
    ...rest,
    createdAt: new Date(now - ageMs).toISOString(),
    publishedChannels: { ...channels },
  }));
}
