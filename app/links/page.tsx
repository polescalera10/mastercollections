import type { Metadata } from 'next';
import { links, metricLabel, metrics } from '@/lib/site';
import { Logo } from '@/components/Logo';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import {
  TelegramIcon,
  YouTubeIcon,
  InstagramIcon,
  TikTokIcon,
  BookIcon,
  WatchIcon,
  ArrowRightIcon,
} from '@/components/Icons';
import type { ComponentType, SVGProps } from 'react';

export const metadata: Metadata = {
  title: 'Enlaces Oficiales | Master Collections',
  description:
    'Todos los enlaces oficiales de Master Collections: Canal de WhatsApp, Telegram, Drops de Relojes, YouTube, TikTok, Instagram y el ebook gratuito.',
  alternates: { canonical: '/links' },
};

type LinkRow = {
  href: string;
  label: string;
  hint: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  external: boolean;
};

const rows: LinkRow[] = [
  {
    href: links.telegram,
    label: 'Comunidad en Telegram',
    hint:
      metrics.telegramMembers !== null
        ? `+${metricLabel(metrics.telegramMembers)} miembros hablando de relojes`
        : 'Grupo abierto para hablar de relojes',
    Icon: TelegramIcon,
    external: true,
  },
  {
    href: '/ebook-gratis',
    label: 'Ebook gratis (70 páginas)',
    hint: '«No la cagues con tu primer reloj» · descarga directa',
    Icon: BookIcon,
    external: false,
  },
  {
    href: '/relojes',
    label: 'Relojes en venta',
    hint: 'Las piezas disponibles ahora mismo',
    Icon: WatchIcon,
    external: false,
  },
  {
    href: links.youtube,
    label: 'YouTube',
    hint:
      metrics.youtubeSubscribers !== null
        ? `@MasterCollectionsClub · +${metricLabel(metrics.youtubeSubscribers)} suscriptores`
        : '@MasterCollectionsClub · Análisis y mercado',
    Icon: YouTubeIcon,
    external: true,
  },
  {
    href: links.tiktok,
    label: 'TikTok',
    hint:
      metrics.tiktokFollowers !== null
        ? `@toniiabella · +${metricLabel(metrics.tiktokFollowers)} seguidores`
        : '@toniiabella · Relojería en vídeo corto',
    Icon: TikTokIcon,
    external: true,
  },
  {
    href: links.instagram,
    label: 'Instagram',
    hint: '@mastercollections_ · El día a día y piezas en muñeca',
    Icon: InstagramIcon,
    external: true,
  },
];

export default function LinksPage() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-grid-pattern px-4 py-12 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(80% 55% at 50% 0%, rgba(37,211,102,0.16) 0%, rgba(212,255,0,0.06) 45%, rgba(7,8,10,0) 75%)',
        }}
      />

      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center">
          <Logo showWordmark={false} size="md" />
          <span className="mt-3 font-mono text-[11px] font-bold uppercase tracking-widest text-gold">
            @MASTERCOLLECTIONS_
          </span>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-cream">
            Master Collections
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            Relojería sin corbata y sin humo. Compra, vende y aprende.
          </p>
        </div>

        {/* CTA #1: Canal oficial de WhatsApp */}
        <div className="mt-6">
          <WhatsAppButton label="Entrar al grupo de WhatsApp" className="w-full" />
        </div>

        <ul className="mt-3.5 space-y-2.5">
          {rows.map((row) => (
            <li key={row.label}>
              <a
                href={row.href}
                {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-3.5 rounded-2xl border border-cream/12 bg-graphite/90 px-4 py-3.5 transition-all duration-200 hover:border-gold/50 hover:bg-stone"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                  <row.Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-sm font-bold leading-snug text-cream">
                    {row.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted">{row.hint}</span>
                </span>
                <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted transition-colors duration-200 group-hover:text-gold" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center font-mono text-[11px] text-muted">
          © {new Date().getFullYear()} MASTER COLLECTIONS
        </p>
      </div>
    </main>
  );
}
