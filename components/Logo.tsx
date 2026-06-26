import Link from 'next/link';

type LogoProps = {
  /** Mostrar el texto "Master Collections" junto al monograma. */
  showWordmark?: boolean;
  /** Tamaño del monograma. */
  size?: 'sm' | 'md';
  className?: string;
};

/**
 * Logo de marca: monograma serif "MC" (reproducción fiel del logo original,
 * vectorial y adaptado al tema oscuro) + wordmark opcional.
 */
export function Logo({ showWordmark = true, size = 'sm', className = '' }: LogoProps) {
  const box = size === 'md' ? 'h-11 w-11 text-lg' : 'h-8 w-8 text-sm';

  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`} aria-label="Master Collections — Inicio">
      <span
        className={`flex items-center justify-center rounded-md border border-gold/50 font-serif font-semibold leading-none text-gold ${box}`}
      >
        MC
      </span>
      {showWordmark && (
        <span className="font-serif text-lg font-semibold tracking-tight text-cream">Master Collections</span>
      )}
    </Link>
  );
}
