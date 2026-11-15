import { links, site, siteUrl } from '@/lib/site';
import { faqItems } from '@/lib/faq';

/**
 * Structured data (JSON-LD) para SEO y citación por buscadores de IA.
 * - Organization + WebSite: se monta en el layout global.
 * - FAQPage: se monta únicamente en la Home (donde están visibles las preguntas),
 *   cumpliendo las directrices de datos estructurados de Google.
 */
export function JsonLd({ includeFaq = false }: { includeFaq?: boolean }) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/brand/logo-square.jpg`,
    description: site.description,
    sameAs: [links.telegram, links.youtube, links.instagram, links.tiktok],
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      {includeFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
        />
      )}
    </>
  );
}
