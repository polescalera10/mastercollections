import Image from 'next/image';
import { featuredVideos } from '@/lib/content';
import { links } from '@/lib/site';
import { Reveal } from './Reveal';
import { ArrowRightIcon, PlayIcon, YouTubeIcon, TikTokIcon } from './Icons';
import { WhatsAppButton } from './WhatsAppButton';

const fallbackThumbs = [
  '/images/street-trader.jpg',
  '/images/hero-watch.jpg',
  '/images/street-trader.jpg',
];

function thumbnail(id: string | null, index: number) {
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : fallbackThumbs[index % fallbackThumbs.length];
}

function videoUrl(id: string | null) {
  return id ? `https://youtu.be/${id}` : links.youtube;
}

type Card = { title: string; tag?: string; href: string; thumb: string; isVideo: boolean };

/**
 * Mientras no haya IDs reales de vídeo (MC-4), no se inventan títulos de vídeos que
 * no existen: se muestran tarjetas que llevan a cada canal.
 */
const realVideos = featuredVideos.filter((v) => v.id);
const cards: Card[] =
  realVideos.length > 0
    ? realVideos.map((v, i) => ({
        title: v.title,
        tag: v.tag,
        href: videoUrl(v.id),
        thumb: thumbnail(v.id, i),
        isVideo: true,
      }))
    : [
        { title: 'Análisis del mercado en YouTube', tag: 'YouTube', href: links.youtube, thumb: '/images/hero-watch.jpg', isVideo: false },
        { title: 'Relojería en vídeo corto en TikTok', tag: 'TikTok', href: links.tiktok, thumb: '/images/street-trader.jpg', isVideo: false },
        { title: 'El día a día y piezas en muñeca en Instagram', tag: 'Instagram', href: links.instagram, thumb: '/images/hero-watch.jpg', isVideo: false },
      ];

export function Content() {
  return (
    <section id="contenido" className="container-page py-14 sm:py-24 scroll-mt-20">
      <Reveal>
        <span className="eyebrow">EN REDES</span>
        <h2 className="mt-3 max-w-3xl font-display text-2xl font-bold leading-tight tracking-tight text-cream sm:mt-4 sm:text-4xl">
          En redes enseñamos la calle. En el WhatsApp salen las oportunidades.
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted sm:mt-3 sm:text-base">
          En YouTube y TikTok analizamos el mercado sin rodeos. En el canal de WhatsApp y Telegram
          avisamos de cada pieza nueva.
        </p>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {cards.map((video, i) => {
          const thumb = video.thumb;
          return (
            <Reveal as="div" key={video.title} delay={i * 0.06}>
              <a
                href={video.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-graphite transition-colors duration-200 hover:border-gold/50"
              >
                <div className="relative aspect-video overflow-hidden bg-ink">
                  <Image
                    src={thumb}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent"
                  />
                  {video.tag && (
                    <span className="absolute left-3 top-3 rounded-lg border border-gold/40 bg-ink/85 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-gold backdrop-blur-sm">
                      {video.tag}
                    </span>
                  )}
                  {video.isVideo && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 bg-ink/80 text-cream backdrop-blur-sm transition-all duration-200 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-ink sm:h-14 sm:w-14">
                      <PlayIcon className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6" />
                    </span>
                  </span>
                  )}
                </div>
                <div className="flex flex-1 items-center justify-between gap-3 p-4 sm:p-5">
                  <h3 className="font-display text-sm font-bold leading-snug text-cream sm:text-base">
                    {video.title}
                  </h3>
                  <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted transition-colors duration-200 group-hover:text-gold sm:h-5 sm:w-5" />
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
          <WhatsAppButton className="w-full sm:w-auto" />
          <a
            href={links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full sm:w-auto"
          >
            <YouTubeIcon className="h-4 w-4 text-red-500" />
            <span>YouTube (@MasterCollectionsClub)</span>
          </a>
          <a
            href={links.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-full sm:w-auto"
          >
            <TikTokIcon className="h-4 w-4 text-gold" />
            <span>TikTok (@toniiabella)</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
