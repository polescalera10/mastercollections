import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { ForWhom } from '@/components/ForWhom';
import { Inside } from '@/components/Inside';
import { Content } from '@/components/Content';
import { About } from '@/components/About';
import { Testimonials } from '@/components/Testimonials';
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
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
