import { NextResponse } from 'next/server';

/**
 * Captura de leads del ebook.
 *
 * Recibe { nombre, email } y guarda el contacto. Es AGNÓSTICO de proveedor:
 * - Si hay variables de entorno de Brevo configuradas, añade el contacto a tu lista.
 * - Si NO hay nada configurado todavía, igualmente devuelve ok (stored:false) para
 *   que la descarga del ebook funcione desde el primer día. Configuras el guardado
 *   cuando quieras pegando tu API key.
 *
 * Para activar el guardado en Brevo (gratis, contactos ilimitados):
 *   1. Crea cuenta en https://www.brevo.com y una lista de contactos.
 *   2. Copia tu API key (Settings → SMTP & API → API Keys).
 *   3. Añade en Vercel (Project → Settings → Environment Variables):
 *        BREVO_API_KEY = xkeysib-...
 *        BREVO_LIST_ID = 3          (el ID numérico de tu lista)
 *   4. Redeploy. Listo.
 *
 * Seguridad aplicada:
 * - La API key SOLO vive en el servidor (process.env, sin NEXT_PUBLIC).
 * - Honeypot anti-bots + rate limiting básico por IP en memoria.
 * - Límite de tamaño del body, validación estricta de tipos y longitudes.
 * - Los errores internos se registran en el servidor pero NUNCA se devuelven
 *   al cliente (respuestas genéricas).
 *
 * Alternativa Google Sheets: ver README.
 */

export const runtime = 'nodejs';

type Body = {
  nombre?: unknown;
  email?: unknown;
  /** Honeypot anti-spam: debe llegar vacío. */
  website?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Tamaño máximo del body en bytes (el payload legítimo ocupa <300 B). */
const MAX_BODY_BYTES = 2_048;

/**
 * Rate limiting básico en memoria por IP: máx. 5 envíos por ventana de 10 min.
 * Sin infra nueva: en Vercel cada instancia serverless tiene su propio Map, así
 * que es un límite "best-effort" (suficiente contra spam simple; para un límite
 * estricto haría falta un almacén compartido tipo Upstash/KV).
 */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

/** Limpieza perezosa para que el Map no crezca sin límite. */
function pruneHits() {
  if (hits.size < 1_000) return;
  const now = Date.now();
  for (const [ip, entry] of hits) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) hits.delete(ip);
  }
}

function clientIp(request: Request): string {
  // En Vercel, x-forwarded-for lleva la IP real del cliente en primera posición.
  const fwd = request.headers.get('x-forwarded-for');
  return fwd ? fwd.split(',')[0].trim() : 'unknown';
}

function asTrimmedString(value: unknown, maxLen: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length <= maxLen ? trimmed : null;
}

export async function POST(request: Request) {
  pruneHits();
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: 'Demasiados intentos. Prueba de nuevo en unos minutos.' },
      { status: 429 },
    );
  }

  // Límite de tamaño: rechaza bodies anormalmente grandes antes de parsear.
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json({ ok: false, error: 'Petición no válida.' }, { status: 400 });
  }
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: 'Petición no válida.' }, { status: 413 });
  }

  let body: Body;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: 'Petición no válida.' }, { status: 400 });
  }
  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ ok: false, error: 'Petición no válida.' }, { status: 400 });
  }

  // Trampa anti-bots: si el honeypot viene relleno, fingimos éxito y descartamos.
  if (typeof body.website === 'string' && body.website !== '') {
    return NextResponse.json({ ok: true, stored: false });
  }

  const nombre = asTrimmedString(body.nombre, 80);
  const email = asTrimmedString(body.email, 254)?.toLowerCase() ?? null;

  if (!nombre) {
    return NextResponse.json({ ok: false, error: 'Escribe tu nombre.' }, { status: 422 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Email no válido.' }, { status: 422 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  // Sin configurar todavía: dejamos descargar igualmente.
  if (!apiKey || !listId) {
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes: { NOMBRE: nombre },
        listIds: [Number(listId)],
        updateEnabled: true,
      }),
      // Si Brevo no responde, no dejamos la función colgada.
      signal: AbortSignal.timeout(8_000),
    });

    // Brevo devuelve 201 (creado) o 204 (actualizado). Un email duplicado no es un error real.
    if (res.ok || res.status === 204) {
      return NextResponse.json({ ok: true, stored: true });
    }

    const detail = await res.json().catch(() => ({}));
    if (detail?.code === 'duplicate_parameter') {
      return NextResponse.json({ ok: true, stored: true });
    }

    // El guardado falló, pero no bloqueamos la descarga del usuario ni
    // exponemos el detalle del error al cliente.
    console.error('Brevo error:', res.status, detail);
    return NextResponse.json({ ok: true, stored: false });
  } catch (err) {
    console.error('Lead capture error:', err);
    return NextResponse.json({ ok: true, stored: false });
  }
}
