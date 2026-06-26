'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { TelegramButton } from '@/components/TelegramButton';
import { ArrowRightIcon } from '@/components/Icons';
import { ebookPdf, ebookTitle } from '@/lib/site';

/**
 * Página de gracias: replica el email de entrega del ebook, pero con DESCARGA
 * DIRECTA (el usuario no depende de que le llegue el correo). El PDF se sirve
 * desde nuestra propia web (/ebook-master-collections.pdf).
 */
export default function GraciasPage() {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    try {
      setNombre(sessionStorage.getItem('mc_nombre') ?? '');
    } catch {
      /* noop */
    }
  }, []);

  return (
    <main className="relative isolate flex min-h-screen flex-col px-5 py-6">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink"
        style={{
          backgroundImage:
            'radial-gradient(70% 50% at 50% 0%, rgba(200,162,76,0.14) 0%, rgba(11,10,9,0) 55%)',
        }}
      />

      <header className="mx-auto w-full max-w-2xl">
        <Logo />
      </header>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center py-12">
        <span className="eyebrow">Ya está</span>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight tracking-tight text-cream sm:text-5xl">
          ¡Ya lo tienes{nombre ? `, ${nombre}` : ''}!
        </h1>
        <p className="mt-4 text-lg text-cream/75">
          Gracias por descargarte el ebook «{ebookTitle}». Aquí tienes el enlace directo para
          bajártelo:
        </p>

        {/* Descarga directa */}
        <div className="mt-7">
          <a
            href={ebookPdf}
            download
            className="btn-primary"
          >
            Descargar ebook (PDF)
            <ArrowRightIcon className="h-5 w-5" />
          </a>
        </div>

        <div className="mt-10 space-y-3 border-l-2 border-gold/40 pl-5 text-cream/75">
          <p>Este libro es corto, directo y al grano. Nada de humo ni paja. Aquí hablamos de:</p>
          <ul className="space-y-1.5 text-cream/70">
            <li>— Cómo comprar sin que te timen</li>
            <li>— Dónde encontrar relojes con margen</li>
            <li>— Qué marcas sí (y cuáles mejor ni tocar)</li>
            <li>— Y cómo empezar a moverte como un coleccionista de verdad</li>
          </ul>
        </div>

        {/* ¿Y ahora qué? → Telegram */}
        <div className="mt-10 rounded-2xl border border-cream/10 bg-graphite/50 p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-semibold text-cream">¿Y ahora qué?</h2>
          <p className="mt-2 text-cream/75">
            Únete al canal de Telegram si aún no lo has hecho. Ahí es donde salen los chollos
            buenos, los relojes que sí se venden, y donde aprendemos todos, cada semana.
          </p>
          <div className="mt-5">
            {/*
              NOTA: el email de entrega original usaba otro enlace de Telegram
              (https://t.me/+C2kkMbWHo20xODA0). Confirmar cuál es el canal canónico
              y, si procede, pasarlo como prop label/href aquí.
            */}
            <TelegramButton label="Entrar al canal" />
          </div>
        </div>

        <div className="mt-10 text-cream/70">
          <p>Nos vemos entre calibres, referencias y chollazos.</p>
          <p className="mt-4">Un saludo,</p>
          <p className="font-serif text-lg text-cream">Tony — Master Collections</p>
          <p className="mt-1 text-sm italic text-muted">
            «Aquí no vendemos humo, vendemos relojes (buenos).»
          </p>
        </div>
      </div>
    </main>
  );
}
