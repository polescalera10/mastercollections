import Image from 'next/image';
import { Reveal } from './Reveal';
import { WhatsAppButton } from './WhatsAppButton';

export function About() {
  return (
    <section className="border-y border-cream/10 bg-graphite/60 py-14 sm:py-24">
      <div className="container-page grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* Composición visual Mobile-First: Retrato real de Toni + mesa de watch-trader */}
        <Reveal>
          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            <div className="relative col-span-7 aspect-[4/5] overflow-hidden rounded-2xl border border-cream/15 bg-ink">
              <Image
                src="/brand/toni.jpeg"
                alt="Toni Abella, fundador de Master Collections"
                fill
                sizes="(max-width: 1024px) 60vw, 30vw"
                className="object-cover object-center"
              />
              <span className="absolute bottom-2.5 left-2.5 rounded-lg border border-cream/15 bg-ink/85 px-2.5 py-1 font-mono text-[10px] font-bold text-gold backdrop-blur-sm">
                @TONIIABELLA
              </span>
            </div>

            <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
              <div className="relative flex-1 overflow-hidden rounded-2xl border border-cream/15 bg-ink">
                <Image
                  src="/images/street-trader.jpg"
                  alt="Mesa de trabajo y creación de contenido de Master Collections"
                  fill
                  sizes="(max-width: 1024px) 40vw, 20vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="rounded-2xl border border-gold/30 bg-ink p-3.5 sm:p-4">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-gold">
                  SIN CORBATA
                </span>
                <p className="mt-1 font-display text-xs font-bold leading-snug text-cream sm:text-sm">
                  Hablar claro en un sector que siempre fue cerrado.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div>
            <span className="eyebrow">QUIÉN ESTÁ DETRÁS</span>
            <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-cream sm:mt-4 sm:text-4xl">
              Soy Toni, y me paso el día entre relojes.
            </h2>
            <div className="mt-4 space-y-3.5 text-sm leading-relaxed text-muted sm:mt-5 sm:text-base">
              <p>
                La relojería siempre ha estado llena de puertas cerradas, señores con traje
                mirándote por encima del hombro y precios inflados. Yo entré desde abajo: comprando,
                vendiendo, equivocándome y aprendiendo qué vale de verdad cada pieza en la calle.
              </p>
              <p>
                Creé <strong className="font-semibold text-cream">Master Collections</strong> para
                modernizar el sector: grabarlo todo en redes, enseñar lo que nadie cuenta y montar
                una comunidad donde cualquier apasionado pueda comprar, vender y aprender sin que se
                la cuelen.
              </p>
            </div>

            <div className="mt-6 sm:mt-7">
              <WhatsAppButton
                label="Vente al canal de WhatsApp"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
