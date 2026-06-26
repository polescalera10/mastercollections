import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

/**
 * robots.txt — permite indexación general y, de forma explícita, los crawlers
 * de buscadores de IA (para poder ser citados en sus respuestas).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Bots de IA permitidos explícitamente (citación en respuestas generativas).
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
