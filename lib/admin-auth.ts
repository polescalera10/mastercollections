import { createHash, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';
import { hasStorage } from './storage';

/**
 * Autenticación del panel /admin y de sus APIs.
 *
 * - No hay contraseña por defecto: sin `ADMIN_PASSWORD` el panel queda desactivado.
 * - Sin almacenamiento configurado el panel también queda desactivado.
 * - Comparación en tiempo constante y límite de intentos fallidos por IP.
 */

const MAX_FAILED_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;
const failedAttempts = new Map<string, { count: number; resetAt: number }>();

function digest(value: string): Buffer {
  return createHash('sha256').update(value).digest();
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-nf-client-connection-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0];
  return (forwarded ?? 'unknown').trim();
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD?.trim()) && hasStorage();
}

/**
 * Devuelve `null` si la petición está autorizada o la respuesta de error
 * (503 / 429 / 401) que hay que devolver al cliente.
 */
export function checkAdmin(request: Request): NextResponse | null {
  if (!adminConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: 'El panel de administración no está configurado en este entorno.',
      },
      { status: 503 },
    );
  }

  const ip = clientIp(request);
  const now = Date.now();
  const entry = failedAttempts.get(ip);
  if (entry && entry.resetAt > now && entry.count >= MAX_FAILED_ATTEMPTS) {
    return NextResponse.json(
      { ok: false, error: 'Demasiados intentos fallidos. Prueba de nuevo en unos minutos.' },
      { status: 429 },
    );
  }

  const provided = request.headers.get('x-admin-key')?.trim() ?? '';
  const expected = process.env.ADMIN_PASSWORD!.trim();
  const valid = provided.length > 0 && timingSafeEqual(digest(provided), digest(expected));

  if (!valid) {
    const current = entry && entry.resetAt > now ? entry : { count: 0, resetAt: now + WINDOW_MS };
    current.count += 1;
    failedAttempts.set(ip, current);
    return NextResponse.json(
      { ok: false, error: 'Clave de administrador incorrecta o no proporcionada.' },
      { status: 401 },
    );
  }

  failedAttempts.delete(ip);
  return null;
}
