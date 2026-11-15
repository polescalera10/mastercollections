import Link from 'next/link';
import type { WatchItem } from '@/lib/types';
import { Reveal } from './Reveal';
import { WatchCard } from './WatchCard';
import { ArrowRightIcon } from './Icons';

type CatalogSectionProps = {
  watches: WatchItem[];
};

export function CatalogSection({ watches }: CatalogSectionProps) {
  if (watches.length === 0) return null;

  const displayed = watches.slice(0, 3);

  return (
    <section id="relojes" className="border-b border-cream/10 bg-ink py-14 sm:py-24 scroll-mt-20">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal>
            <span className="eyebrow">DROPS · WATCH TRADING</span>
            <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold leading-tight tracking-tight text-cream sm:mt-4 sm:text-4xl">
              Piezas que movemos en la comunidad.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted sm:mt-3 sm:text-base">
              Cada reloj que entra se lanza en tiempo real en el grupo de WhatsApp, en Telegram y en
              este escaparate. Sin intermediarios.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Link href="/relojes" className="btn-ghost w-full sm:w-auto">
              <span>Ver todos los drops ({watches.length})</span>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {displayed.map((watch, i) => (
            <Reveal as="div" key={watch.id} delay={i * 0.06}>
              <WatchCard watch={watch} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
