export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: '¿Entrar al canal de WhatsApp o Telegram es gratis de verdad?',
    answer:
      'Sí, 100% gratis. No cuesta nada ni te pedimos tarjeta. Es nuestra comunidad directa: publicamos piezas, resolvemos dudas y compartimos oportunidades.',
  },
  {
    question: '¿Qué diferencia hay entre el canal de WhatsApp y el de Telegram?',
    answer:
      'El canal de WhatsApp es de lectura: piezas nuevas, avisos y novedades sin ruido. En Telegram, además, hay un grupo abierto donde los miembros conversan entre ellos.',
  },
  {
    question: '¿Tengo que comprar algún reloj para estar dentro?',
    answer:
      'Para nada. Mucha gente entra primero a observar el mercado, aprender qué referencias merecen la pena y ver a qué precios se cierran las piezas antes de dar el paso.',
  },
  {
    question: '¿Cómo evitáis que me cuelen un fake o un reloj "Frankenstein"?',
    answer:
      'Enseñamos qué mirar: calibres, esferas repintadas, agujas aftermarket, holguras de brazalete y documentación. En cada ficha detallamos el estado y lo que incluye la pieza, y puedes preguntar lo que quieras antes de decidir. Como en cualquier compra de segunda mano, conviene revisar la pieza antes de pagarla.',
  },
  {
    question: '¿Necesito saber mucho o tener miles de euros para empezar?',
    answer:
      'No. Hay quien empieza con su primer automático de unos cientos de euros y quien colecciona piezas de mucho más valor. Aquí nadie te mira por encima del hombro.',
  },
];
