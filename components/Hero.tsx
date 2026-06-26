import { Reveal } from './Reveal';
import { TelegramButton } from './TelegramButton';
import { metricLabel, metrics } from '@/lib/site';

/**
 * HERO. Contiene el único <h1> de la página.
 * Fondo: foto macro de reloj con overlay oscuro (ver TODO de imagen).
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/*
        TODO: cuando tengas la foto real, sustituye el <img> de abajo por:
        import Image from 'next/image';
        <Image src="/hero.jpg" alt="Detalle macro de la esfera de un reloj de segunda mano"
               fill priority sizes="100vw" className="object-cover object-center" />
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/placeholder-watch.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right"
      />
      {/* Overlay oscuro para legibilidad */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/70" />

      <div className="container-page flex min-h-[92vh] flex-col justify-center pb-20 pt-36 sm:pt-40">
        <Reveal>
          <span className="eyebrow">Relojes de segunda mano · Comunidad</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-cream sm:text-6xl lg:text-7xl">
            Compra, vende y aprende de relojes{' '}
            <span className="italic text-gold">sin que te la cuelen.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80 sm:text-xl">
            Una comunidad de gente que sabe de relojería. Aprende a comprar y vender seguro,
            entiende el mercado y rodéate de coleccionistas reales. Nada de humo.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <TelegramButton className="w-full sm:w-auto" />
          </div>
        </Reveal>

        {/* Prueba social inmediata bajo el CTA */}
        <Reveal delay={0.2}>
          <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" aria-hidden="true" />
            <span className="font-semibold text-cream">+{metricLabel(metrics.telegramMembers)}</span>
            miembros ya dentro
            <span className="text-cream/30" aria-hidden="true">·</span>
            <span className="font-semibold text-cream">+{metricLabel(metrics.youtubeSubscribers)}</span>
            suscriptores en YouTube
          </p>
        </Reveal>
      </div>
    </section>
  );
}
