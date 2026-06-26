/**
 * Capturas de mensajes reales de miembros de la comunidad.
 *
 * Cómo añadir una captura:
 * 1. Guarda la imagen en /public/testimonials/ (p. ej. /public/testimonials/01.jpg)
 * 2. Cambia `src: null` por `src: '/testimonials/01.jpg'` en la entrada correspondiente.
 * 3. Añade un `alt` descriptivo del contenido del mensaje (por SEO y accesibilidad).
 *
 * Puedes añadir o quitar entradas según el número de capturas que tengas.
 */

export type Testimonial = {
  /** Ruta a la imagen en /public, o null mientras no esté disponible. */
  src: string | null;
  /** Texto alternativo breve describiendo el mensaje (p. ej. "Miembro agradece haber evitado una falsificación"). */
  alt: string;
};

export const testimonials: Testimonial[] = [
  // TODO: sustituir null por '/testimonials/01.jpg' cuando subas la captura
  { src: null, alt: 'Captura de mensaje de un miembro de la comunidad' },
  { src: null, alt: 'Captura de mensaje de un miembro de la comunidad' },
  { src: null, alt: 'Captura de mensaje de un miembro de la comunidad' },
  { src: null, alt: 'Captura de mensaje de un miembro de la comunidad' },
  { src: null, alt: 'Captura de mensaje de un miembro de la comunidad' },
  { src: null, alt: 'Captura de mensaje de un miembro de la comunidad' },
];
