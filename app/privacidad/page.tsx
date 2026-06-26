import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de privacidad | Master Collections',
  description: 'Política de privacidad de Master Collections.',
  robots: { index: false, follow: true },
};

export default function PrivacidadPage() {
  return (
    <main className="container-page py-28">
      <article className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-gold hover:underline">
          ← Volver al inicio
        </Link>
        <h1 className="mt-6 font-serif text-4xl font-semibold text-cream">Política de privacidad</h1>

        <div className="mt-8 space-y-6 text-cream/75">
          <p>
            Master Collections respeta tu privacidad. Esta web es informativa y{' '}
            <strong className="text-cream">no recoge datos personales mediante formularios</strong>:
            el único paso que proponemos es unirte a nuestro grupo de Telegram, plataforma que se
            rige por su propia política de privacidad.
          </p>

          <h2 className="font-serif text-2xl text-cream">Datos que tratamos</h2>
          <p>
            {/* TODO: ajustar según las herramientas reales que se usen. */}
            No solicitamos nombre, correo ni teléfono en este sitio. Si en el futuro se añade
            analítica web, se detallará aquí qué datos se recogen y con qué finalidad.
          </p>

          <h2 className="font-serif text-2xl text-cream">Enlaces a terceros</h2>
          <p>
            Esta web enlaza a Telegram, YouTube e Instagram. Al acceder a ellos, tus datos pasan a
            tratarse según las políticas de privacidad de cada plataforma.
          </p>

          <h2 className="font-serif text-2xl text-cream">Tus derechos</h2>
          <p>
            Puedes ejercer tus derechos de acceso, rectificación y supresión escribiendo a{' '}
            {/* TODO: email de contacto */}[TODO: email de contacto].
          </p>

          <p className="text-sm text-muted">
            Última actualización: {/* TODO: fecha */}[TODO]
          </p>
        </div>
      </article>
    </main>
  );
}
