import { Reveal } from './Reveal';
import { metricLabel, metrics } from '@/lib/site';

type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: `+${metricLabel(metrics.telegramMembers)}`, label: 'Miembros en Telegram' },
  { value: `+${metricLabel(metrics.youtubeSubscribers)}`, label: 'Suscriptores en YouTube' },
  { value: `+${metricLabel(metrics.operations)}`, label: 'Operaciones en la comunidad' },
  { value: `+${metricLabel(metrics.years)}`, label: 'Años en el sector' },
];

export function Stats() {
  return (
    <section className="border-y border-cream/10 bg-graphite/60">
      <div className="container-page py-12 sm:py-14">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
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
