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
      className="pointer-events-none fixed bottom-3 left-3 z-[60] max-w-[calc(100vw-1.5rem)] rounded-full border border-gold/40 bg-ink/90 px-3.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-gold shadow-lg backdrop-blur-md sm:text-[11px]"
    >
      Demo · datos ficticios
    </div>
  );
}
