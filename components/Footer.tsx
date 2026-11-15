import Link from 'next/link';
import { links } from '@/lib/site';
import { Logo } from './Logo';
import { WhatsAppIcon, TelegramIcon, YouTubeIcon, InstagramIcon, TikTokIcon } from './Icons';

const social = [
  { href: links.whatsapp, label: 'WhatsApp', Icon: WhatsAppIcon },
  { href: links.telegram, label: 'Telegram', Icon: TelegramIcon },
  { href: links.youtube, label: 'YouTube', Icon: YouTubeIcon },
  { href: links.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: links.tiktok, label: 'TikTok', Icon: TikTokIcon },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/10 bg-graphite">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
        <div>
          <Logo />
          <p className="mt-2.5 max-w-xs text-xs leading-relaxed text-muted sm:text-sm">
            La nueva generación de la relojería. Compra, vende y aprende sin que te la cuelen.
          </p>
        </div>

        <nav aria-label="Redes sociales y enlaces legales" className="flex flex-col gap-5 sm:items-end">
          <ul className="flex flex-wrap items-center gap-2.5">
            {social.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cream/10 bg-ink text-cream/80 transition-colors duration-200 hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted sm:text-sm">
            <li>
              <Link href="/relojes" className="transition-colors hover:text-cream">
                Relojes
              </Link>
            </li>
            <li>
              <Link href="/ebook-gratis" className="transition-colors hover:text-cream">
                Ebook gratis
              </Link>
            </li>
            <li>
              <Link href="/links" className="transition-colors hover:text-cream">
                Links
              </Link>
            </li>
            <li>
              <Link href="/legal" className="transition-colors hover:text-cream">
                Aviso legal
              </Link>
            </li>
            <li>
              <Link href="/privacidad" className="transition-colors hover:text-cream">
                Privacidad
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="transition-colors hover:text-cream">
                Cookies
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page flex items-center justify-between py-5">
          <p className="font-mono text-[11px] text-muted">© {year} MASTER COLLECTIONS</p>
        </div>
      </div>
    </footer>
  );
}
