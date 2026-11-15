import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de privacidad | Master Collections',
  description: 'Política de privacidad de Master Collections.',
  robots: { index: false, follow: true },
};

/**
 * Política de privacidad (RGPD + LOPDGDD).
 * Refleja la realidad actual del sitio: el ÚNICO punto de recogida de datos es el
 * formulario del ebook (/ebook-gratis), que pide nombre y email con consentimiento.
 * TODO: completar los datos del responsable (marcados como [TODO]) con Pol/Toni.
 */
export default function PrivacidadPage() {
  return (
    <main className="container-page py-28">
      <article className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-gold hover:underline">
          ← Volver al inicio
        </Link>
        <h1 className="mt-6 font-serif text-4xl font-semibold text-cream">Política de privacidad</h1>

        <div className="mt-8 space-y-6 text-cream/75">
          <h2 className="font-serif text-2xl text-cream">Responsable del tratamiento</h2>
          <ul className="space-y-1">
            <li>
              <strong className="text-cream">Titular:</strong> Master Collections{' '}
              {/* TODO: nombre y apellidos o razón social del titular */}
            </li>
            <li>
              <strong className="text-cream">NIF/CIF:</strong> [TODO: NIF/CIF]
            </li>
            <li>
              <strong className="text-cream">Domicilio:</strong> [TODO: dirección]
            </li>
            <li>
              <strong className="text-cream">Email de contacto:</strong> [TODO: email de contacto]
            </li>
          </ul>

          <h2 className="font-serif text-2xl text-cream">Qué datos recogemos y para qué</h2>
          <p>
            El único punto de este sitio donde se recogen datos personales es el formulario de
            descarga del ebook (<Link href="/ebook-gratis" className="text-gold hover:underline">/ebook-gratis</Link>),
            donde pedimos tu <strong className="text-cream">nombre</strong> y tu{' '}
            <strong className="text-cream">email</strong> con estas finalidades:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Entregarte el ebook que has solicitado.</li>
            <li>
              Enviarte comunicaciones sobre la comunidad y contenidos de Master Collections, solo si
              marcas la casilla de consentimiento.
            </li>
          </ul>
          <p>
            La base jurídica del tratamiento es tu <strong className="text-cream">consentimiento</strong>{' '}
            (art. 6.1.a RGPD), que puedes retirar en cualquier momento: todos los emails incluyen un
            enlace de baja, y también puedes pedirla escribiendo al email de contacto.
          </p>

          <h2 className="font-serif text-2xl text-cream">Dónde se guardan tus datos</h2>
          <p>
            Los contactos se gestionan con <strong className="text-cream">Brevo</strong> (plataforma
            de email marketing) y el sitio se aloja en <strong className="text-cream">Netlify</strong>.
            Ambos actúan como encargados del tratamiento conforme al art. 28 RGPD. Si alguno de
            estos proveedores tratara datos fuera del Espacio Económico Europeo, la transferencia se
            realizará con las garantías previstas en el capítulo V del RGPD.
          </p>
          <p>
            No vendemos ni cedemos tus datos a terceros. No hay más destinatarios que los
            proveedores citados.
          </p>

          <h2 className="font-serif text-2xl text-cream">Cuánto tiempo los conservamos</h2>
          <p>
            Hasta que te des de baja o solicites su supresión. Si retiras el consentimiento,
            dejaremos de enviarte comunicaciones y eliminaremos tus datos de la lista.
          </p>

          <h2 className="font-serif text-2xl text-cream">Tus derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación
            del tratamiento y portabilidad escribiendo a {/* TODO: email de contacto */}[TODO: email
            de contacto]. Si consideras que no hemos tratado tus datos correctamente, puedes
            reclamar ante la Agencia Española de Protección de Datos (aepd.es).
          </p>

          <h2 className="font-serif text-2xl text-cream">Enlaces a terceros</h2>
          <p>
            Esta web enlaza a Telegram, YouTube, Instagram y TikTok. Al acceder a esas plataformas,
            tus datos pasan a tratarse según las políticas de privacidad de cada una.
          </p>

          <p className="text-sm text-muted">Última actualización: 7 de julio de 2026</p>
        </div>
      </article>
    </main>
  );
}
