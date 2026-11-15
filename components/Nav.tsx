'use client';

import { useState } from 'react';
import Link from 'next/link';
import { links, navItems } from '@/lib/site';
import { Logo } from './Logo';
import { CloseIcon, MenuIcon, TelegramIcon, WhatsAppIcon } from './Icons';

/**
 * Barra de navegación Mobile-First.
 * En móvil muestra siempre el botón directo a WhatsApp + botón de menú compacto.
 */
export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="container-page mt-2.5 sm:mt-4">
        <nav
          aria-label="Navegación principal"
          className="flex items-center justify-between gap-2 rounded-2xl border border-cream/10 bg-ink/85 px-3.5 py-2.5 shadow-xl shadow-black/40 backdrop-blur-md sm:px-5"
        >
          <Logo />

          {/* Enlaces de escritorio */}
          <ul className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={
                    item.highlight
                      ? 'rounded-lg border border-gold/40 bg-gold/10 px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-gold transition-colors hover:bg-gold/20'
                      : 'text-sm font-medium text-cream/80 transition-colors hover:text-gold'
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Acciones derecha (Mobile + Desktop) */}
          <div className="flex items-center gap-2">
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Entrar al canal de WhatsApp"
              className="inline-flex h-9 w-9 items-center justify-center gap-1.5 rounded-xl bg-action font-display text-xs font-bold text-ink shadow-md shadow-action/20 transition-transform active:scale-95 min-[430px]:h-auto min-[430px]:w-auto min-[430px]:px-3.5 min-[430px]:py-2 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0" />
              <span className="hidden min-[430px]:inline">WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-cream/15 bg-graphite text-cream lg:hidden"
            >
              {mobileOpen ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Menú desplegable Mobile-First */}
        {mobileOpen && (
          <div className="mt-2 overflow-hidden rounded-2xl border border-cream/15 bg-graphite/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden">
            <ul className="grid gap-1.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 font-display text-sm font-semibold ${
                      item.highlight
                        ? 'border border-gold/30 bg-gold/10 text-gold'
                        : 'text-cream hover:bg-stone'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-muted">→</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 grid grid-cols-1 gap-2 border-t border-cream/10 pt-4 sm:grid-cols-2">
              <a
                href={links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full py-3 text-sm"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Unirme al WhatsApp
              </a>
              <a
                href={links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="btn-ghost w-full py-3 text-sm"
              >
                <TelegramIcon className="h-4 w-4 text-telegram" />
                Canal de Telegram
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
