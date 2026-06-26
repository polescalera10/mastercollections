import type { Metadata } from 'next';
import Image from 'next/image';
import { Logo } from '@/components/Logo';
import { EbookForm } from '@/components/EbookForm';
import { Footer } from '@/components/Footer';
import { metricLabel, metrics, ebookTitle } from '@/lib/site';
import {
  ShieldCheckIcon,
  ChartIcon,
  ScaleIcon,
  BookIcon,
  HandshakeIcon,
  UsersIcon,
  ArrowRightIcon,
} from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Ebook gratis: cómo empezar en la compraventa de relojes | Master Collections',
  description:
    'Descarga gratis «No la cagues con tu primer reloj»: guía callejera y sin humo para empezar en el coleccionismo sin que te timen, te estafen o te arrepientas.',
  alternates: { canonical: '/ebook-gratis' },
};

const inside = [
  {
    Icon: ShieldCheckIcon,
    title: 'Cómo elegir bien sin comerte el tarro',
    desc: 'Un checklist claro de lo que mirar en un reloj antes de comprarlo. Nada de tecnicismos, solo lo que importa.',
  },
  {
    Icon: ScaleIcon,
    title: 'Las 3 marcas que todo revendedor debe conocer',
    desc: 'Hay muchas marcas, pero para empezar con margen, fiabilidad y salida rápida solo necesitas tres. Con ejemplos reales.',
  },
  {
    Icon: ChartIcon,
    title: 'Dónde encontrar chollos por debajo del mercado',
    desc: 'Ferias, plataformas, grupos privados… Cómo y dónde se consiguen relojes que puedes revender con beneficio.',
  },
  {
    Icon: UsersIcon,
    title: 'Historias reales de gente como tú',
    desc: 'Coleccionistas y revendedores que empezaron con poco y hoy tienen una colección o un ingreso extra cada mes.',
  },
  {
    Icon: BookIcon,
    title: 'Apps y webs que usamos cada semana',
    desc: 'Las herramientas reales que usamos en Master Collections para buscar, verificar y calcular márgenes antes de comprar.',
  },
];

const painPoints = [
  {
    title: 'Pagaste de más y luego lo viste 100 € más barato',
    desc: 'Aprende a analizar el precio real frente al precio humo, y deja de pagar el pato.',
  },
  {
    title: '¿Es un chollo… o un Frankenstein montado a piezas?',
    desc: 'Una checklist para saber si compras algo de verdad o un reloj tuneado con piezas baratas.',
  },
  {
    title: 'Miras relojes sin saber cuál vale la pena',
    desc: 'Cómo filtrar rápido lo que tiene potencial de revalorización y lo que no.',
  },
];

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
                'radial-gradient(70% 50% at 85% 0%, rgba(200,162,76,0.16) 0%, rgba(11,10,9,0) 55%)',
            }}
          />
          <div className="container-page grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
            {/* Izquierda: pitch + form */}
            <div>
              <span className="eyebrow">Ebook gratis · PDF</span>
              <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-cream sm:text-5xl">
                No la cagues con tu primer reloj.
              </h1>
              <p className="mt-5 max-w-lg text-lg text-cream/75">
                Guía callejera (y sin humo) para empezar en el mundo del coleccionismo sin que te
                timen, te estafen o te arrepientas. Corto, directo y al grano. Te lo descargas al
                instante.
              </p>
              <p className="mt-5 flex flex-wrap items-center gap-x-2 text-sm text-muted">
                <span className="font-semibold text-cream">+{metricLabel(metrics.telegramMembers)}</span>
                en Telegram
                <span className="text-cream/30" aria-hidden="true">·</span>
                <span className="font-semibold text-cream">+{metricLabel(metrics.youtubeSubscribers)}</span>
                en YouTube
              </p>

              <div id="form" className="mt-8 max-w-md scroll-mt-24 rounded-2xl border border-cream/10 bg-graphite/60 p-6 shadow-2xl shadow-black/40 sm:p-8">
                <h2 className="font-serif text-2xl font-semibold text-cream">Descárgalo gratis</h2>
                <p className="mt-1.5 text-sm text-muted">
                  Déjanos dónde enviártelo y te lo bajas ahora mismo.
                </p>
                <div className="mt-6">
                  <EbookForm />
                </div>
              </div>
            </div>

            {/* Derecha: portada del ebook */}
            <div className="order-first flex justify-center lg:order-last">
              <Image
                src="/ebook/cover.png"
                alt="Portada del ebook «No la cagues con tu primer reloj»"
                width={1024}
                height={1536}
                priority
                sizes="(max-width: 1024px) 60vw, 400px"
                className="w-56 max-w-full drop-shadow-2xl sm:w-72 lg:w-[22rem]"
              />
            </div>
          </div>
        </section>

        {/* ¿QUÉ HAY DENTRO? */}
        <section className="border-t border-cream/10 bg-graphite/40">
          <div className="container-page py-20 sm:py-24">
            <span className="eyebrow">Qué hay dentro</span>
            <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl">
              Todo lo que necesitas para empezar sin que te la cuelen.
            </h2>
            <p className="mt-3 max-w-xl text-cream/70">
              Esta guía va directa al grano: sin humo, sin paja y con ejemplos reales.
            </p>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {inside.map(({ Icon, title, desc }) => (
                <article
                  key={title}
                  className="h-full rounded-2xl border border-cream/10 bg-ink/40 p-7"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-serif text-lg font-semibold text-cream">{title}</h3>
                  <p className="mt-2 text-cream/70">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* LO QUE NADIE TE CUENTA */}
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
              <article
                key={p.title}
                className="h-full rounded-2xl border border-cream/10 bg-graphite/40 p-7"
              >
                <h3 className="font-serif text-lg font-semibold text-cream">{p.title}</h3>
                <p className="mt-3 text-cream/70">{p.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* QUIÉN ESTÁ DETRÁS */}
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
            Descarga ya la guía callejera y empieza a moverte como un pro.
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
          <p className="mt-4 text-xs text-muted">
            «{ebookTitle}» · por Toni, Master Collections
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
