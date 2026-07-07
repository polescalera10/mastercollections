import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de cookies | Master Collections',
  description: 'Política de cookies de Master Collections.',
  robots: { index: false, follow: true },
};

/**
 * Política de cookies.
 * Estado real del sitio a fecha de hoy: NO se instalan cookies propias ni de
 * terceros (no hay analítica, publicidad ni embeds que las requieran). Solo se
 * usa sessionStorage para personalizar la página de gracias del ebook.
 * TODO: si en el futuro se añade analítica (GA4, Plausible, etc.) o embeds de
 * YouTube, actualizar esta página y valorar banner de consentimiento.
 */
export default function CookiesPage() {
  return (
    <main className="container-page py-28">
      <article className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-gold hover:underline">
          ← Volver al inicio
        </Link>
        <h1 className="mt-6 font-serif text-4xl font-semibold text-cream">Política de cookies</h1>

        <div className="mt-8 space-y-6 text-cream/75">
          <h2 className="font-serif text-2xl text-cream">¿Usamos cookies?</h2>
          <p>
            No. Actualmente este sitio <strong className="text-cream">no instala cookies</strong>,
            ni propias ni de terceros: no utilizamos herramientas de analítica, publicidad ni
            seguimiento.
          </p>

          <h2 className="font-serif text-2xl text-cream">Almacenamiento local</h2>
          <p>
            Al descargar el ebook usamos el almacenamiento de sesión de tu navegador
            (sessionStorage) para recordar tu nombre y saludarte en la página de confirmación. Es un
            uso puramente técnico: ese dato no sale de tu navegador y se borra automáticamente al
            cerrar la pestaña.
          </p>

          <h2 className="font-serif text-2xl text-cream">Enlaces a plataformas externas</h2>
          <p>
            Esta web enlaza a Telegram, YouTube, Instagram y TikTok. Esas plataformas solo podrán
            instalar sus propias cookies cuando hagas clic y navegues a sus sitios, conforme a sus
            respectivas políticas.
          </p>

          <h2 className="font-serif text-2xl text-cream">Cambios en esta política</h2>
          <p>
            Si en el futuro incorporamos herramientas que utilicen cookies (por ejemplo, analítica
            web), actualizaremos esta página y, cuando sea necesario, te pediremos consentimiento
            antes de instalarlas.
          </p>

          <p className="text-sm text-muted">Última actualización: 7 de julio de 2026</p>
        </div>
      </article>
    </main>
  );
}
