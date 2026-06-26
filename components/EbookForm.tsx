'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Formulario de captura del ebook.
 * Al enviar: guarda el lead (best-effort) y lleva a la página de gracias con la
 * descarga directa. La descarga NO depende de que el guardado tenga éxito.
 */
export function EbookForm() {
  const router = useRouter();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      nombre: String(data.get('nombre') ?? ''),
      email: String(data.get('email') ?? ''),
      website: String(data.get('website') ?? ''), // honeypot
    };

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        setError(json.error ?? 'Algo ha fallado. Inténtalo de nuevo.');
        setStatus('error');
        return;
      }

      // Recordamos el nombre para personalizar la página de gracias.
      try {
        sessionStorage.setItem('mc_nombre', payload.nombre);
      } catch {
        /* sin sessionStorage no pasa nada */
      }
      router.push('/ebook-gratis/gracias');
    } catch {
      setError('No hay conexión. Inténtalo de nuevo.');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-cream">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          maxLength={80}
          autoComplete="given-name"
          placeholder="Tu nombre"
          className="w-full rounded-xl border border-cream/15 bg-ink/60 px-4 py-3 text-cream placeholder:text-muted/60 focus:border-gold"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-cream">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="tu@email.com"
          className="w-full rounded-xl border border-cream/15 bg-ink/60 px-4 py-3 text-cream placeholder:text-muted/60 focus:border-gold"
        />
      </div>

      {/* Honeypot anti-spam: oculto para humanos */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="website">No rellenar</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-action"
        />
        <label htmlFor="consent" className="text-xs leading-relaxed text-muted">
          Acepto recibir el ebook y comunicaciones de Master Collections. Puedo darme de baja
          cuando quiera. Consulta la{' '}
          <a href="/privacidad" className="text-gold hover:underline">
            política de privacidad
          </a>
          .
        </label>
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'loading' ? 'Un segundo…' : 'Quiero el ebook gratis'}
      </button>

      <p className="text-center text-xs text-muted">
        100% gratis · Sin spam · Descarga inmediata
      </p>
    </form>
  );
}
