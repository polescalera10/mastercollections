import { formatPrice, links } from '@/lib/site';
import type { WatchItem } from '@/lib/types';
import { TelegramIcon, WhatsAppIcon } from './Icons';

type WatchCardProps = {
  watch: WatchItem;
};

const statusConfig: Record<
  WatchItem['status'],
  { label: string; dot: string; badge: string }
> = {
  disponible: {
    label: 'DISPONIBLE',
    dot: 'bg-action',
    badge: 'border-action/40 bg-ink/90 text-action',
  },
  reservado: {
    label: 'RESERVADO',
    dot: 'bg-gold',
    badge: 'border-gold/40 bg-ink/90 text-gold',
  },
  vendido: {
    label: 'VENDIDO',
    dot: 'bg-red-400',
    badge: 'border-red-400/40 bg-ink/90 text-red-400',
  },
};

export function WatchCard({ watch }: WatchCardProps) {
  const status = statusConfig[watch.status];
  const mainImage = watch.images[0] ?? '/demo/placeholder.svg';

  return (
    <article
      id={watch.slug}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-graphite transition-all duration-300 hover:border-gold/50"
    >
      {/* Imagen del reloj */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink p-5 sm:p-6">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(60% 60% at 50% 50%, rgba(212,255,0,0.10) 0%, rgba(7,8,10,0) 75%)',
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mainImage}
          alt={`${watch.brand} ${watch.model} ${watch.reference}`}
          loading="lazy"
          className="relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge de estado (Mobile-First, compacto) */}
        <span
          className={`absolute left-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider backdrop-blur-md ${status.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>

        {watch.images.length > 1 && (
          <span className="absolute bottom-3 right-3 z-20 rounded-lg border border-cream/15 bg-ink/85 px-2 py-0.5 font-mono text-[10px] text-muted backdrop-blur-sm">
            {watch.images.length} FOTOS
          </span>
        )}
      </div>

      {/* Contenido de la ficha */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-gold">
            {watch.brand}
          </span>
          <p className="font-mono text-lg font-bold text-cream sm:text-xl">
            {formatPrice(watch.price)}
          </p>
        </div>

        <h3 className="mt-1 font-display text-lg font-bold leading-snug text-cream sm:text-xl">
          {watch.model}
        </h3>

        {/* Tags técnicos compactos y adaptados a móvil */}
        <div className="mt-3.5 flex flex-wrap gap-1.5 font-mono text-[11px] text-cream/85">
          {watch.reference && (
            <span className="rounded-md border border-cream/10 bg-ink px-2 py-0.5">
              REF. {watch.reference}
            </span>
          )}
          {watch.year && (
            <span className="rounded-md border border-cream/10 bg-ink px-2 py-0.5">
              {watch.year}
            </span>
          )}
          {watch.caseSizeMm && (
            <span className="rounded-md border border-cream/10 bg-ink px-2 py-0.5">
              {watch.caseSizeMm}MM
            </span>
          )}
          <span className="rounded-md border border-cream/10 bg-ink px-2 py-0.5">
            {watch.condition}
          </span>
          <span className="rounded-md border border-gold/30 bg-gold/10 px-2 py-0.5 text-gold">
            {watch.delivery}
          </span>
        </div>

        <p className="mt-3.5 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
          {watch.description}
        </p>

        {/* Acciones (WhatsApp #1, Telegram #2) */}
        <div className="mt-5 grid grid-cols-1 gap-2 border-t border-cream/10 pt-4 sm:grid-cols-[1fr_auto]">
          <a
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-action px-4 py-2.5 font-display text-xs font-bold text-ink transition-colors hover:bg-action-dark"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            <span>Ver drop en WhatsApp</span>
          </a>
          <a
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl border border-cream/15 bg-ink px-3.5 py-2.5 font-display text-xs font-semibold text-cream transition-colors hover:border-telegram hover:text-telegram"
            title="Ver en Telegram"
          >
            <TelegramIcon className="h-3.5 w-3.5 text-telegram" />
            <span>Telegram</span>
          </a>
        </div>
      </div>
    </article>
  );
}
