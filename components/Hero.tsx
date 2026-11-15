import Image from 'next/image';
import { Reveal } from './Reveal';
import { WhatsAppButton } from './WhatsAppButton';
import { TelegramButton } from './TelegramButton';
import { metricLabel, metrics } from '@/lib/site';

/**
 * HERO Mobile-First con estética rebelde, joven y street-horology.
 * Promociona el Canal/Grupo de WhatsApp como canal #1 de la comunidad.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-grid-pattern pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      {/* Glow verde/volt sutil de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px]"
        style={{
          backgroundImage:
            'radial-gradient(75% 60% at 50% 0%, rgba(37, 211, 102, 0.14) 0%, rgba(212, 255, 0, 0.06) 45%, rgba(7, 8, 10, 0) 80%)',
        }}
      />

      <div className="container-page">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          {/* Columna de texto (Mobile-First) */}
          <div>
            <Reveal>
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-gold/30 bg-graphite/90 px-3 py-1">
                <span className="h-2 w-2 animate-pulse rounded-full bg-action" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-gold">
                  RELOJERÍA SIN CORBATA · WATCH TRADING REAL
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-4 font-display text-[2.15rem] font-bold leading-[1.04] tracking-tight text-cream sm:mt-5 sm:text-5xl lg:text-6xl">
                Rompemos el sectarismo de los relojes.{' '}
                <span className="text-gold">Compra, vende y aprende</span> sin que te la cuelen.
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
                Un chaval de 30 años abriendo de par en par un sector cerrado. Drops reales, precios
                de calle, cero postureo y una comunidad donde compartimos todo.
              </p>
            </Reveal>

            {/* CTAs: WhatsApp #1 (primario), Telegram #2 (secundario) */}
            <Reveal delay={0.15}>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
                <WhatsAppButton
                  label="Entrar al grupo de WhatsApp"
                  className="w-full sm:w-auto"
                />
                <TelegramButton
                  label="Unirme a Telegram"
                  className="w-full sm:w-auto"
                />
              </div>
            </Reveal>

            {/* Chips de prueba social adaptados a móvil */}
            <Reveal delay={0.2}>
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className="rounded-lg border border-cream/10 bg-graphite px-2.5 py-1 font-mono text-[11px] text-cream">
                  100% GRATIS
                </span>
                <span className="rounded-lg border border-cream/10 bg-graphite px-2.5 py-1 font-mono text-[11px] text-cream">
                  +{metricLabel(metrics.youtubeSubscribers)} YouTube
                </span>
                <span className="rounded-lg border border-cream/10 bg-graphite px-2.5 py-1 font-mono text-[11px] text-cream">
                  +{metricLabel(metrics.tiktokFollowers)} TikTok
                </span>
                <span className="rounded-lg border border-cream/10 bg-graphite px-2.5 py-1 font-mono text-[11px] text-cream">
                  +{metricLabel(metrics.telegramMembers)} Comunidad
                </span>
              </div>
            </Reveal>
          </div>

          {/* Tarjeta visual del reloj (visible tanto en móvil como en desktop) */}
          <Reveal delay={0.12}>
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl border border-cream/15 bg-graphite shadow-2xl shadow-black/70">
                <Image
                  src="/images/hero-watch.jpg"
                  alt="Cronógrafo mecánico de acero sobre fibra de carbono con iluminación verde esmeralda"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover object-center"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"
                />

                {/* Overlay inferior tipo ticker / drop */}
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-xl border border-cream/15 bg-ink/85 px-3.5 py-2.5 backdrop-blur-md sm:inset-x-4 sm:bottom-4">
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-gold">
                      CANAL OFICIAL ACTIVO
                    </span>
                    <p className="truncate font-display text-xs font-bold text-cream sm:text-sm">
                      Drops, alertas de chollos y análisis en directo
                    </p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-action/20 px-2.5 py-1 font-mono text-[11px] font-semibold text-action">
                    LIVE
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
