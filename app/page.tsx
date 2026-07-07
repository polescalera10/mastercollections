import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { ForWhom } from '@/components/ForWhom';
import { Inside } from '@/components/Inside';
import { Content } from '@/components/Content';
import { About } from '@/components/About';
// TODO (Directiva Omnibus): sección Testimonials retirada de la home el 2026-07-07.
// Se publicaba con placeholders y el titular "Mensajes reales" sin tener ninguna
// captura real. Verificar con Pol antes de reactivar: solo capturas reales y con
// permiso de sus autores. Reactivar = descomentar el import y el <Testimonials />.
// import { Testimonials } from '@/components/Testimonials';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="contenido">
        <Hero />
        <Stats />
        <ForWhom />
        <Inside />
        <Content />
        <About />
        {/* TODO: verificar con Pol antes de reactivar (ver nota en el import). */}
        {/* <Testimonials /> */}
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
