'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { TelegramButton } from '@/components/TelegramButton';
import { ArrowRightIcon } from '@/components/Icons';
import { ebookPdf, ebookTitle } from '@/lib/site';

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
    <main className="relative isolate flex min-h-screen flex-col bg-grid-pattern px-4 py-6 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(70% 50% at 50% 0%, rgba(37,211,102,0.15) 0%, rgba(7,8,10,0) 60%)',
        }}
      />

      <header className="mx-auto w-full max-w-2xl">
        <Logo />
      </header>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center py-10 sm:py-12">
        <span className="eyebrow">DESCARGA DESBLOQUEADA</span>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-cream sm:mt-4 sm:text-5xl">
          ¡Ya lo tienes dentro{nombre ? `, ${nombre}` : ''}!
        </h1>
        <p className="mt-3 text-base text-muted sm:text-lg">
          Aquí tienes tu copia directa de «{ebookTitle}» (PDF de 70 páginas):
        </p>

        <div className="mt-6">
          <a href={ebookPdf} download className="btn-primary w-full sm:w-auto">
            <span>Descargar ebook ahora (PDF)</span>
            <ArrowRightIcon className="h-5 w-5" />
          </a>
        </div>

        {/* Siguiente paso: Canal de WhatsApp */}
        <div className="mt-8 rounded-2xl border border-gold/30 bg-graphite p-5 sm:mt-10 sm:p-8">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-gold">
            PASO 2 · OBLIGATORIO SI TE GUSTAN LOS RELOJES
          </span>
          <h2 className="mt-2 font-display text-xl font-bold text-cream sm:text-2xl">
            Entra al grupo de WhatsApp antes de irte
          </h2>
          <p className="mt-2 text-sm text-muted sm:text-base">
            El libro te da la base, pero en el canal de WhatsApp y Telegram es donde lanzamos los
            relojes con margen real y comentamos el mercado cada semana.
          </p>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <WhatsAppButton label="Entrar al grupo de WhatsApp" className="w-full sm:w-auto" />
            <TelegramButton label="Unirme a Telegram" className="w-full sm:w-auto" />
          </div>
        </div>

        <div className="mt-8 text-sm text-muted">
          <p>Nos vemos entre calibres, referencias y chollazos.</p>
          <p className="mt-3 font-display text-base font-bold text-cream">
            Toni — Master Collections
          </p>
          <p className="mt-0.5 font-mono text-xs text-gold">
            «Aquí no vendemos humo, movemos relojes de verdad.»
          </p>
        </div>
      </div>
    </main>
  );
}
