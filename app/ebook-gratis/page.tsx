import type { Metadata } from 'next';
import { Logo } from '@/components/Logo';
import { EbookForm } from '@/components/EbookForm';
import { Footer } from '@/components/Footer';
import { metricLabel, metrics, ebookTitle } from '@/lib/site';
import { ShieldCheckIcon, ChartIcon, ScaleIcon, BookIcon, HandshakeIcon, UsersIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Ebook gratis: cómo empezar en la compraventa de relojes | Master Collections',
  description:
    'Descarga gratis el ebook "No la cagues con tu primer reloj": cómo comprar sin que te timen, dónde encontrar relojes con margen y qué marcas sí (y cuáles no).',
  alternates: { canonical: '/ebook-gratis' },
};

const inside = [
  { Icon: ShieldCheckIcon, text: 'Cómo comprar sin que te timen' },
  { Icon: ChartIcon, text: 'Dónde encontrar relojes con margen' },
  { Icon: ScaleIcon, text: 'Qué marcas sí (y cuáles mejor ni tocar)' },
  { Icon: BookIcon, text: 'Las herramientas y apps que de verdad uso' },
  { Icon: UsersIcon, text: 'Los errores típicos del que empieza' },
  { Icon: HandshakeIcon, text: 'Cómo moverte como un coleccionista de verdad' },
];

export default function EbookPage() {
  return (
    <>
      <header className="container-page flex items-center justify-between py-5">
        <Logo />
      </header>

      <main className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-ink"
          style={{
            backgroundImage:
              'radial-gradient(70% 50% at 80% 0%, rgba(200,162,76,0.14) 0%, rgba(11,10,9,0) 55%)',
          }}
        />

        <div className="container-page grid gap-12 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
          {/* Izquierda: pitch + qué hay dentro */}
          <div>
            <span className="eyebrow">Ebook gratis · PDF</span>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-cream sm:text-5xl">
              No la cagues con tu primer reloj.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-cream/75">
              Corto, directo y al grano. Nada de humo ni paja. Lo que necesitas saber para comprar
              tu primer reloj sin palmar pasta. Te lo descargas al instante.
            </p>

            <ul className="mt-8 space-y-3">
              {inside.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-cream/85">{text}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 flex flex-wrap items-center gap-x-2 text-sm text-muted">
              <span className="font-semibold text-cream">+{metricLabel(metrics.telegramMembers)}</span>
              en Telegram
              <span className="text-cream/30" aria-hidden="true">·</span>
              <span className="font-semibold text-cream">+{metricLabel(metrics.youtubeSubscribers)}</span>
              en YouTube
            </p>
          </div>

          {/* Derecha: formulario */}
          <div className="lg:pl-4">
            <div className="rounded-2xl border border-cream/10 bg-graphite/60 p-6 shadow-2xl shadow-black/40 sm:p-8">
              <h2 className="font-serif text-2xl font-semibold text-cream">
                Descárgalo gratis
              </h2>
              <p className="mt-1.5 text-sm text-muted">
                Déjanos dónde enviártelo y te lo bajas ahora mismo.
              </p>
              <div className="mt-6">
                <EbookForm />
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              «{ebookTitle}» · por Tony, Master Collections
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
