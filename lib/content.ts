import type {
  CommunityPillar,
  EbookChapter,
  EbookPainPoint,
  ProfileItem,
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
    desc: 'Buscas rotación y margen. Aprendes qué referencias se mueven rápido y cuáles se quedan meses en la vitrina.',
  },
  {
    title: 'El coleccionista sin postureo',
    desc: 'Pasas del elitismo de las joyerías tradicionales. Quieres hablar de calibres, precios de cierre y oportunidades con gente como tú.',
  },
];

export const communityPillars: CommunityPillar[] = [
  {
    iconName: 'handshake',
    title: 'Drops y trato directo sin intermediarios',
    desc: 'Las piezas salen primero en el canal de WhatsApp y Telegram, y tratas directamente con nosotros. Sin comisiones de plataforma.',
  },
  {
    iconName: 'shield',
    title: 'Radar anti-fakes y anti-Frankenstein',
    desc: 'Aprende a revisar un reloj antes de pagarlo: esferas repintadas, piezas aftermarket, calibres y documentación.',
  },
  {
    iconName: 'chart',
    title: 'Precios de cierre, no de escaparate',
    desc: 'Un precio de anuncio no es el precio al que se cierra la operación. Aquí comparamos las dos cosas.',
  },
  {
    iconName: 'book',
    title: 'Guías callejeras y herramientas',
    desc: 'Del ebook de 70 páginas a las apps y checklists que usamos cada semana para buscar y comparar piezas.',
  },
  {
    iconName: 'scale',
    title: 'Dónde comprar y dónde vender',
    desc: 'Subastas, ferias, Wallapop, Vinted, Chrono24 o grupos privados: cómo moverte en cada sitio sin que te la cuelen.',
  },
  {
    iconName: 'sparkles',
    title: 'Quedadas y comunidad',
    desc: 'Contenido en redes, preguntas abiertas y encuentros presenciales para hablar de relojes sin postureo.',
  },
];

export const ebookOutcomes: string[] = [
  'Evita timos, falsificaciones y relojes "Frankenstein" desde tu primera compra',
  'Aprende a detectar oportunidades por debajo del precio de mercado',
  'Conoce las 3 marcas clave para empezar con salida rápida (y cuáles esquivar)',
];

export const ebookChapters: EbookChapter[] = [
  {
    title: 'Cómo elegir bien sin comerte el tarro',
    desc: 'Un checklist claro de lo que tienes que mirar en un reloj antes de comprarlo. Nada de tecnicismos, solo lo que importa.',
  },
  {
    title: 'Las 3 marcas que todo revendedor debe conocer',
    desc: 'Hay muchas marcas, pero para empezar con fiabilidad y salida rápida solo necesitas tres. Con ejemplos.',
  },
  {
    title: 'Dónde encontrar oportunidades',
    desc: 'Ferias, plataformas, grupos privados… cómo y dónde se encuentran relojes a buen precio.',
  },
  {
    title: 'Historias reales de gente como tú',
    desc: 'Ejemplos de coleccionistas y revendedores que empezaron con poco presupuesto y cómo avanzaron.',
  },
  {
    title: 'Las apps y webs que usamos cada semana',
    desc: 'Las herramientas que usamos en Master Collections para buscar, comparar y calcular márgenes antes de comprar.',
  },
];

export const ebookPainPoints: EbookPainPoint[] = [
  {
    title: 'Pagaste de más y lo viste más barato a la semana',
    desc: 'Aprende a comparar el precio de cierre con el precio de anuncio y no pagues de más en tu primera compra.',
  },
  {
    title: '¿Un chollo… o un Frankenstein montado a piezas?',
    desc: 'Una checklist directa para distinguir un reloj original de uno tuneado con piezas aftermarket baratas.',
  },
  {
    title: 'Miras relojes sin saber cuál vale la pena',
    desc: 'Cómo filtrar rápido qué referencias se venden con facilidad y cuáles se quedan en el cajón.',
  },
];
