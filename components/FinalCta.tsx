import { Reveal } from './Reveal';
import { TelegramButton } from './TelegramButton';
import { metricLabel, metrics } from '@/lib/site';

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink"
        style={{
          backgroundImage:
            'radial-gradient(80% 90% at 50% 120%, rgba(42,171,238,0.18) 0%, rgba(11,10,9,0) 60%), radial-gradient(70% 70% at 50% 0%, rgba(200,162,76,0.12) 0%, rgba(11,10,9,0) 60%)',
        }}
      />
      <div className="container-page flex min-h-[80vh] flex-col items-center justify-center py-24 text-center">
        <Reveal>
          <span className="eyebrow">Es gratis. Es ahora.</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            Únete a la comunidad y deja de comprar relojes a ciegas.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-lg text-cream/75">
            Compraventa segura, guías reales y gente que sabe. Entrar no cuesta nada y no te
            pedimos nada a cambio.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-9">
            <TelegramButton className="px-9 py-5 text-lg" />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-5 text-sm text-muted">
            <span className="font-semibold text-cream">+{metricLabel(metrics.telegramMembers)}</span>{' '}
            personas ya están dentro.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
