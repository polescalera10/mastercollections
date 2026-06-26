import type { Metadata } from 'next';
import { links } from '@/lib/site';
import { Logo } from '@/components/Logo';
import { TelegramButton } from '@/components/TelegramButton';
import {
  YouTubeIcon,
  InstagramIcon,
  TikTokIcon,
  BookIcon,
  ArrowRightIcon,
} from '@/components/Icons';
import type { ComponentType, SVGProps } from 'react';

export const metadata: Metadata = {
  title: 'Enlaces | Master Collections',
  description: 'Todos los enlaces de Master Collections en un solo sitio: Telegram, YouTube, Instagram, TikTok y el ebook gratuito.',
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
  { href: '/', label: 'Web', hint: 'La comunidad al completo', Icon: ArrowRightIcon, external: false },
  { href: links.youtube, label: 'YouTube', hint: 'Análisis y vídeo', Icon: YouTubeIcon, external: true },
  { href: links.instagram, label: 'Instagram', hint: 'El día a día', Icon: InstagramIcon, external: true },
  // TODO: confirmar handle real de TikTok en lib/site.ts
  { href: links.tiktok, label: 'TikTok', hint: 'Relojes en corto', Icon: TikTokIcon, external: true },
  { href: '/ebook-gratis', label: 'Ebook gratis', hint: 'No la cagues con tu primer reloj', Icon: BookIcon, external: false },
];

export default function LinksPage() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-16">
      {/* Fondo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink"
        style={{
          backgroundImage:
            'radial-gradient(80% 60% at 50% 0%, rgba(200,162,76,0.14) 0%, rgba(11,10,9,0) 60%), radial-gradient(70% 50% at 50% 100%, rgba(42,171,238,0.10) 0%, rgba(11,10,9,0) 60%)',
        }}
      />

      <div className="w-full max-w-md">
        {/* Cabecera */}
        <div className="flex flex-col items-center text-center">
          <Logo showWordmark={false} size="md" />
          <h1 className="mt-5 font-serif text-2xl font-semibold tracking-tight text-cream">
            Master Collections
          </h1>
          <p className="mt-2 text-sm text-muted">
            Compra, vende y aprende de relojes sin que te la cuelen.
          </p>
        </div>

        {/* CTA primario */}
        <div className="mt-8">
          <TelegramButton label="Únete gratis ahora" className="w-full" />
        </div>

        {/* Resto de enlaces */}
        <ul className="mt-4 space-y-3">
          {rows.map((row) => (
            <li key={row.label}>
              <a
                href={row.href}
                {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-4 rounded-full border border-cream/15 bg-graphite/50 px-5 py-4 transition-colors duration-200 hover:border-gold/50 hover:bg-graphite"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
                  <row.Icon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-medium text-cream">{row.label}</span>
                  <span className="block text-xs text-muted">{row.hint}</span>
                </span>
                <ArrowRightIcon className="h-4 w-4 text-muted transition-colors duration-200 group-hover:text-gold" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-xs text-muted">
          © {new Date().getFullYear()} Master Collections
        </p>
      </div>
    </main>
  );
}
