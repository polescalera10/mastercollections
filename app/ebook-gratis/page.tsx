import type { Metadata } from 'next';
import Image from 'next/image';
import { Logo } from '@/components/Logo';
import { EbookForm } from '@/components/EbookForm';
import { Footer } from '@/components/Footer';
import { metricLabel, metrics, ebookTitle } from '@/lib/site';
import { ShieldCheckIcon, ChartIcon, ArrowRightIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Ebook gratis: cómo empezar en la compraventa de relojes | Master Collections',
  description:
    'Descarga gratis «No la cagues con tu primer reloj»: guía callejera y sin humo para empezar en el coleccionismo sin que te timen, te estafen o te arrepientas.',
  alternates: { canonical: '/ebook-gratis' },
};

/** Lo que el lector se lleva — teaser de resultados (no features). */
const outcomes = [
  'Evita timos y estafas desde tu primer reloj',
  'Detecta chollos con margen real de reventa',
  'Sabe qué 3 marcas mirar (y cuáles esquivar)',
];

/** Índice del ebook: capítulos reales. Lista numerada = sin huérfanos + autoridad. */
const chapters = [
  {
    title: 'Cómo elegir bien sin comerte el tarro',
    desc: 'Un checklist claro de lo que mirar en un reloj antes de comprarlo. Nada de tecnicismos, solo lo que importa.',
  },
  {
    title: 'Las 3 marcas que todo revendedor debe conocer',
    desc: 'Hay muchas marcas, pero para empezar con margen, fiabilidad y salida rápida solo necesitas tres. Con ejemplos reales.',
  },
  {
    title: 'Dónde encontrar chollos por debajo del mercado',
    desc: 'Ferias, plataformas, grupos privados… cómo y dónde se consiguen relojes que puedes revender con beneficio.',
  },
  {
    title: 'Historias reales de gente como tú',
    desc: 'Coleccionistas y revendedores que empezaron con poco y hoy tienen una colección o un ingreso extra cada mes.',
  },
  {
    title: 'Las apps y webs que usamos cada semana',
    desc: 'Las herramientas reales con las que buscamos, verificamos y calculamos márgenes antes de comprar.',
  },
];

/** Lo que nadie te cuenta — agitación del problema. */
const painPoints = [
  {
    title: 'Pagaste de más y lo viste 100 € más barato',
    desc: 'Aprende a analizar el precio real frente al precio humo, y deja de pagar el pato.',
  },
  {
    title: '¿Un chollo… o un Frankenstein a piezas?',
    desc: 'Una checklist para saber si compras algo de verdad o un reloj tuneado con piezas baratas.',
  },
  {
    title: 'Miras relojes sin saber cuál vale la pena',
    desc: 'Cómo filtrar rápido lo que tiene potencial de revalorización y lo que no.',
  },
];

function AuthorChip() {
  return (
    <div className="flex items-center gap-3">
      <span className="relative inline-block h-10 w-10 overflow-hidden rounded-full border border-gold/40">
        <Image src="/brand/toni.jpeg" alt="Toni, fundador de Master Collections" fill sizes="40px" className="object-cover" />
      </span>
      <span className="text-sm leading-tight text-muted">
        Escrito por <span className="font-medium text-cream">Toni</span>
        <br />
        Fundador de Master Collections
      </span>
    </div>
  );
}

