import { Reveal } from './Reveal';

type Profile = {
  title: string;
  desc: string;
};

const profiles: Profile[] = [
  {
    title: 'El coleccionista',
    desc: 'Encuentra piezas, contrasta precios y vende a gente que valora lo que tiene entre manos.',
  },
  {
    title: 'El que invierte',
    desc: 'Aprende a leer el mercado de segunda mano y a comprar relojes que aguantan su valor.',
  },
  {
    title: 'El que empieza',
    desc: 'Da tus primeros pasos sin miedo: pregunta lo básico y compra tu primer reloj sin meter la pata.',
  },
];

export function ForWhom() {
  return (
    <section className="container-page py-20 sm:py-28">
      <Reveal>
        <span className="eyebrow">Para quién es</span>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl">
          Si te gustan los relojes, este es tu sitio.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {profiles.map((p, i) => (
          <Reveal as="div" key={p.title} delay={i * 0.08}>
            <article className="group h-full rounded-2xl border border-cream/10 bg-graphite/40 p-7 transition-colors duration-200 hover:border-gold/40">
              <span className="font-serif text-sm text-gold">0{i + 1}</span>
              <h3 className="mt-3 font-serif text-xl font-semibold text-cream">{p.title}</h3>
              <p className="mt-3 text-cream/70">{p.desc}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
