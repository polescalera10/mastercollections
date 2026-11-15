import { isDemo } from '@/lib/site';

/**
 * Aviso fijo que solo aparece en el despliegue de demostración
 * (NEXT_PUBLIC_DEMO_MODE=true). Deja claro que los datos son ficticios.
 */
export function DemoBanner() {
  if (!isDemo) return null;

  return (
    <div
      role="note"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] bg-ink/90 py-1 text-center font-mono text-[10px] font-bold uppercase tracking-wider text-gold backdrop-blur-sm"
    >
      Demo · datos ficticios
    </div>
  );
}
