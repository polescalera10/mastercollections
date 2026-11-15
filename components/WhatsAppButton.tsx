import { links } from '@/lib/site';
import { WhatsAppIcon } from './Icons';

type WhatsAppButtonProps = {
  label?: string;
  className?: string;
};

/**
 * CTA Primario de toda la web: lleva al Canal/Comunidad oficial de WhatsApp.
 */
export function WhatsAppButton({
  label = 'Entrar al grupo de WhatsApp',
  className = '',
}: WhatsAppButtonProps) {
  return (
    <a
      href={links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-primary ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span>{label}</span>
    </a>
  );
}
