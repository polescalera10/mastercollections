import { communityPillars } from '@/lib/content';
import type { CommunityPillar, IconComponent } from '@/lib/types';
import { Reveal } from './Reveal';
import {
  BookIcon,
  ChartIcon,
  HandshakeIcon,
  ScaleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon,
} from './Icons';

const iconMap: Record<CommunityPillar['iconName'], IconComponent> = {
  handshake: HandshakeIcon,
  shield: ShieldCheckIcon,
  book: BookIcon,
  chart: ChartIcon,
  scale: ScaleIcon,
  users: UsersIcon,
  sparkles: SparklesIcon,
};

export function Inside() {
  return (
    <section id="comunidad" className="border-y border-cream/10 bg-graphite/60 py-14 sm:py-24 scroll-mt-20">
      <div className="container-page">
        <Reveal>
          <span className="eyebrow">DENTRO DEL CLUB</span>
          <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold leading-tight tracking-tight text-cream sm:mt-4 sm:text-4xl">
            Lo que pasa dentro cuando entras al grupo.
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted sm:mt-3 sm:text-base">
            Nada de cursos teóricos. Ves piezas y precios reales, aprendes a detectar trampas y
            hablas con gente que compra y vende cada semana.
          </p>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {communityPillars.map((v, i) => {
            const Icon = iconMap[v.iconName];
            return (
              <Reveal as="div" key={v.title} delay={(i % 3) * 0.06}>
                <article className="group h-full rounded-2xl border border-cream/10 bg-ink p-5 transition-colors duration-200 hover:border-gold/50 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold transition-colors duration-200 group-hover:bg-gold group-hover:text-ink">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-muted">
                      // 0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-cream">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
