import { NextResponse } from 'next/server';
import { checkAdmin } from '@/lib/admin-auth';
import { saveImage } from '@/lib/watches';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

/** Comprueba la firma real del archivo (no basta con fiarse del Content-Type). */
function matchesSignature(type: string, b: Buffer): boolean {
  switch (type) {
    case 'image/jpeg':
      return b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
    case 'image/png':
      return b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    case 'image/webp':
      return b.subarray(0, 4).toString('ascii') === 'RIFF' && b.subarray(8, 12).toString('ascii') === 'WEBP';
    case 'image/avif':
      return b.subarray(4, 12).toString('ascii').startsWith('ftyp');
    default:
      return false;
  }
}

export async function POST(request: Request) {
  const denied = checkAdmin(request);
  if (denied) return denied;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'No se pudo leer el archivo subido.' },
      { status: 400 },
    );
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'Ningún archivo recibido.' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { ok: false, error: 'Formato no permitido. Usa JPG, PNG, WebP o AVIF.' },
      { status: 400 },
    );
  }

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      { ok: false, error: 'La imagen supera el límite de 5 MB.' },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!matchesSignature(file.type, buffer)) {
    return NextResponse.json(
      { ok: false, error: 'El archivo no es una imagen válida.' },
      { status: 400 },
    );
  }

  try {
    const url = await saveImage(file.type, buffer);
    return NextResponse.json({ ok: true, url });
  } catch (error) {
    console.error('[admin] No se pudo guardar la imagen:', error);
    return NextResponse.json(
      { ok: false, error: 'No se pudo guardar la imagen. Inténtalo de nuevo.' },
      { status: 500 },
    );
  }
}