export default function EbookPage() {
  return (
    <>
      <header className="container-page flex items-center justify-between py-5">
        <Logo />
        <a href="#form" className="btn-ghost hidden sm:inline-flex">
          Quiero el ebook
        </a>
      </header>

      <main>
        {/* HERO */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-ink"
            style={{
              backgroundImage:
                'radial-gradient(60% 50% at 50% 0%, rgba(200,162,76,0.16) 0%, rgba(11,10,9,0) 60%)',
            }}
          />
          <div className="container-page py-12 sm:py-16">
            {/* Titular a todo el ancho */}
            <div className="max-w-3xl">
              <span className="eyebrow">Ebook gratis · PDF · 70 páginas</span>
              <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.04] tracking-tight text-cream sm:text-5xl lg:text-6xl">
                No la cagues con tu primer reloj.
              </h1>
              <p className="mt-5 text-lg text-cream/75 sm:text-xl">
                Guía callejera (y sin humo) para empezar en el coleccionismo sin que te timen, te
                estafen o te arrepientas. Te la descargas al instante.
              </p>
            </div>

            {/* Portada + formulario, equilibrados */}
            <div className="mt-12 grid items-center gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-16">
              {/* Izquierda: portada + outcomes + prueba social + autor */}
              <div className="order-2 lg:order-1">
                <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start lg:flex-col lg:items-stretch xl:flex-row xl:items-center">
                  <div className="relative shrink-0">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-6 -z-10 rounded-full"
                      style={{ backgroundImage: 'radial-gradient(50% 50% at 50% 50%, rgba(200,162,76,0.22) 0%, rgba(11,10,9,0) 70%)' }}
                    />
                    <Image
                      src="/ebook/cover.png"
                      alt="Portada del ebook «No la cagues con tu primer reloj»"
                      width={1024}
                      height={1536}
                      priority
                      sizes="(max-width: 640px) 60vw, 240px"
                      className="w-48 max-w-full drop-shadow-2xl sm:w-56"
                    />
                  </div>

                  <ul className="space-y-3">
                    {outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2.5 text-cream/85">
                        <ShieldCheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-col gap-5 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <AuthorChip />
                  <p className="flex items-center gap-x-2 text-sm text-muted">
                    <span className="font-semibold text-cream">+{metricLabel(metrics.telegramMembers)}</span>
                    en Telegram
                    <span className="text-cream/30" aria-hidden="true">·</span>
                    <span className="font-semibold text-cream">+{metricLabel(metrics.youtubeSubscribers)}</span>
                    en YouTube
                  </p>
                </div>
              </div>

              {/* Derecha: tarjeta de formulario (punto de conversión) */}
              <div className="order-1 lg:order-2">
                <div
                  id="form"
                  className="relative scroll-mt-24 overflow-hidden rounded-2xl border border-cream/10 bg-graphite/70 p-6 shadow-2xl shadow-black/50 sm:p-8"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold" />
                  <h2 className="font-serif text-2xl font-semibold text-cream">Descárgalo gratis</h2>
                  <p className="mt-1.5 text-sm text-muted">
                    Déjanos dónde enviártelo y te lo bajas ahora mismo.
                  </p>
                  <div className="mt-6">
                    <EbookForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LO QUE VAS A APRENDER — índice numerado (autoridad, sin huérfanos) */}
        <section className="border-t border-cream/10 bg-graphite/40">
          <div className="container-page py-20 sm:py-24">
            <div className="mx-auto max-w-3xl">
              <span className="eyebrow">Lo que vas a aprender</span>
              <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl">
                Cinco capítulos, directos al grano.
              </h2>
              <p className="mt-3 text-cream/70">
                Sin humo, sin paja y con ejemplos reales. Esto es lo que te encuentras dentro:
              </p>

              <ol className="mt-10 divide-y divide-cream/10 border-y border-cream/10">
                {chapters.map((c, i) => (
                  <li key={c.title} className="flex gap-5 py-6 sm:gap-7">
                    <span className="font-serif text-3xl font-semibold leading-none text-gold sm:text-4xl">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-cream sm:text-xl">{c.title}</h3>
                      <p className="mt-1.5 text-cream/70">{c.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10">
                <a href="#form" className="btn-primary">
                  Quiero el ebook gratis
                  <ArrowRightIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* LO QUE NADIE TE CUENTA — agitación */}
        <section className="container-page py-20 sm:py-24">
          <span className="eyebrow">Lo que nadie te cuenta</span>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl">
            ¿Por qué la mayoría la caga al empezar?
          </h2>
          <p className="mt-3 max-w-xl text-cream/70">
            Muchos entran con ganas y salen con pérdidas, porque no sabían dónde se metían. Con este
            ebook no vas a ser uno más que pica.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {painPoints.map((p) => (
              <article key={p.title} className="h-full rounded-2xl border border-cream/10 bg-graphite/40 p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <ChartIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-serif text-lg font-semibold text-cream">{p.title}</h3>
                <p className="mt-2 text-cream/70">{p.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* QUIÉN ESTÁ DETRÁS — autoridad */}
        <section className="border-y border-cream/10 bg-graphite/40">
          <div className="container-page grid items-center gap-10 py-20 sm:py-24 lg:grid-cols-[0.6fr_1fr] lg:gap-16">
            <div className="mx-auto w-full max-w-xs">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-cream/10">
                <Image
                  src="/brand/toni.jpeg"
                  alt="Toni, fundador de Master Collections"
                  fill
                  sizes="(max-width: 1024px) 80vw, 320px"
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <span className="eyebrow">Conoce al que está detrás</span>
              <blockquote className="mt-5 font-serif text-2xl leading-snug text-cream sm:text-3xl">
                «Este ebook no lo he escrito para posturear, sino para que no te pase lo que me pasó
                a mí al empezar. Yo también me comí relojes chungos… hasta que aprendí a detectarlos
                antes de que fuera tarde.»
              </blockquote>
              <p className="mt-5 text-muted">— Toni, fundador de Master Collections</p>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="container-page py-20 text-center sm:py-24">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl">
            Descarga la guía y empieza a moverte como un pro.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-cream/70">
            Evita timos, pilla chollos y aprende a comprar bien desde tu primer reloj.
          </p>
          <div className="mt-8 flex justify-center">
            <a href="#form" className="btn-primary">
              Quiero el ebook gratis
              <ArrowRightIcon className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-4 text-xs text-muted">«{ebookTitle}» · por Toni, Master Collections</p>
        </section>
      </main>

      <Footer />
    </>
  );
}
