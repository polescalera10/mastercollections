import { Reveal } from './Reveal';

export function About() {
  return (
    <section className="border-y border-cream/10 bg-graphite/40">
      <div className="container-page grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
        {/* Foto real de Toni */}
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-cream/10 bg-ink">
            {/*
              TODO: cuando tengas la foto, sustituye el img por:
              import Image from 'next/image';
              <Image src="/toni.jpg" alt="Toni, fundador de Master Collections"
                     fill className="object-cover object-top" sizes="(max-width:1024px) 100vw, 40vw" />
              Y elimina el <img> placeholder de abajo.
            */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/placeholder-person.svg"
              alt="Foto de Toni — fundador de Master Collections (placeholder)"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1 text-xs text-muted backdrop-blur-sm">
              TODO: foto real de Toni
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <span className="eyebrow">Quién está detrás</span>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl">
              Hola, soy Toni.
            </h2>
            <div className="mt-5 space-y-4 text-lg text-cream/75">
              <p>
                Llevo años comprando, vendiendo y coleccionando relojes. He aprendido lo bueno y
                lo malo a base de equivocarme, y monté esta comunidad para que tú te ahorres los
                tropiezos.
              </p>
              <p>
                {/* TODO: 1-2 frases reales de Toni — su historia, qué reloj le enganchó,
                    por qué hace esto. Cuanto más concreto, más confianza. */}
                Aquí no vas a encontrar promesas de hacerte rico. Vas a encontrar criterio,
                gente que sabe y un sitio donde preguntar sin sentirte el novato.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
