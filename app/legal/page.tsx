import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Aviso legal | Master Collections',
  description: 'Aviso legal y condiciones de uso de Master Collections.',
  robots: { index: false, follow: true },
};

export default function LegalPage() {
  return (
    <main className="container-page py-28">
      <article className="prose-invert mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-gold hover:underline">
          ← Volver al inicio
        </Link>
        <h1 className="mt-6 font-serif text-4xl font-semibold text-cream">Aviso legal</h1>

        <div className="mt-8 space-y-6 text-cream/75">
          <p>
            {/* TODO: completar con los datos reales del titular conforme a la LSSI-CE. */}
            En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de
            Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:
          </p>
          <ul className="space-y-1">
            <li>
              <strong className="text-cream">Titular:</strong> {site.legalName}{' '}
              {/* TODO: nombre y apellidos o razón social */}
            </li>
            <li>
              <strong className="text-cream">NIF/CIF:</strong> [TODO: NIF/CIF]
            </li>
            <li>
              <strong className="text-cream">Domicilio:</strong> [TODO: dirección]
            </li>
            <li>
              <strong className="text-cream">Contacto:</strong> [TODO: email de contacto]
            </li>
          </ul>

          <h2 className="font-serif text-2xl text-cream">Objeto</h2>
          <p>
            Este sitio web tiene carácter informativo y divulgativo sobre relojería y compraventa
            de relojes de segunda mano. La comunidad se desarrolla en plataformas externas
            (Telegram, YouTube, Instagram), sujetas a sus propias condiciones.
          </p>

          <h2 className="font-serif text-2xl text-cream">Responsabilidad</h2>
          <p>
            Master Collections no es parte en las operaciones de compraventa que los miembros
            realicen entre sí ni garantiza ningún resultado económico. El contenido es educativo y
            no constituye asesoramiento financiero ni de inversión.
          </p>

          <h2 className="font-serif text-2xl text-cream">Propiedad intelectual</h2>
          <p>
            Los contenidos de este sitio pertenecen a su titular salvo indicación en contrario. No
            se permite su reproducción sin autorización.
          </p>

          <p className="text-sm text-muted">
            Última actualización: {/* TODO: fecha */}[TODO]
          </p>
        </div>
      </article>
    </main>
  );
}
