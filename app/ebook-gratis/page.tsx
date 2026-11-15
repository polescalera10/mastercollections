import type { Metadata } from 'next';
import Image from 'next/image';
import { Logo } from '@/components/Logo';
import { EbookForm } from '@/components/EbookForm';
import { Footer } from '@/components/Footer';
import { socialProof, ebookTitle } from '@/lib/site';
import { ebookChapters, ebookOutcomes, ebookPainPoints } from '@/lib/content';
import { ShieldCheckIcon, ChartIcon, ArrowRightIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Ebook Gratis: «No la cagues con tu primer reloj» | Master Collections',
  description:
    'Descarga gratis «No la cagues con tu primer reloj» (70 páginas): guía callejera y sin humo para empezar en la compraventa y coleccionismo de relojes.',
  alternates: { canonical: '/ebook-gratis' },
};

function AuthorChip() {
  return (
    <div className="flex items-center gap-3">
      <span className="relative inline-block h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-gold/40">
        <Image
          src="/brand/toni.jpeg"
          alt="Toni, fundador de Master Collections"
          fill
          sizes="40px"
          className="object-cover"
        />
      </span>
      <span className="text-xs leading-tight text-muted">
        Escrito por <span className="font-display font-bold text-cream">Toni Abella</span>
        <br />
        Fundador de Master Collections
      </span>
    </div>
  );
}

export default function EbookPage() {
  return (
    <>
      <header className="container-page flex items-center justify-between py-4 sm:py-5">
        <Logo />
        <a href="#form" className="btn-ghost px-4 py-2 text-xs sm:text-sm">
          Descargar gratis
        </a>
      </header>

      <main className="bg-grid-pattern">
        {/* HERO MOBILE-FIRST */}
        <section className="relative isolate overflow-hidden py-8 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage:
                'radial-gradient(65% 50% at 50% 0%, rgba(212,255,0,0.12) 0%, rgba(7,8,10,0) 65%)',
            }}
          />
          <div className="container-page">
            <div className="max-w-3xl">
              <span className="eyebrow">EBOOK GRATIS · PDF · 70 PÁGINAS</span>
              <h1 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-tight text-cream sm:mt-4 sm:text-5xl lg:text-6xl">
                No la cagues con tu primer reloj.
              </h1>
              <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg">
                Guía callejera (y sin humo) para entrar en la relojería y el watch trading sin que
                te timen, te cuelen un Frankenstein o pagues de más.
              </p>
            </div>

            <div className="mt-8 grid items-start gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-14">
              {/* Tarjeta de formulario (Primero en móvil para conversión inmediata) */}
              <div className="order-1 lg:order-2">
                <div
                  id="form"
                  className="relative scroll-mt-20 overflow-hidden rounded-2xl border border-cream/15 bg-graphite p-5 shadow-2xl shadow-black/60 sm:p-8"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-gold">
                    ACCESO INMEDIATO
                  </span>
                  <h2 className="mt-1 font-display text-xl font-bold text-cream sm:text-2xl">
                    Descárgalo gratis ahora
                  </h2>
                  <p className="mt-1 text-xs text-muted sm:text-sm">
                    Te lleva directo al PDF de 70 páginas nada más darle al botón.
                  </p>
                  <div className="mt-5">
                    <EbookForm />
                  </div>
                </div>
              </div>

              {/* Portada + Bullets + Autor */}
              <div className="order-2 lg:order-1">
                <div className="flex flex-col items-center gap-6 rounded-2xl border border-cream/10 bg-graphite/60 p-5 sm:flex-row sm:items-center sm:p-6">
                  <div className="relative shrink-0">
                    <Image
                      src="/ebook/cover.png"
                      alt="Portada del ebook «No la cagues con tu primer reloj»"
                      width={1024}
                      height={1536}
                      priority
                      sizes="(max-width: 640px) 160px, 200px"
                      className="w-36 max-w-full drop-shadow-2xl sm:w-44"
                    />
                  </div>

                  <ul className="space-y-3 text-sm">
                    {ebookOutcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2.5 text-cream/90">
                        <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-cream/10 bg-graphite/40 px-4 py-3.5">
                  <AuthorChip />
                  <p className="font-mono text-xs text-muted">
                    {socialProof().filter((p) => p.key !== 'telegram').map((p) => `${p.value} ${p.short}`).join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CAPÍTULOS */}
        <section className="border-t border-cream/10 bg-graphite/60 py-14 sm:py-20">
          <div className="container-page">
            <div className="mx-auto max-w-3xl">
              <span className="eyebrow">ÍNDICE DE CALLE</span>
              <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-cream sm:mt-4 sm:text-4xl">
                Cinco capítulos directos al grano.
              </h2>

              <ol className="mt-8 space-y-3 sm:mt-10">
                {ebookChapters.map((c, i) => (
                  <li
                    key={c.title}
                    className="flex items-start gap-4 rounded-2xl border border-cream/10 bg-ink p-4 sm:gap-6 sm:p-6"
                  >
                    <span className="rounded-lg border border-gold/30 bg-gold/10 px-2.5 py-1 font-mono text-sm font-bold text-gold">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-cream sm:text-lg">
                        {c.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{c.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8">
                <a href="#form" className="btn-primary w-full sm:w-auto">
                  <span>Quiero el ebook gratis</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* LO QUE NADIE TE CUENTA */}
        <section className="container-page py-14 sm:py-20">
          <span className="eyebrow">LA REALIDAD DEL MERCADO</span>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold leading-tight tracking-tight text-cream sm:mt-4 sm:text-4xl">
            ¿Por qué la mayoría palma pasta con su primer reloj?
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 md:grid-cols-3 sm:gap-5">
            {ebookPainPoints.map((p) => (
              <article
                key={p.title}
                className="h-full rounded-2xl border border-cream/10 bg-graphite p-5 sm:p-6"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                  <ChartIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-cream">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CITA DE TONI */}
        <section className="border-y border-cream/10 bg-graphite/60 py-14 sm:py-20">
          <div className="container-page grid items-center gap-8 lg:grid-cols-[0.45fr_1fr] lg:gap-12">
            <div className="mx-auto w-full max-w-[240px] sm:max-w-xs">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-cream/15">
                <Image
                  src="/brand/toni.jpeg"
                  alt="Toni, fundador de Master Collections"
                  fill
                  sizes="(max-width: 1024px) 240px, 320px"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <span className="eyebrow">POR QUÉ LO ESCRIBÍ</span>
              <blockquote className="mt-4 font-display text-xl font-bold leading-snug text-cream sm:text-3xl">
                «Este ebook no lo he escrito para posturear, sino para que no te pase lo que me pasó
                a mí al empezar. Yo también me comí relojes chungos… hasta que aprendí a detectarlos
                antes de soltar el dinero.»
              </blockquote>
              <p className="mt-4 font-mono text-xs text-gold">
                — TONI ABELLA · FUNDADOR DE MASTER COLLECTIONS
              </p>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="container-page py-14 text-center sm:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-2xl font-bold leading-tight tracking-tight text-cream sm:text-4xl">
            Bájate la guía y empieza a moverte con criterio.
          </h2>
          <div className="mt-6 flex justify-center">
            <a href="#form" className="btn-primary w-full sm:w-auto">
              <span>Descargar «{ebookTitle}»</span>
              <ArrowRightIcon className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
