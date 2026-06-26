import type { ComponentType, SVGProps } from 'react';
import { Reveal } from './Reveal';
import {
  HandshakeIcon,
  BookIcon,
  ChartIcon,
  UsersIcon,
  ScaleIcon,
  ShieldCheckIcon,
} from './Icons';

type Value = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
};

const values: Value[] = [
  {
    Icon: HandshakeIcon,
    title: 'Compraventa entre miembros',
    desc: 'Compra y vende a gente de la comunidad, no a desconocidos. Menos sustos, mejores precios.',
  },
  {
    Icon: ShieldCheckIcon,
    title: 'Comprar sin que te la cuelen',
    desc: 'Cómo verificar un reloj y a un vendedor antes de soltar el dinero. La parte que nadie te cuenta.',
  },
  {
    Icon: BookIcon,
    title: 'Guías reales, no relleno',
    desc: 'Qué mirar en cada marca, qué papeles pedir y cómo no pagar de más. Sacado de la experiencia.',
  },
  {
    Icon: ChartIcon,
    title: 'Análisis de mercado',
    desc: 'Qué sube, qué baja y por qué. Para que compres con criterio y vendas en el momento bueno.',
  },
  {
    Icon: ScaleIcon,
    title: 'Comparativas de plataformas',
    desc: 'Chrono24, Wallapop, Vinted, Catawiki: dónde conviene comprar o vender según el reloj.',
  },
  {
    Icon: UsersIcon,
    title: 'Comunidad activa',
    desc: 'Gente que responde de verdad. Pregunta una duda y tendrás respuesta el mismo día.',
  },
];

export function Inside() {
  return (
    <section id="comunidad" className="border-y border-cream/10 bg-graphite/40">
      <div className="container-page py-20 sm:py-28">
        <Reveal>
          <span className="eyebrow">Dentro de la comunidad</span>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl">
            Lo que te llevas al entrar.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => {
            const { Icon } = v;
            return (
              <Reveal as="div" key={v.title} delay={(i % 3) * 0.07}>
                <article className="group h-full rounded-2xl border border-cream/10 bg-ink/40 p-7 transition-colors duration-200 hover:border-gold/40">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors duration-200 group-hover:bg-gold/20">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-serif text-lg font-semibold text-cream">{v.title}</h3>
                  <p className="mt-2 text-cream/70">{v.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
