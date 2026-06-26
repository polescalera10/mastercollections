/**
 * Preguntas frecuentes. Fuente única: la usa el acordeón visible y el
 * structured data FAQPage (JSON-LD) para SEO. Mantén respuestas honestas y breves.
 */

export type FaqItem = {
  question: string;
  /** Respuesta en texto plano (para el schema) y como nodo visible. */
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: '¿Es gratis de verdad?',
    answer:
      'Sí. Entrar al grupo de Telegram no cuesta nada y no te pedimos tarjeta. Es una comunidad abierta de gente que compra, vende y aprende de relojes.',
  },
  {
    question: '¿Tengo que comprar algo para estar dentro?',
    answer:
      'No. Puedes entrar solo a aprender y mirar. Mucha gente está meses leyendo y preguntando antes de hacer su primera operación. Sin presión y sin cuotas.',
  },
  {
    question: '¿Cómo se compra y se vende de forma segura?',
    answer:
      'Compartimos las pautas que usamos para no llevarnos sustos: cómo verificar un reloj y a un vendedor, qué fotos y papeles pedir, y qué plataformas conviene según el caso (Chrono24, Wallapop, Vinted, Catawiki). El objetivo es que no te la cuelen.',
  },
  {
    question: '¿Para quién NO es esto?',
    answer:
      'Si buscas hacerte rico rápido o un esquema de inversión garantizada, este no es tu sitio. Aquí se habla de relojes con criterio: aprender, comprar bien y vender mejor. Honestidad por delante.',
  },
  {
    question: '¿Necesito saber mucho de relojes para entrar?',
    answer:
      'No. Hay desde gente que empieza con su primer reloj hasta coleccionistas con años de recorrido. Preguntar lo básico está bien visto: para eso está la comunidad.',
  },
  {
    question: '¿Qué pasa en Telegram que no veo en YouTube?',
    answer:
      'YouTube es la parte pública: análisis y vídeo. En el grupo pasa lo bueno en directo: oportunidades de compraventa entre miembros, dudas resueltas al momento y conversación diaria con gente que sabe.',
  },
];
