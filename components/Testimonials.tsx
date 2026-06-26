import Image from 'next/image';
import { Reveal } from './Reveal';
import { testimonials } from '@/lib/testimonials';

/**
 * Capturas de mensajes reales de miembros.
 *
 * Para añadir una captura:
 * 1. Guarda la imagen en /public/testimonials/ (p. ej. 01.jpg)
 * 2. Cambia `src: null` por `src: '/testimonials/01.jpg'` en lib/testimonials.ts
 *
 * La cuadrícula se adapta sola: muestra placeholders hasta que haya imágenes reales.
 */
export function Testimonials() {
  return (
    <section className="border-y border-cream/10 bg-graphite/40">
      <div className="container-page py-20 sm:py-28">
        <Reveal>
          <span className="eyebrow">Lo que dicen los miembros</span>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl">
            En sus propias palabras.
          </h2>
          <p className="mt-3 max-w-lg text-cream/70">
            Mensajes reales de gente de la comunidad. Sin filtros, sin editar.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="div" key={i} delay={(i % 3) * 0.07}>
              {t.src ? (
                /* Captura real */
                <div className="overflow-hidden rounded-2xl border border-cream/10 bg-ink shadow-lg transition-transform duration-200 hover:scale-[1.01]">
                  <Image
                    src={t.src}
                    alt={t.alt}
                    width={600}
                    height={400}
                    className="h-auto w-full object-cover"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                /* Placeholder hasta tener la captura */
                <div className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-cream/20 bg-ink/40 p-8 text-center">
                  {/* Icono de chat */}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gold/40"
                    aria-hidden="true"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <p className="text-xs text-muted">
                    Captura {i + 1}
                    <br />
                    <span className="text-muted/60">Añádela en lib/testimonials.ts</span>
                  </p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
