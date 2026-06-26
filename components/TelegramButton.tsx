import { links } from '@/lib/site';
import { TelegramIcon } from './Icons';

type Props = {
  /** Texto del botón. Por defecto, el CTA principal. */
  label?: string;
  className?: string;
};

/**
 * CTA primario único de la web: unirse al Telegram gratuito.
 * Abre en pestaña nueva y conserva el color de acción en toda la página.
 */
export function TelegramButton({ label = 'Únete gratis al Telegram', className = '' }: Props) {
  return (
    <a
      href={links.telegram}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-primary ${className}`}
    >
      <TelegramIcon className="h-5 w-5" />
      {label}
    </a>
  );
}
