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
 * Alternativa Google Sheets: ver README.
 */

export const runtime = 'nodejs';

type Body = {
  nombre?: string;
  email?: string;
  /** Honeypot anti-spam: debe llegar vacío. */
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Petición no válida.' }, { status: 400 });
  }

  const nombre = (body.nombre ?? '').trim();
  const email = (body.email ?? '').trim().toLowerCase();

  // Trampa anti-bots: si el honeypot viene relleno, fingimos éxito y descartamos.
  if (body.website) {
    return NextResponse.json({ ok: true, stored: false });
  }

  if (!nombre || nombre.length > 80) {
    return NextResponse.json({ ok: false, error: 'Escribe tu nombre.' }, { status: 422 });
  }
  if (!EMAIL_RE.test(email)) {
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
    });

    // Brevo devuelve 201 (creado) o 204 (actualizado). Un email duplicado no es un error real.
    if (res.ok || res.status === 204) {
      return NextResponse.json({ ok: true, stored: true });
    }

    const detail = await res.json().catch(() => ({}));
    if (detail?.code === 'duplicate_parameter') {
      return NextResponse.json({ ok: true, stored: true });
    }

    // El guardado falló, pero no bloqueamos la descarga del usuario.
    console.error('Brevo error:', res.status, detail);
    return NextResponse.json({ ok: true, stored: false });
  } catch (err) {
    console.error('Lead capture error:', err);
    return NextResponse.json({ ok: true, stored: false });
  }
}
