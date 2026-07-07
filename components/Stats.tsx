import { Reveal } from './Reveal';
import { metricLabel, metrics } from '@/lib/site';

type Stat = {
  value: string;
  label: string;
};

/**
 * Solo se muestran métricas con dato real (número en lib/site.ts).
 * Las que estén a `null` se ocultan automáticamente — así nunca sale un
 * placeholder ni una cifra no verificada en producción.
 */
const candidates: { value: number | null; label: string }[] = [
  { value: metrics.telegramMembers, label: 'Miembros en Telegram' },
  { value: metrics.youtubeSubscribers, label: 'Suscriptores en YouTube' },
  // TODO: verificar con Pol antes de reactivar (rellenar en lib/site.ts).
  { value: metrics.operations, label: 'Operaciones en la comunidad' },
  { value: metrics.years, label: 'Años en el sector' },
];

const stats: Stat[] = candidates
  .filter((s): s is { value: number; label: string } => s.value !== null)
  .map((s) => ({ value: `+${metricLabel(s.value)}`, label: s.label }));

export function Stats() {
  // Sin métricas verificadas no se renderiza la sección.
  if (stats.length === 0) return null;

  return (
    <section className="border-y border-cream/10 bg-graphite/60">
      <div className="container-page py-12 sm:py-14">
        {/* flex + wrap: la fila queda centrada sea cual sea el número de métricas visibles */}
        <dl className="flex flex-wrap items-start justify-center gap-x-14 gap-y-10 sm:gap-x-20">
          {stats.map((stat, i) => (
            <Reveal as="div" key={stat.label} delay={i * 0.06} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-serif text-4xl font-semibold tracking-tight text-gold sm:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-2 block text-sm text-muted">{stat.label}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
