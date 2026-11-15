import { NextResponse } from 'next/server';
import { checkAdmin } from '@/lib/admin-auth';
import {
  createWatch,
  deleteWatch,
  getAllWatches,
  getWatchById,
  updateWatchStatus,
} from '@/lib/watches';
import {
  formatWatchForTelegram,
  formatWatchForWhatsApp,
  getIntegrationStatus,
  publishToTelegram,
  publishToWhatsApp,
} from '@/lib/channels';
import type {
  ChannelDispatchResult,
  CreateWatchInput,
  WatchCondition,
  WatchDelivery,
  WatchMovement,
  WatchStatus,
} from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_CONDITIONS: WatchCondition[] = [
  'Nuevo / Sin uso',
  'Excelente',
  'Muy bueno',
  'Bueno',
];

const VALID_DELIVERIES: WatchDelivery[] = [
  'Full Set (Caja y papeles)',
  'Solo caja',
  'Solo papeles',
  'Solo reloj',
];

const VALID_MOVEMENTS: WatchMovement[] = [
  'Automático',
  'Cuerda manual',
  'Cuarzo',
];

const VALID_STATUSES: WatchStatus[] = ['disponible', 'reservado', 'vendido'];

export async function GET(request: Request) {
  const denied = checkAdmin(request);
  if (denied) return denied;

  const watches = await getAllWatches();
  const integrations = getIntegrationStatus();

  return NextResponse.json({
    ok: true,
    watches,
    integrations,
  });
}

export async function POST(request: Request) {
  const denied = checkAdmin(request);
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Formato JSON inválido.' },
      { status: 400 },
    );
  }

  const brand = typeof body.brand === 'string' ? body.brand.trim() : '';
  const model = typeof body.model === 'string' ? body.model.trim() : '';
  const reference = typeof body.reference === 'string' ? body.reference.trim() : '';
  const description = typeof body.description === 'string' ? body.description.trim() : '';
  const price = Number(body.price);
  const year = body.year ? Number(body.year) : null;
  const caseSizeMm = body.caseSizeMm ? Number(body.caseSizeMm) : null;

  if (!brand || !model || !description || !Number.isFinite(price) || price <= 0) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Marca, modelo, precio válido y descripción son obligatorios.',
      },
      { status: 400 },
    );
  }

  const condition: WatchCondition = VALID_CONDITIONS.includes(
    body.condition as WatchCondition,
  )
    ? (body.condition as WatchCondition)
    : 'Excelente';

  const delivery: WatchDelivery = VALID_DELIVERIES.includes(
    body.delivery as WatchDelivery,
  )
    ? (body.delivery as WatchDelivery)
    : 'Full Set (Caja y papeles)';

  const movement: WatchMovement = VALID_MOVEMENTS.includes(
    body.movement as WatchMovement,
  )
    ? (body.movement as WatchMovement)
    : 'Automático';

  const status: WatchStatus = VALID_STATUSES.includes(body.status as WatchStatus)
    ? (body.status as WatchStatus)
    : 'disponible';

  const rawImages = Array.isArray(body.images) ? body.images : [];
  const images = rawImages
    .filter((img): img is string => typeof img === 'string')
    .map((img) => img.trim())
    .filter((img) => /^(\/api\/images\/[A-Za-z0-9_-]+|\/demo\/[a-z0-9-]+\.svg|https:\/\/[^\s]+)$/i.test(img))
    .slice(0, 8);

  const rawChannels =
    typeof body.channels === 'object' && body.channels !== null
      ? (body.channels as Record<string, unknown>)
      : {};

  const channels = {
    web: rawChannels.web !== false,
    telegram: rawChannels.telegram !== false,
    whatsapp: rawChannels.whatsapp !== false,
  };

  const input: CreateWatchInput = {
    brand,
    model,
    reference,
    year: year && Number.isFinite(year) ? year : null,
    price,
    condition,
    delivery,
    caseSizeMm: caseSizeMm && Number.isFinite(caseSizeMm) ? caseSizeMm : null,
    movement,
    description,
    images,
    status,
    featured: Boolean(body.featured ?? true),
    channels,
  };

  let watch;
  try {
    watch = await createWatch(input);
  } catch (error) {
    console.error('[admin] No se pudo guardar el reloj:', error);
    return NextResponse.json(
      { ok: false, error: 'No se pudo guardar el reloj. Inténtalo de nuevo.' },
      { status: 500 },
    );
  }

  const results: ChannelDispatchResult[] = [
    {
      channel: 'web',
      ok: true,
      mode: channels.web ? 'auto' : 'skipped',
      detail: channels.web
        ? 'Publicado en el escaparate de la web (/ y /relojes).'
        : 'Oculto en la web (solo canales privados).',
      externalUrl: `/relojes#${watch.slug}`,
    },
  ];

  if (channels.telegram) {
    const tgResult = await publishToTelegram(watch);
    results.push(tgResult);
  } else {
    results.push({
      channel: 'telegram',
      ok: true,
      mode: 'skipped',
      detail: 'Envío a Telegram desactivado para esta pieza.',
    });
  }

  if (channels.whatsapp) {
    const waResult = await publishToWhatsApp(watch);
    results.push(waResult);
  } else {
    results.push({
      channel: 'whatsapp',
      ok: true,
      mode: 'skipped',
      detail: 'Envío a WhatsApp desactivado para esta pieza.',
    });
  }

  return NextResponse.json({
    ok: true,
    watch,
    results,
    formatted: {
      telegram: formatWatchForTelegram(watch),
      whatsapp: formatWatchForWhatsApp(watch),
      whatsappShareUrl: `https://wa.me/?text=${encodeURIComponent(
        formatWatchForWhatsApp(watch),
      )}`,
    },
  });
}

export async function PATCH(request: Request) {
  const denied = checkAdmin(request);
  if (denied) return denied;

  let body: { id?: string; status?: WatchStatus; republishChannel?: 'telegram' | 'whatsapp' };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido.' }, { status: 400 });
  }

  if (!body.id) {
    return NextResponse.json({ ok: false, error: 'Falta el ID del reloj.' }, { status: 400 });
  }

  if (body.republishChannel) {
    const existing = await getWatchById(body.id);
    if (!existing) {
      return NextResponse.json({ ok: false, error: 'Reloj no encontrado.' }, { status: 404 });
    }
    const result =
      body.republishChannel === 'telegram'
        ? await publishToTelegram(existing)
        : await publishToWhatsApp(existing);
    return NextResponse.json({ ok: true, watch: existing, result });
  }

  if (!body.status || !VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ ok: false, error: 'Estado no válido.' }, { status: 400 });
  }

  const updated = await updateWatchStatus(body.id, body.status);
  if (!updated) {
    return NextResponse.json({ ok: false, error: 'Reloj no encontrado.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, watch: updated });
}

export async function DELETE(request: Request) {
  const denied = checkAdmin(request);
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Falta parámetro id.' }, { status: 400 });
  }

  const removed = await deleteWatch(id);
  if (!removed) {
    return NextResponse.json({ ok: false, error: 'Reloj no encontrado.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
