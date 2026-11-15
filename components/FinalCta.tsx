import { Reveal } from './Reveal';
import { WhatsAppButton } from './WhatsAppButton';
import { TelegramButton } from './TelegramButton';
import { socialProof } from '@/lib/site';

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-grid-pattern py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(80% 80% at 50% 100%, rgba(37,211,102,0.16) 0%, rgba(212,255,0,0.06) 45%, rgba(7,8,10,0) 75%)',
        }}
      />
      <div className="container-page">
        <div className="mx-auto max-w-3xl rounded-3xl border border-cream/15 bg-graphite/90 p-6 text-center shadow-2xl sm:p-12">
          <Reveal>
            <span className="eyebrow">GRATIS · SIN COMPROMISO</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight text-cream sm:mt-5 sm:text-4xl lg:text-5xl">
              Deja de mirar relojes desde fuera. Entra donde se cuecen los tratos.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:mt-4 sm:text-base">
              Piezas nuevas, avisos y criterio de calle directo en tu móvil. Entra al canal de
              WhatsApp o al grupo de Telegram: es gratis y te sales cuando quieras.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row">
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
          <Reveal delay={0.2}>
            <p className="mt-5 font-mono text-xs text-muted">
              {socialProof()
                .map((p) => `${p.value} ${p.label}`)
                .join(' · ')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
