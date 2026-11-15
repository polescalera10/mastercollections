import { ImageResponse } from 'next/og';

export const alt = 'Master Collections — Relojería sin humo y Watch Trading';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '68px 80px',
          background: '#07080A',
          backgroundImage:
            'radial-gradient(80% 80% at 85% 15%, rgba(37,211,102,0.25) 0%, rgba(212,255,0,0.10) 45%, rgba(7,8,10,0) 75%)',
          color: '#F8FAFC',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: '#D4FF00',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#07080A',
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            MC
          </div>
          <span style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, color: '#F8FAFC' }}>
            MASTER COLLECTIONS
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 960 }}>
          <span
            style={{
              fontSize: 16,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#D4FF00',
              fontWeight: 700,
              marginBottom: 18,
            }}
          >
            RELOJERÍA SIN CORBATA · WATCH TRADING REAL
          </span>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: '#F8FAFC',
            }}
          >
            Compra, vende y aprende de relojes sin que te la cuelen.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(248,250,252,0.14)',
            paddingTop: 26,
            fontSize: 22,
            color: '#94A3B8',
          }}
        >
          <span>mastercollectionsclub.com</span>
          <span style={{ color: '#25D366', fontWeight: 700 }}>
            Canal Oficial en WhatsApp · YouTube · TikTok
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
