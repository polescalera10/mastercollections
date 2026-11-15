import { getStore } from '@netlify/blobs';

/**
 * Almacenamiento persistente sobre Netlify Blobs (clave-valor, incluido en todos
 * los planes). Netlify inyecta las credenciales en producción y en `netlify dev`.
 *
 * Fuera de Netlify (p. ej. el despliegue actual de Vercel) no hay almacenamiento:
 * la web sigue funcionando con el catálogo vacío y /admin queda desactivado.
 */
export function hasStorage(): boolean {
  return Boolean(
    process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT || process.env.NETLIFY_DEV,
  );
}

export const watchStore = () => getStore({ name: 'watches', consistency: 'strong' });
export const imageStore = () => getStore({ name: 'images', consistency: 'strong' });

type Store = ReturnType<typeof watchStore>;

/**
 * `get` sobre una clave inexistente se queda colgado en Netlify Blobs con consistencia
 * "strong" (hasta agotar el timeout de la función). Se comprueba la existencia con
 * `list` antes de leer.
 */
export async function blobExists(store: Store, key: string): Promise<boolean> {
  const { blobs } = await store.list({ prefix: key });
  return blobs.some((b) => b.key === key);
}
