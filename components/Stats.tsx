import { Reveal } from './Reveal';
import { metricLabel, metrics } from '@/lib/site';

type Stat = {
  value: string;
  label: string;
  tag: string;
};

const candidates: { value: number | null; label: string; tag: string }[] = [
  { value: metrics.youtubeSubscribers, label: 'Suscriptores YouTube', tag: '@MasterCollectionsClub' },
  { value: metrics.tiktokFollowers, label: 'Seguidores TikTok', tag: '@toniiabella' },
  { value: metrics.telegramMembers, label: 'Miembros en el grupo', tag: 'Telegram' },
  { value: metrics.operations, label: 'Operaciones cerradas', tag: 'Trading' },
  { value: metrics.years, label: 'Años en el barro', tag: 'Watch Trading' },
];

const stats: Stat[] = candidates
  .filter((s): s is { value: number; label: string; tag: string } => s.value !== null)
  .map((s) => ({ value: `+${metricLabel(s.value)}`, label: s.label, tag: s.tag }));

export function Stats() {
  if (stats.length === 0) return null;

  return (
    <section className="border-y border-cream/10 bg-graphite/70">
      <div className="container-page py-6 sm:py-10">
        <dl
          className={`grid grid-cols-1 gap-3 sm:gap-5 ${
            stats.length >= 3 ? 'sm:grid-cols-3' : stats.length === 2 ? 'sm:grid-cols-2' : ''
          }`}
        >
          {stats.map((stat, i) => (
            <Reveal
              as="div"
              key={stat.label}
              delay={i * 0.05}
              className="flex items-center justify-between rounded-xl border border-cream/10 bg-ink/70 px-4 py-3.5 sm:flex-col sm:items-start sm:p-5"
            >
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {stat.tag}
                </dt>
                <dd className="mt-0.5 text-xs font-medium text-cream/85 sm:mt-1 sm:text-sm">
                  {stat.label}
                </dd>
              </div>
              <dd className="font-display text-2xl font-bold tracking-tight text-gold sm:mt-3 sm:text-4xl">
                {stat.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
