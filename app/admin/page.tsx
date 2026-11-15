'use client';

import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import {
  CheckIcon,
  CopyIcon,
  LockIcon,
  TelegramIcon,
  TrashIcon,
  UploadIcon,
  WatchIcon,
  WhatsAppIcon,
} from '@/components/Icons';
import { formatPrice } from '@/lib/site';
import type {
  ChannelDispatchResult,
  WatchCondition,
  WatchDelivery,
  WatchItem,
  WatchMovement,
  WatchStatus,
} from '@/lib/types';

type IntegrationStatus = {
  telegramAuto: boolean;
  whatsappAuto: boolean;
  brevoConfigured: boolean;
  customAdminPassword: boolean;
};

const CONDITIONS: WatchCondition[] = [
  'Nuevo / Sin uso',
  'Excelente',
  'Muy bueno',
  'Bueno',
];

const DELIVERIES: WatchDelivery[] = [
  'Full Set (Caja y papeles)',
  'Solo caja',
  'Solo papeles',
  'Solo reloj',
];

const MOVEMENTS: WatchMovement[] = ['Automático', 'Cuerda manual', 'Cuarzo'];

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loadingList, setLoadingList] = useState(false);

  const [watches, setWatches] = useState<WatchItem[]>([]);
  const [integrations, setIntegrations] = useState<IntegrationStatus | null>(null);

  // Estado del formulario de alta omnicanal
  const [brand, setBrand] = useState('Rolex');
  const [model, setModel] = useState('Submariner Date');
  const [reference, setReference] = useState('126610LN');
  const [year, setYear] = useState('2023');
  const [price, setPrice] = useState('12450');
  const [caseSizeMm, setCaseSizeMm] = useState('41');
  const [condition, setCondition] = useState<WatchCondition>('Excelente');
  const [delivery, setDelivery] = useState<WatchDelivery>('Full Set (Caja y papeles)');
  const [movement, setMovement] = useState<WatchMovement>('Automático');
  const [description, setDescription] = useState(
    'Acero Oystersteel, bisel Cerachrom negro, estado impecable sin pulir. Garantía oficial vigente y revisión de estanqueidad superada.',
  );
  const [images, setImages] = useState<string[]>(['/demo/placeholder.svg']);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Canales destino
  const [sendWeb, setSendWeb] = useState(true);
  const [sendTelegram, setSendTelegram] = useState(true);
  const [sendWhatsapp, setSendWhatsapp] = useState(true);

  // Pestaña de previsualización en vivo
  const [previewTab, setPreviewTab] = useState<'whatsapp' | 'telegram' | 'web'>('whatsapp');

  // Estado de envío y feedback
  const [submitting, setSubmitting] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [dispatchResults, setDispatchResults] = useState<ChannelDispatchResult[] | null>(null);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  const fetchWatches = useCallback(async (key: string) => {
    setLoadingList(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/watches', {
        headers: { 'x-admin-key': key },
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setAuthError(data.error ?? 'Clave incorrecta');
        setAuthenticated(false);
        return false;
      }
      setWatches(data.watches ?? []);
      setIntegrations(data.integrations ?? null);
      setAuthenticated(true);
      try {
        sessionStorage.setItem('mc_admin_key', key);
      } catch {
        /* ignore */
      }
      return true;
    } catch {
      setAuthError('Error de conexión con el servidor.');
      return false;
    } finally {
      setLoadingList(false);
    }
  }, []);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('mc_admin_key');
      if (saved) {
        setAdminKey(saved);
        void fetchWatches(saved);
      }
    } catch {
      /* ignore */
    }
  }, [fetchWatches]);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    await fetchWatches(adminKey);
  }

  // Texto en vivo para WhatsApp y Telegram
  const liveWhatsappText = useMemo(() => {
    const numPrice = Number(price) || 0;
    const specs: string[] = [];
    if (reference.trim()) specs.push(`▪ *Ref:* ${reference.trim()}`);
    if (year.trim()) specs.push(`▪ *Año:* ${year.trim()}`);
    if (caseSizeMm.trim()) specs.push(`▪ *Caja:* ${caseSizeMm.trim()} mm (${movement})`);
    specs.push(`▪ *Estado:* ${condition}`);
    specs.push(`▪ *Dotación:* ${delivery}`);

    return [
      `⌚ *${(brand || 'MARCA').toUpperCase()} — ${model || 'Modelo'}*`,
      `🟢 DISPONIBLE · 💶 *${formatPrice(numPrice)}*`,
      '',
      ...specs,
      '',
      description || 'Descripción del reloj...',
      '',
      `👉 *Ficha y fotos:* https://www.mastercollectionsclub.com/relojes`,
      `📩 Interesados responder por privado o en el grupo.`,
    ].join('\n');
  }, [brand, model, reference, year, price, caseSizeMm, movement, condition, delivery, description]);

  async function handlePhotoUpload(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingPhoto(true);
    setSubmitError('');
    try {
      const uploadedUrls: string[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'x-admin-key': adminKey },
          body: fd,
        });
        const data = await res.json();
        if (res.ok && data.ok && data.url) {
          uploadedUrls.push(data.url);
        } else {
          setSubmitError(data.error ?? 'Error al subir imagen.');
        }
      }
      if (uploadedUrls.length > 0) {
        setImages((prev) => [... uploadedUrls, ...prev.filter((p) => p !== '/demo/placeholder.svg')]);
      }
    } catch {
      setSubmitError('Error subiendo el archivo.');
    } finally {
      setUploadingPhoto(false);
      e.target.value = '';
    }
  }

  function handleAddImageUrl() {
    const trimmed = newImageUrl.trim();
    if (!trimmed) return;
    setImages((prev) => [...prev, trimmed]);
    setNewImageUrl('');
  }

  function handleRemoveImage(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handlePublishWatch(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    setDispatchResults(null);

    try {
      const res = await fetch('/api/admin/watches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({
          brand,
          model,
          reference,
          year: year ? Number(year) : null,
          price: Number(price),
          caseSizeMm: caseSizeMm ? Number(caseSizeMm) : null,
          condition,
          delivery,
          movement,
          description,
          images: images.length > 0 ? images : ['/demo/placeholder.svg'],
          channels: {
            web: sendWeb,
            telegram: sendTelegram,
            whatsapp: sendWhatsapp,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setSubmitError(data.error ?? 'Error al publicar el reloj.');
        return;
      }

      setDispatchResults(data.results ?? []);
      setLastWhatsappUrl(data.formatted?.whatsappShareUrl ?? null);
      await fetchWatches(adminKey);
    } catch {
      setSubmitError('Error de red al publicar el reloj.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStatusChange(id: string, status: WatchStatus) {
    await fetch('/api/admin/watches', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': adminKey,
      },
      body: JSON.stringify({ id, status }),
    });
    await fetchWatches(adminKey);
  }

  async function handleRepublish(id: string, channel: 'telegram' | 'whatsapp') {
    const res = await fetch('/api/admin/watches', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-key': adminKey,
      },
      body: JSON.stringify({ id, republishChannel: channel }),
    });
    const data = await res.json();
    if (data.result) {
      setDispatchResults([data.result]);
      if (channel === 'whatsapp' && data.result.externalUrl) {
        window.open(data.result.externalUrl, '_blank', 'noopener,noreferrer');
      }
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/admin/watches?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { 'x-admin-key': adminKey },
    });
    await fetchWatches(adminKey);
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch {
      /* ignore */
    }
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-5 py-12">
        <div className="w-full max-w-md rounded-2xl border border-cream/10 bg-graphite/80 p-8 shadow-2xl">
          <div className="flex items-center justify-between">
            <Logo />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
              <LockIcon className="h-3.5 w-3.5" />
              Control Room
            </span>
          </div>

          <h1 className="mt-6 font-serif text-2xl font-semibold text-cream">
            Panel de Publicación Omnicanal
          </h1>
          <p className="mt-2 text-sm text-muted">
            Sube un reloj una sola vez y publícalo en la Web, Telegram y WhatsApp.
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin-key" className="mb-1.5 block text-xs font-medium text-cream">
                Clave de acceso (`ADMIN_PASSWORD`)
              </label>
              <input
                id="admin-key"
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Introduce la clave..."
                required
                className="w-full rounded-xl border border-cream/15 bg-ink px-4 py-3 text-sm text-cream placeholder:text-muted/50 focus:border-gold"
              />
            </div>

            {authError && <p className="text-xs text-red-400">{authError}</p>}

            <button
              type="submit"
              disabled={loadingList}
              className="btn-primary w-full py-3.5 text-sm"
            >
              {loadingList ? 'Verificando...' : 'Entrar al panel /admin'}
            </button>
          </form>

          <div className="mt-6 border-t border-cream/10 pt-4 text-center">
            <Link href="/" className="text-xs text-muted hover:text-cream">
              ← Volver a la web pública
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-ink pb-24">
      {/* Barra superior de administración */}
      <header className="sticky top-0 z-30 border-b border-cream/10 bg-ink/90 backdrop-blur-md">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
              Admin · Publicador Omnicanal
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link href="/relojes" className="btn-ghost px-4 py-2 text-xs">
              Ver catálogo web ({watches.filter((w) => w.publishedChannels.web).length})
            </Link>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem('mc_admin_key');
                setAuthenticated(false);
              }}
              className="rounded-full border border-cream/15 px-4 py-2 text-muted hover:text-cream"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="container-page mt-8 space-y-12">
        {/* Estado de los 3 canales */}
        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-cream/10 bg-graphite/50 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                1. Web Master Collections
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950 px-2.5 py-0.5 text-[11px] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                100% Automático
              </span>
            </div>
            <p className="mt-2 text-xs text-muted">
              Publica al instante en la sección de inicio (`/#relojes`) y en el catálogo (`/relojes`).
            </p>
          </div>

          <div className="rounded-2xl border border-cream/10 bg-graphite/50 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-action">
                2. Canal / Grupo Telegram
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] ${
                  integrations?.telegramAuto
                    ? 'bg-emerald-950 text-emerald-300'
                    : 'bg-amber-950 text-amber-300'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    integrations?.telegramAuto ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                {integrations?.telegramAuto ? 'Bot API Conectado' : 'Modo 1-Clic (Falta Token)'}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted">
              {integrations?.telegramAuto
                ? 'Envía foto/álbum + ficha HTML + botones automáticamente al grupo.'
                : 'Configura TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID en el hosting para envío 100% automático.'}
            </p>
          </div>

          <div className="rounded-2xl border border-cream/10 bg-graphite/50 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                3. Comunidad WhatsApp
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] ${
                  integrations?.whatsappAuto
                    ? 'bg-emerald-950 text-emerald-300'
                    : 'bg-emerald-950/70 text-emerald-300'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {integrations?.whatsappAuto ? 'Webhook Activo' : ' Lanzador 1-Clic + Webhook'}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted">
              Genera el copy con formato nativo de WhatsApp + enlace directo `wa.me` y soporta Webhook automático (Whapi/Evolution).
            </p>
          </div>
        </section>

        {/* Grid principal: Formulario a la izquierda, Previsualización Omnicanal a la derecha */}
        <section className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* FORMULARIO DE SUBIDA DE RELOJ */}
          <form
            onSubmit={handlePublishWatch}
            className="space-y-6 rounded-2xl border border-cream/10 bg-graphite/60 p-6 sm:p-8"
          >
            <div className="border-b border-cream/10 pb-4">
              <span className="eyebrow">Nueva pieza</span>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-cream">
                Subir reloj y distribuir a canales
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-cream">Marca *</label>
                <input
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Ej: Rolex, Omega, Tudor..."
                  className="w-full rounded-xl border border-cream/15 bg-ink px-3.5 py-2.5 text-sm text-cream focus:border-gold"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-cream">Modelo *</label>
                <input
                  type="text"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Ej: Submariner Date"
                  className="w-full rounded-xl border border-cream/15 bg-ink px-3.5 py-2.5 text-sm text-cream focus:border-gold"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-cream">Referencia</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Ej: 126610LN"
                  className="w-full rounded-xl border border-cream/15 bg-ink px-3.5 py-2.5 font-mono text-sm text-cream focus:border-gold"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-cream">Precio (€) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="12450"
                  className="w-full rounded-xl border border-cream/15 bg-ink px-3.5 py-2.5 text-sm font-semibold text-gold-bright focus:border-gold"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-cream">Año</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2023"
                  className="w-full rounded-xl border border-cream/15 bg-ink px-3.5 py-2.5 text-sm text-cream focus:border-gold"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-cream">Diámetro (mm)</label>
                <input
                  type="number"
                  value={caseSizeMm}
                  onChange={(e) => setCaseSizeMm(e.target.value)}
                  placeholder="41"
                  className="w-full rounded-xl border border-cream/15 bg-ink px-3.5 py-2.5 text-sm text-cream focus:border-gold"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-cream">Estado</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as WatchCondition)}
                  className="w-full rounded-xl border border-cream/15 bg-ink px-3.5 py-2.5 text-sm text-cream focus:border-gold"
                >
                  {CONDITIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-cream">Dotación</label>
                <select
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value as WatchDelivery)}
                  className="w-full rounded-xl border border-cream/15 bg-ink px-3.5 py-2.5 text-sm text-cream focus:border-gold"
                >
                  {DELIVERIES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-cream"> Movimiento</label>
              <div className="flex flex-wrap gap-2">
                {MOVEMENTS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMovement(m)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                      movement === m
                        ? 'border-gold bg-gold/20 text-gold-bright'
                        : 'border-cream/15 bg-ink text-muted hover:text-cream'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* FOTOS DEL RELOJ */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-cream">
                Fotos del reloj (sube archivos o pega URL)
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gold/40 bg-gold/10 px-4 py-2.5 text-xs font-semibold text-gold-bright transition-colors hover:bg-gold/20">
                  <UploadIcon className="h-4 w-4" />
                  {uploadingPhoto ? 'Subiendo...' : 'Subir fotos desde dispositivo'}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                <div className="flex flex-1 items-center gap-2">
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="O pega URL de imagen (https://...)"
                    className="w-full rounded-xl border border-cream/15 bg-ink px-3.5 py-2 text-xs text-cream"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className=" shrink-0 rounded-xl border border-cream/20 px-3 py-2 text-xs text-cream hover:border-gold"
                  >
                    Añadir
                  </button>
                </div>
              </div>

              {images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {images.map((img, i) => (
                    <div
                      key={`${img}-${i}`}
                      className="group relative h-20 w-20 overflow-hidden rounded-xl border border-cream/15 bg-ink p-1"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="" className="h-full w-full object-contain" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(i)}
                        className="absolute right-1 top-1 rounded-full bg-black/80 p-1 text-red-400 opacity-0 transition-opacity group-hover:opacity-100"
                        title="Quitar foto"
                      >
                        <TrashIcon className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* DESCRIPCIÓN */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-cream">
                Descripción y notas de Toni *
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Estado real de la caja/brazalete, historial de revisión, qué incluye y por qué es buena oportunidad..."
                className="w-full rounded-xl border border-cream/15 bg-ink p-3.5 text-sm text-cream focus:border-gold"
              />
            </div>

            {/* SELECTOR DE CANALES */}
            <div className="rounded-xl border border-cream/10 bg-ink/70 p-4">
              <span className="block text-xs font-semibold uppercase tracking-wider text-gold">
                Dónde publicar al guardar:
              </span>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-cream/10 bg-graphite/60 p-3 text-xs font-medium text-cream">
                  <input
                    type="checkbox"
                    checked={sendWeb}
                    onChange={(e) => setSendWeb(e.target.checked)}
                    className="h-4 w-4 accent-gold"
                  />
                  <WatchIcon className="h-4 w-4 text-gold" />
                  La Web (`/relojes`)
                </label>

                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-cream/10 bg-graphite/60 p-3 text-xs font-medium text-cream">
                  <input
                    type="checkbox"
                    checked={sendTelegram}
                    onChange={(e) => setSendTelegram(e.target.checked)}
                    className="h-4 w-4 accent-action"
                  />
                  <TelegramIcon className="h-4 w-4 text-action" />
                  Telegram
                </label>

                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-cream/10 bg-graphite/60 p-3 text-xs font-medium text-cream">
                  <input
                    type="checkbox"
                    checked={sendWhatsapp}
                    onChange={(e) => setSendWhatsapp(e.target.checked)}
                    className="h-4 w-4 accent-emerald-400"
                  />
                  <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
                  WhatsApp
                </label>
              </div>
            </div>

            {submitError && (
              <p role="alert" className="rounded-xl border border-red-500/30 bg-red-950/50 p-3 text-xs text-red-300">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full py-4 text-base"
            >
              {submitting
                ? 'Publicando en los canales seleccionados...'
                : 'Publicar reloj en Web + Telegram + WhatsApp'}
            </button>

            {/* RESULTADO DEL ENVÍO MULTICANAL */}
            {dispatchResults && (
              <div className="space-y-3 rounded-xl border border-gold/40 bg-ink p-5">
                <h3 className="font-serif text-lg font-semibold text-cream">
                  Resultado de la distribución omnicanal
                </h3>
                <ul className="space-y-2 text-xs">
                  {dispatchResults.map((r) => (
                    <li
                      key={r.channel}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-cream/10 bg-graphite/60 px-3.5 py-2.5"
                    >
                      <div>
                        <span className="font-semibold uppercase text-gold">{r.channel}: </span>
                        <span className="text-cream/85">{r.detail}</span>
                      </div>
                      {r.externalUrl && (
                        <a
                          href={r.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-gold/20 px-3 py-1 font-semibold text-gold-bright hover:bg-gold/30"
                        >
                          Abrir {r.channel === 'whatsapp' ? 'WhatsApp 1-Clic' : r.channel} →
                        </a>
                      )}
                    </li>
                  ))}
                </ul>

                {lastWhatsappUrl && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    <a
                      href={lastWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Enviar ahora al grupo de WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(liveWhatsappText)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 px-4 py-2 text-xs text-cream hover:border-gold"
                    >
                      {copiedText ? <CheckIcon className="h-4 w-4 text-emerald-400" /> : <CopyIcon className="h-4 w-4" />}
                      {copiedText ? '¡Texto copiado!' : 'Copiar texto formateado'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </form>

          {/* COLUMNA DERECHA: PREVISUALIZACIÓN EN TIEMPO REAL */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-cream/10 bg-graphite/60 p-6">
              <div className="flex items-center justify-between border-b border-cream/10 pb-4">
                <div>
                  <span className="eyebrow">Live Preview</span>
                  <h3 className="mt-1 font-serif text-xl font-semibold text-cream">
                    Así se verá tu publicación
                  </h3>
                </div>

                <div className="flex rounded-full border border-cream/15 bg-ink p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setPreviewTab('whatsapp')}
                    className={`rounded-full px-3 py-1 font-medium transition-colors ${
                      previewTab === 'whatsapp' ? 'bg-emerald-600 text-white' : 'text-muted hover:text-cream'
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab('telegram')}
                    className={`rounded-full px-3 py-1 font-medium transition-colors ${
                      previewTab === 'telegram' ? 'bg-action text-white' : 'text-muted hover:text-cream'
                    }`}
                  >
                    Telegram
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab('web')}
                    className={`rounded-full px-3 py-1 font-medium transition-colors ${
                      previewTab === 'web' ? 'bg-gold text-ink' : 'text-muted hover:text-cream'
                    }`}
                  >
                    Web
                  </button>
                </div>
              </div>

              {/* Vista previa del mensaje */}
              {previewTab === 'whatsapp' && (
                <div className="mt-5 space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-emerald-500/25 bg-[#0b141a] p-4 shadow-inner">
                    <div className="mb-3 aspect-video overflow-hidden rounded-xl bg-ink/80 p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={images[0] ?? '/demo/placeholder.svg'}
                        alt="Preview"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-[#e9edef]">
                      {liveWhatsappText}
                    </pre>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(liveWhatsappText)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-cream/20 bg-ink px-4 py-2.5 text-xs font-medium text-cream hover:border-gold"
                    >
                      {copiedText ? <CheckIcon className="h-4 w-4 text-emerald-400" /> : <CopyIcon className="h-4 w-4" />}
                      {copiedText ? '¡Copiado al portapapeles!' : 'Copiar mensaje WhatsApp'}
                    </button>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(liveWhatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Compartir en 1 clic
                    </a>
                  </div>
                </div>
              )}

              {previewTab === 'telegram' && (
                <div className="mt-5 space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-action/30 bg-[#17212b] p-4">
                    <div className="mb-3 aspect-video overflow-hidden rounded-xl bg-ink/80 p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={images[0] ?? '/demo/placeholder.svg'}
                        alt="Preview"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="space-y-2 text-xs leading-relaxed text-white">
                      <p className="font-bold">
                        ⌚ {brand.toUpperCase()} — {model}
                      </p>
                      <p className="font-semibold text-emerald-300">
                        🟢 DISPONIBLE · {formatPrice(Number(price) || 0)}
                      </p>
                      <ul className="space-y-0.5 text-white/85">
                        {reference && <li>• Ref: {reference}</li>}
                        {year && <li>• Año: {year}</li>}
                        {caseSizeMm && <li>• Diámetro: {caseSizeMm} mm ({movement})</li>}
                        <li>• Estado: {condition}</li>
                        <li>• Dotación: {delivery}</li>
                      </ul>
                      <p className="pt-1 text-white/80">{description}</p>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-1.5 border-t border-white/10 pt-3 text-center text-[11px] font-medium text-action">
                      <span className="rounded bg-white/5 py-1.5">⌚ Ver ficha en la web</span>
                      <span className="rounded bg-white/5 py-1.5">💬 Consultar</span>
                    </div>
                  </div>
                </div>
              )}

              {previewTab === 'web' && (
                <div className="mt-5">
                  <div className="overflow-hidden rounded-2xl border border-cream/10 bg-ink p-5">
                    <div className="aspect-[4/3] overflow-hidden rounded-xl bg-graphite p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={images[0] ?? '/demo/placeholder.svg'}
                        alt="Preview"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="mt-4 flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                          {brand}
                        </span>
                        <h4 className="font-serif text-lg font-semibold text-cream">{model}</h4>
                      </div>
                      <span className="font-serif text-lg font-semibold text-gold-bright">
                        {formatPrice(Number(price) || 0)}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-cream/70 line-clamp-2">{description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* INVENTARIO DE RELOJES PUBLICADOS */}
        <section className="rounded-2xl border border-cream/10 bg-graphite/50 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cream/10 pb-4">
            <div>
              <span className="eyebrow">Inventario activo</span>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-cream">
                Relojes en catálogo ({watches.length})
              </h2>
            </div>
          </div>

          <div className="mt-6 divide-y divide-cream/10">
            {watches.map((w) => (
              <div
                key={w.id}
                className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-cream/10 bg-ink p-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={w.images[0] ?? '/demo/placeholder.svg'}
                      alt={w.model}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                        {w.brand}
                      </span>
                      {w.reference && (
                        <span className="rounded bg-ink px-2 py-0.5 font-mono text-[11px] text-muted">
                          Ref. {w.reference}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-cream">{w.model}</h3>
                    <p className="text-sm font-medium text-gold-bright">{formatPrice(w.price)}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Selector de estado en vivo */}
                  <select
                    value={w.status}
                    onChange={(e) => void handleStatusChange(w.id, e.target.value as WatchStatus)}
                    aria-label={`Estado de ${w.brand} ${w.model}`}
                    className="rounded-full border border-cream/15 bg-ink px-3.5 py-1.5 text-xs font-medium text-cream focus:border-gold"
                  >
                    <option value="disponible">🟢 Disponible</option>
                    <option value="reservado">🟡 Reservado</option>
                    <option value="vendido">🔴 Vendido</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => void handleRepublish(w.id, 'telegram')}
                    className="inline-flex items-center gap-1.5 rounded-full border border-action/40 bg-action/10 px-3 py-1.5 text-xs font-medium text-action hover:bg-action/20"
                    title="Reenviar a Telegram"
                  >
                    <TelegramIcon className="h-3.5 w-3.5" />
                    Telegram
                  </button>

                  <button
                    type="button"
                    onClick={() => void handleRepublish(w.id, 'whatsapp')}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-500/20"
                    title="Compartir en WhatsApp"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={() => void handleDelete(w.id)}
                    className="inline-flex items-center justify-center rounded-full border border-red-500/30 bg-red-950/40 p-2 text-red-300 hover:bg-red-900/50"
                    title="Eliminar reloj"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
