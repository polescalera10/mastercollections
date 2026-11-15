import type {
  CommunityPillar,
  EbookChapter,
  EbookPainPoint,
  ProfileItem,
  VideoItem,
} from './types';

/**
 * Contenido estructurado de Master Collections.
 * Tono: Joven, directo, transparente, callejero y disruptivo en un sector tradicional.
 */

export const profiles: ProfileItem[] = [
  {
    title: 'El que busca su primera pieza',
    desc: 'Quieres entrar en el mundo de los relojes sin pagar novatadas, sin comerte un fake y sabiendo qué compras.',
  },
  {
    title: 'El que mueve piezas (Trading)',
    desc: 'Buscas rotación, liquidez y margen real. Aprendes a detectar qué referencias se venden en 24h y cuáles son un ladrillo.',
  },
  {
    title: 'El coleccionista sin postureo',
    desc: 'Pasas del elitismo de las joyerías tradicionales. Quieres hablar de calibres, precios reales de cierre y oportunidades con gente como tú.',
  },
];

export const communityPillars: CommunityPillar[] = [
  {
    iconName: 'handshake',
    title: 'Drops y trato directo sin intermediarios',
    desc: 'Piezas que lanzamos primero en el canal de WhatsApp y Telegram. Sin comisiones absurdas de plataformas.',
  },
  {
    iconName: 'shield',
    title: 'Radar anti-fakes y anti-Frankenstein',
    desc: 'Te enseñamos a destripar un reloj antes de pagarlo: esferas repintadas, piezas aftermarket, calibres y documentación.',
  },
  {
    iconName: 'chart',
    title: 'Precios reales de calle (no de escaparate)',
    desc: 'Olvida los precios inflados de Chrono24. Aquí hablamos del precio real al que se cierran los tratos hoy.',
  },
  {
    iconName: 'book',
    title: 'Guías callejeras y herramientas',
    desc: 'Desde nuestro ebook de 70 páginas hasta las apps y checklists que usamos cada semana para cazar chollos.',
  },
  {
    iconName: 'scale',
    title: 'Dónde comprar y dónde vender',
    desc: 'Subastas, ferias, Wallapop, Vinted, Chrono24 o grupos privados: cómo moverte en cada terreno sin que te la cuelen.',
  },
  {
    iconName: 'sparkles',
    title: 'Eventos, quedadas y comunidad joven',
    desc: 'Rompemos el molde rancio de la relojería tradicional: contenido diario en redes, transparencia total y eventos presenciales.',
  },
];

export const featuredVideos: VideoItem[] = [
  {
    id: null,
    title: 'La verdad sobre comprar y vender relojes en 2026 (Sin humo)',
    tag: 'YouTube · Real Talk',
  },
  {
    id: null,
    title: 'Cómo cazar un reloj "Frankenstein" antes de soltar tu dinero',
    tag: 'Guía de calle',
  },
  {
    id: null,
    title: 'Chrono24 vs Wallapop vs Grupos Privados: dónde está el margen',
    tag: 'Watch Trading',
  },
];

export const ebookOutcomes: string[] = [
  'Evita timos, falsificaciones y relojes "Frankenstein" desde tu primera compra',
  'Detecta chollos por debajo de mercado con margen real de reventa',
  'Conoce las 3 marcas clave con liquidez y salida rápida (y cuáles esquivar)',
];

export const ebookChapters: EbookChapter[] = [
  {
    title: 'Cómo elegir bien sin comerte el tarro',
    desc: 'Un checklist claro de lo que tienes que mirar en un reloj antes de comprarlo. Nada de tecnicismos, solo lo que importa.',
  },
  {
    title: 'Las 3 marcas que todo revendedor debe conocer',
    desc: 'Hay muchas marcas, pero si quieres empezar con margen, fiabilidad y salida rápida solo necesitas tres. Con ejemplos reales.',
  },
  {
    title: 'Dónde encontrar chollos por debajo del mercado',
    desc: 'Ferias, plataformas, grupos privados… cómo y dónde se consiguen relojes que puedes revender con beneficio.',
  },
  {
    title: 'Historias reales de gente como tú',
    desc: 'Ejemplos de coleccionistas y revendedores que empezaron con poco y hoy tienen una colección o un ingreso extra cada mes.',
  },
  {
    title: 'Las apps y webs que usamos cada semana',
    desc: 'Las herramientas reales que usamos en Master Collections para buscar, verificar y calcular márgenes antes de comprar.',
  },
];

export const ebookPainPoints: EbookPainPoint[] = [
  {
    title: 'Pagaste de más y lo viste 100 € más barato',
    desc: 'Aprende a analizar el precio real de cierre frente al precio humo, y deja de pagar el pato en tu primera compra.',
  },
  {
    title: '¿Un chollo… o un Frankenstein montado a piezas?',
    desc: 'Una checklist directa para distinguir un reloj original de uno tuneado con piezas aftermarket baratas.',
  },
  {
    title: 'Miras relojes sin saber cuál vale la pena',
    desc: 'Cómo filtrar rápido qué referencias tienen liquidez y potencial de revalorización y cuáles son un pisapapeles.',
  },
];
