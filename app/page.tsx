import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { CatalogSection } from '@/components/CatalogSection';
import { ForWhom } from '@/components/ForWhom';
import { Inside } from '@/components/Inside';
import { Content } from '@/components/Content';
import { About } from '@/components/About';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { getPublicWatches } from '@/lib/watches';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const watches = await getPublicWatches();

  return (
    <>
      <Nav />
      <main id="contenido-principal">
        <Hero />
        <Stats />
        <CatalogSection watches={watches} />
        <ForWhom />
        <Inside />
        <Content />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <JsonLd includeFaq />
    </>
  );
}
