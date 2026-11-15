import { getImage } from '@/lib/watches';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Sirve las fotos subidas desde /admin (guardadas en Netlify Blobs). */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[A-Za-z0-9_-]{8,40}$/.test(id)) {
    return new Response('Not found', { status: 404 });
  }

  try {
    const image = await getImage(id);
    if (!image) return new Response('Not found', { status: 404 });

    return new Response(image.data, {
      headers: {
        'Content-Type': image.contentType,
        'Content-Length': String(image.data.byteLength),
        // Las fotos son inmutables: el id cambia en cada subida.
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('[images] Error al leer la imagen:', error);
    return new Response('Error', { status: 500 });
  }
}
