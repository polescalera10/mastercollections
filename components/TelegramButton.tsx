import { links } from '@/lib/site';
import { TelegramIcon } from './Icons';

type TelegramButtonProps = {
  label?: string;
  variant?: 'ghost' | 'primary';
  className?: string;
};

/**
 * CTA de Telegram (ahora como canal secundario / complementario a WhatsApp).
 */
export function TelegramButton({
  label = 'Unirme a Telegram',
  variant = 'ghost',
  className = '',
}: TelegramButtonProps) {
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-ghost';
  return (
    <a
      href={links.telegram}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClass} ${className}`}
    >
      <TelegramIcon className="h-4 w-4 shrink-0 text-telegram" />
      <span>{label}</span>
    </a>
  );
}
