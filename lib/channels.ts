import { formatPrice, links, siteUrl } from './site';
import type { ChannelDispatchResult, WatchItem } from './types';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function statusBadge(status: WatchItem['status']): string {
  if (status === 'vendido') return '🔴 VENDIDO';
  if (status === 'reservado') return '🟡 RESERVADO';
  return '🟢 DISPONIBLE';
}

/**
 * Genera el mensaje HTML listo para Telegram Bot API (parse_mode: 'HTML').
 */
export function formatWatchForTelegram(watch: WatchItem): string {
  const title = `${watch.brand.toUpperCase()} — ${watch.model}`;
  const specs: string[] = [];

  if (watch.reference) specs.push(`• <b>Ref:</b> <code>${escapeHtml(watch.reference)}</code>`);
  if (watch.year) specs.push(`• <b>Año:</b> ${watch.year}`);
  if (watch.caseSizeMm) specs.push(`• <b>Diámetro:</b> ${watch.caseSizeMm} mm (${watch.movement})`);
  specs.push(`• <b>Estado:</b> ${escapeHtml(watch.condition)}`);
  specs.push(`• <b>Dotación:</b> ${escapeHtml(watch.delivery)}`);

  const watchUrl = `${siteUrl}/relojes#${watch.slug}`;

  return [
    `⌚ <b>${escapeHtml(title)}</b>`,
    `${statusBadge(watch.status)} · <b>${formatPrice(watch.price)}</b>`,
    '',
    ...specs,
    '',
    escapeHtml(watch.description),
    '',
    `🔗 <a href="${watchUrl}">Ver ficha en Master Collections</a>`,
  ].join('\n');
}

/**
 * Genera el mensaje con formato nativo de WhatsApp (*negrita*, _cursiva_).
 */
export function formatWatchForWhatsApp(watch: WatchItem): string {
  const title = `${watch.brand.toUpperCase()} — ${watch.model}`;
  const specs: string[] = [];

  if (watch.reference) specs.push(`▪ *Ref:* ${watch.reference}`);
  if (watch.year) specs.push(`▪ *Año:* ${watch.year}`);
  if (watch.caseSizeMm) specs.push(`▪ *Caja:* ${watch.caseSizeMm} mm (${watch.movement})`);
  specs.push(`▪ *Estado:* ${watch.condition}`);
  specs.push(`▪ *Dotación:* ${watch.delivery}`);

  const watchUrl = `${siteUrl}/relojes#${watch.slug}`;

  return [
    `⌚ *${title}*`,
    `${statusBadge(watch.status)} · 💶 *${formatPrice(watch.price)}*`,
    '',
    ...specs,
    '',
    watch.description,
    '',
    `👉 *Ficha y fotos:* ${watchUrl}`,
    `🟢 *Canal Oficial WhatsApp:* ${links.whatsapp}`,
  ].join('\n');
}

/**
 * Construye una URL absoluta de imagen para enviarla a Telegram/WhatsApp.
 */
function resolveImageUrl(img: string): string {
  if (img.startsWith('http://') || img.startsWith('https://')) return img;
  return `${siteUrl}${img.startsWith('/') ? '' : '/'}${img}`;
}

/**
 * Publica automáticamente en el canal/grupo de Telegram usando Telegram Bot API.
 * Soporta tanto 1 foto (sendPhoto con botón inline) como múltiples fotos (sendMediaGroup).
 */
