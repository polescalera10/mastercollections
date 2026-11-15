import { randomBytes } from 'node:crypto';
import { buildDemoWatches } from './demo-watches';
import { isDemo } from './site';
import { blobExists, hasStorage, imageStore, watchStore } from './storage';
import type { CreateWatchInput, WatchItem, WatchStatus } from './types';

export { hasStorage };

/** Foto por defecto cuando una pieza no tiene imágenes. */
export const PLACEHOLDER_IMAGE = '/demo/placeholder.svg';

const SEEDED_KEY = '_meta/seeded';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * En el despliegue de demo, carga los datos ficticios la primera vez que se lee el
 * catálogo. Un marcador evita volver a sembrarlo si luego se borran todas las piezas.
 */
async function ensureDemoSeed(): Promise<void> {
  if (!isDemo) return;
  const store = watchStore();
  if (await blobExists(store, SEEDED_KEY)) return;
  const { blobs } = await store.list({ prefix: 'w/' });
  if (blobs.length === 0) {
    await Promise.all(
      buildDemoWatches().map((watch) => store.setJSON(`w/${watch.id}`, watch)),
    );
  }
  await store.set(SEEDED_KEY, new Date().toISOString());
}

async function readWatch(id: string): Promise<WatchItem | null> {
  const store = watchStore();
  if (!(await blobExists(store, `w/${id}`))) return null;
  return (await store.get(`w/${id}`, { type: 'json' })) as WatchItem | null;
}

export async function getAllWatches(): Promise<WatchItem[]> {
  if (!hasStorage()) return [];
  await ensureDemoSeed();
  const store = watchStore();
  const { blobs } = await store.list({ prefix: 'w/' });
  const items = await Promise.all(
    blobs.map((b) => store.get(b.key, { type: 'json' }) as Promise<WatchItem | null>),
  );
  return items
    .filter((w): w is WatchItem => Boolean(w))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getPublicWatches(): Promise<WatchItem[]> {
  try {
    const items = await getAllWatches();
    return items.filter((w) => w.publishedChannels.web);
  } catch (error) {
    // La web pública nunca debe romperse por un fallo del almacenamiento.
    console.error('[watches] No se pudo leer el catálogo:', error);
    return [];
  }
}

export async function getWatchById(id: string): Promise<WatchItem | null> {
  if (!hasStorage()) return null;
  const direct = await readWatch(id);
  if (direct) return direct;
  const all = await getAllWatches();
  return all.find((w) => w.slug === id) ?? null;
}

export async function createWatch(
  input: CreateWatchInput,
  telegramMessageId?: number | null,
): Promise<WatchItem> {
  if (!hasStorage()) throw new Error('Almacenamiento no configurado.');

  const suffix = randomBytes(3).toString('hex');
  const id = `mc-${Date.now().toString(36)}-${suffix}`;
  const baseSlug = slugify(`${input.brand}-${input.model}-${input.reference ?? ''}`);

  const watch: WatchItem = {
    id,
    slug: `${baseSlug || 'reloj'}-${suffix}`,
    brand: input.brand.trim(),
    model: input.model.trim(),
    reference: (input.reference ?? '').trim(),
    year: input.year ?? null,
    price: Math.round(Number(input.price)),
    condition: input.condition,
    delivery: input.delivery,
    caseSizeMm: input.caseSizeMm ?? null,
    movement: input.movement ?? 'Automático',
    description: input.description.trim(),
    images: input.images.length > 0 ? input.images : [PLACEHOLDER_IMAGE],
    status: input.status ?? 'disponible',
    featured: input.featured ?? true,
    createdAt: new Date().toISOString(),
    publishedChannels: {
      web: input.channels.web,
      telegram: input.channels.telegram,
      whatsapp: input.channels.whatsapp,
      telegramMessageId: telegramMessageId ?? null,
    },
  };

  await watchStore().setJSON(`w/${id}`, watch);
  return watch;
}

export async function updateWatchStatus(
  id: string,
  status: WatchStatus,
): Promise<WatchItem | null> {
  if (!hasStorage()) return null;
  const store = watchStore();
  const current = await readWatch(id);
  if (!current) return null;
  const updated: WatchItem = { ...current, status };
  await store.setJSON(`w/${id}`, updated);
  return updated;
}

export async function deleteWatch(id: string): Promise<boolean> {
  if (!hasStorage()) return false;
  const store = watchStore();
  const current = await readWatch(id);
  if (!current) return false;
  await store.delete(`w/${id}`);

  // Limpia las fotos subidas que ya no usa ninguna pieza.
  const images = imageStore();
  await Promise.all(
    (current.images ?? []).map((src) => {
      const key = /^\/api\/images\/([A-Za-z0-9_-]+)$/.exec(src)?.[1];
      return key ? images.delete(key) : Promise.resolve();
    }),
  );
  return true;
}

/* ------------------------------ Imágenes ------------------------------ */

export async function saveImage(contentType: string, data: Buffer): Promise<string> {
  if (!hasStorage()) throw new Error('Almacenamiento no configurado.');
  const id = randomBytes(12).toString('base64url');
  const bytes = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
  await imageStore().set(id, bytes, { metadata: { contentType } });
  return `/api/images/${id}`;
}

export async function getImage(
  id: string,
): Promise<{ contentType: string; data: ArrayBuffer } | null> {
  if (!hasStorage()) return null;
  const store = imageStore();
  if (!(await blobExists(store, id))) return null;
  const result = await store.getWithMetadata(id, { type: 'arrayBuffer' });
  if (!result) return null;
  return {
    contentType: String(result.metadata?.contentType ?? 'application/octet-stream'),
    data: result.data,
  };
}
