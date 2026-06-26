import { links, site, siteUrl } from '@/lib/site';
import { faqItems } from '@/lib/faq';

/**
 * Structured data (JSON-LD) para SEO y citación por buscadores de IA.
 * - Organization: identidad de marca + perfiles (sameAs).
 * - FAQPage: extrae las Q&A de la sección FAQ.
 */
export function JsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`, // TODO: subir logo real a /public/logo.png
    description: site.description,
    sameAs: [links.telegram, links.youtube, links.instagram],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
