import Link from 'next/link';
import { links } from '@/lib/site';
import { TelegramIcon, YouTubeIcon, InstagramIcon } from './Icons';

const social = [
  { href: links.telegram, label: 'Telegram', Icon: TelegramIcon },
  { href: links.youtube, label: 'YouTube', Icon: YouTubeIcon },
  { href: links.instagram, label: 'Instagram', Icon: InstagramIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/10 bg-graphite/60">
      <div className="container-page flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="flex items-center gap-2 font-serif text-lg font-semibold text-cream">
            {/* TODO: sustituir por logo real */}
            <span className="inline-block h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
            Master Collections
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Comunidad de compraventa y aprendizaje sobre relojes de segunda mano.
          </p>
        </div>

        <nav aria-label="Redes sociales y enlaces legales" className="flex flex-col gap-6 sm:items-end">
          <ul className="flex items-center gap-3">
            {social.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/10 text-cream/70 transition-colors duration-200 hover:border-gold hover:text-gold"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex items-center gap-5 text-sm text-muted">
            <li>
              <Link href="/legal" className="transition-colors duration-200 hover:text-cream">
                Aviso legal
              </Link>
            </li>
            <li>
              <Link href="/privacidad" className="transition-colors duration-200 hover:text-cream">
                Privacidad
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page py-6">
          <p className="text-xs text-muted">© {year} Master Collections. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