export async function publishToTelegram(watch: WatchItem): Promise<ChannelDispatchResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return {
      channel: 'telegram',
      ok: true,
      mode: 'manual_ready',
      detail:
        'Texto listo para copiar. Para envío 100% automático, añade TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID en .env / Netlify.',
      externalUrl: links.telegram,
    };
  }

  const caption = formatWatchForTelegram(watch);
  const images = watch.images.map(resolveImageUrl);
  const watchUrl = `${siteUrl}/relojes#${watch.slug}`;

  try {
    if (images.length === 1) {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          photo: images[0],
          caption,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                { text: '⌚ Ver ficha en la web', url: watchUrl },
                { text: '💬 Consultar disponibilidad', url: links.telegram },
              ],
            ],
          },
        }),
        signal: AbortSignal.timeout(10_000),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        return {
          channel: 'telegram',
          ok: false,
          mode: 'manual_ready',
          detail: `Telegram API devolvió un error (${res.status}). Puedes copiar el mensaje manualmente.`,
        };
      }

      return {
        channel: 'telegram',
        ok: true,
        mode: 'auto',
        detail: 'Publicado automáticamente en el canal/grupo de Telegram.',
        messageId: data.result?.message_id ?? null,
      };
    }

    // Múltiples fotos -> sendMediaGroup
    const media = images.slice(0, 10).map((url, idx) => ({
      type: 'photo',
      media: url,
      ...(idx === 0 ? { caption, parse_mode: 'HTML' } : {}),
    }));

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMediaGroup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        media,
      }),
      signal: AbortSignal.timeout(12_000),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      return {
        channel: 'telegram',
        ok: false,
        mode: 'manual_ready',
        detail: `Telegram API devolvió un error (${res.status}). Puedes copiar el mensaje manualmente.`,
      };
    }

    return {
      channel: 'telegram',
      ok: true,
      mode: 'auto',
      detail: `Álbum de ${media.length} fotos publicado automáticamente en Telegram.`,
      messageId: Array.isArray(data.result) ? data.result[0]?.message_id : null,
    };
  } catch {
    return {
      channel: 'telegram',
      ok: false,
      mode: 'manual_ready',
      detail: 'Error de red al conectar con Telegram API. Texto listo para copiar manualmente.',
    };
  }
}

/**
 * Publica en WhatsApp:
 * - Si hay `WHATSAPP_WEBHOOK_URL` configurada (Whapi.cloud, Evolution API, Make/n8n),
 *   hace POST automático con las imágenes y el texto formateado.
 * - Siempre devuelve además el enlace `wa.me/?text=...` para compartir en 1 clic a
 *   grupos/comunidades desde el móvil o WhatsApp Web sin coste de API.
 */
export async function publishToWhatsApp(watch: WatchItem): Promise<ChannelDispatchResult> {
  const text = formatWatchForWhatsApp(watch);
  const waShareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
  const apiToken = process.env.WHATSAPP_API_TOKEN;
  const groupId = process.env.WHATSAPP_GROUP_ID;

  if (!webhookUrl) {
    return {
      channel: 'whatsapp',
      ok: true,
      mode: 'manual_ready',
      detail:
        'Mensaje formateado y enlace 1-clic de WhatsApp listos. (Opcional: configura WHATSAPP_WEBHOOK_URL para envío automático a grupos).',
      externalUrl: waShareUrl,
    };
  }

  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (apiToken) headers.Authorization = `Bearer ${apiToken}`;

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        to: groupId ?? undefined,
        caption: text,
        media: watch.images.map(resolveImageUrl),
        watch,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      return {
        channel: 'whatsapp',
        ok: false,
        mode: 'manual_ready',
        detail: `Webhook de WhatsApp respondió ${res.status}. Usa el botón de envío en 1 clic.`,
        externalUrl: waShareUrl,
      };
    }

    return {
      channel: 'whatsapp',
      ok: true,
      mode: 'auto',
      detail: 'Enviado automáticamente a WhatsApp vía Webhook.',
      externalUrl: waShareUrl,
    };
  } catch {
    return {
      channel: 'whatsapp',
      ok: false,
      mode: 'manual_ready',
      detail: 'No se pudo conectar al Webhook de WhatsApp. Usa el botón de envío en 1 clic.',
      externalUrl: waShareUrl,
    };
  }
}

/**
 * Estado de configuración de las integraciones en el servidor.
 */
export function getIntegrationStatus() {
  return {
    telegramAuto: Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
    whatsappAuto: Boolean(process.env.WHATSAPP_WEBHOOK_URL),
    brevoConfigured: Boolean(process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID),
    customAdminPassword: Boolean(process.env.ADMIN_PASSWORD),
  };
}
