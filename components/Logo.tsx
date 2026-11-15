import Link from 'next/link';

type LogoProps = {
  showWordmark?: boolean;
  size?: 'sm' | 'md';
  className?: string;
};

/**
 * Logo de marca con estética street-horology moderna.
 */
export function Logo({ showWordmark = true, size = 'sm', className = '' }: LogoProps) {
  const box = size === 'md' ? 'h-10 w-10 text-base' : 'h-8 w-8 text-xs';

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label="Master Collections — Inicio"
    >
      <span
        className={`flex shrink-0 items-center justify-center rounded-lg border border-gold/60 bg-gold text-ink font-display font-bold tracking-tighter shadow-sm shadow-gold/20 ${box}`}
      >
        MC
      </span>
      {showWordmark && (
        <span className="font-display text-base font-bold tracking-tight text-cream sm:text-lg">
          MASTER<span className="text-gold">COLLECTIONS</span>
        </span>
      )}
    </Link>
  );
}
