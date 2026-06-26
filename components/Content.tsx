import { Reveal } from './Reveal';
import { PlayIcon, YouTubeIcon, ArrowRightIcon } from './Icons';
import { TelegramButton } from './TelegramButton';
import { links } from '@/lib/site';

type Video = {
  /** ID de YouTube. Cuando exista, la miniatura y el enlace se generan solos. */
  id: string | null;
  title: string;
};

// TODO: sustituir por 3 vídeos REALES del canal (rellenar `id` con el ID de YouTube
// y `title` con el título real). Ej: { id: 'dQw4w9WgXcQ', title: 'Análisis del...' }
const videos: Video[] = [
  { id: null, title: 'Análisis de un reloj real, sin filtros' },
  { id: null, title: 'Cómo detectar una falsificación' },
  { id: null, title: 'Comprar en Chrono24 vs Wallapop' },
];

function thumbnail(id: string | null) {
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}
function videoUrl(id: string | null) {
  return id ? `https://youtu.be/${id}` : links.youtube;
}

export function Content() {
  return (
    <section className="container-page py-20 sm:py-28">
      <Reveal>
        <span className="eyebrow">El contenido</span>
        <h2 className="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl">
          Esto es lo que compartimos. El grupo es donde pasa lo bueno.
        </h2>
        <p className="mt-4 max-w-xl text-cream/70">
          En YouTube enseñamos la cara pública: análisis y criterio. En Telegram ocurre el
          día a día — las oportunidades y las conversaciones que no caben en un vídeo.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, i) => {
          const thumb = thumbnail(video.id);
          return (
            <Reveal as="div" key={i} delay={i * 0.08}>
              <a
                href={videoUrl(video.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-2xl border border-cream/10 bg-graphite/40 transition-colors duration-200 hover:border-gold/40"
              >
                <div className="relative aspect-video overflow-hidden">
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb}
                      alt={`Miniatura del vídeo: ${video.title}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    // Placeholder hasta tener el vídeo real
                    <div
                      aria-hidden="true"
                      className="h-full w-full bg-ink"
                      style={{
                        backgroundImage:
                          'radial-gradient(80% 80% at 50% 30%, rgba(200,162,76,0.16) 0%, rgba(11,10,9,0) 70%)',
                      }}
                    />
                  )}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink/70 text-cream backdrop-blur-sm transition-colors duration-200 group-hover:bg-action group-hover:text-white">
                      <PlayIcon className="ml-0.5 h-6 w-6" />
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <h3 className="font-serif text-base font-medium text-cream">{video.title}</h3>
                  <ArrowRightIcon className="h-5 w-5 shrink-0 text-muted transition-colors duration-200 group-hover:text-gold" />
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <TelegramButton />
          <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <YouTubeIcon className="h-4 w-4" />
            Ver el canal de YouTube
          </a>
        </div>
      </Reveal>
    </section>
  );
}
