import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { WatchCard } from '@/components/WatchCard';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { TelegramButton } from '@/components/TelegramButton';
import { getPublicWatches } from '@/lib/watches';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Drops y Relojes en Venta | Master Collections',
  description:
    'Relojes de segunda mano disponibles en la comunidad de Master Collections. Compra con criterio y pregunta antes de decidir.',
  alternates: { canonical: '/relojes' },
};

export default async function RelojesPage() {
  const watches = await getPublicWatches();

  return (
    <>
      <Nav />
      <main id="contenido-principal" className="min-h-screen bg-grid-pattern pb-20 pt-24 sm:pt-32">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow">EN VENTA</span>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:mt-4 sm:text-5xl">
              Relojes de la comunidad.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-lg">
              Cada pieza sale primero en el canal de WhatsApp y en Telegram. Si te encaja alguna,
              escríbenos antes de que se la lleven.
            </p>
          </div>

          {watches.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-cream/10 bg-graphite p-8 text-center sm:p-12">
              <p className="font-display text-lg font-bold text-cream sm:text-xl">
                Ahora mismo no hay piezas en el escaparate.
              </p>
              <p className="mt-2 text-sm text-muted">
                Las piezas nuevas salen primero en el canal de WhatsApp. Entra para enterarte en cuanto haya alguna.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <WhatsAppButton label="Entrar al grupo de WhatsApp" />
                <TelegramButton label="Unirme a Telegram" />
              </div>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
              {watches.map((watch) => (
                <WatchCard key={watch.id} watch={watch} />
              ))}
            </div>
          )}

          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-gold/30 bg-graphite p-6 sm:mt-16 sm:flex-row sm:items-center sm:p-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-gold">
                AVISOS DE PIEZAS NUEVAS
              </span>
              <h2 className="mt-1 font-display text-xl font-bold text-cream sm:text-2xl">
                ¿Buscas una pieza concreta o quieres vender la tuya?
              </h2>
              <p className="mt-1 text-sm text-muted">
                Entra al canal de WhatsApp y recibe cada reloj en cuanto se publica.
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row">
              <WhatsAppButton label="Entrar al canal" className="w-full sm:w-auto" />
              <Link href="/" className="btn-ghost w-full sm:w-auto">
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
