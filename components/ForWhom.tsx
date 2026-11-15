import { profiles } from '@/lib/content';
import { Reveal } from './Reveal';

export function ForWhom() {
  return (
    <section className="container-page py-14 sm:py-24">
      <Reveal>
        <span className="eyebrow">PARA QUIÉN ES ESTO</span>
        <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold leading-tight tracking-tight text-cream sm:mt-4 sm:text-4xl">
          La relojería tradicional te mira por encima del hombro. Nosotros te abrimos la puerta.
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 md:grid-cols-3 sm:gap-5">
        {profiles.map((p, i) => (
          <Reveal as="div" key={p.title} delay={i * 0.06}>
            <article className="group flex h-full flex-col justify-between rounded-2xl border border-cream/10 bg-graphite p-5 transition-colors duration-200 hover:border-gold/50 sm:p-7">
              <div>
                <span className="inline-block rounded-md border border-gold/30 bg-gold/10 px-2 py-0.5 font-mono text-xs font-bold text-gold">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-cream sm:text-xl">
                  {p.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-base">
                  {p.desc}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
