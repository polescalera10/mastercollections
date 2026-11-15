import type { MetadataRoute } from 'next';
import { isDemo, siteUrl } from '@/lib/site';

/**
 * robots.txt — permite indexación pública (incluidos bots de IA) y bloquea /admin y /api.
 */
export default function robots(): MetadataRoute.Robots {
  if (isDemo) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin', '/api/'] },
      { userAgent: 'GPTBot', allow: '/', disallow: ['/admin', '/api/'] },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/admin', '/api/'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/admin', '/api/'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/admin', '/api/'] },
      { userAgent: 'anthropic-ai', allow: '/', disallow: ['/admin', '/api/'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/admin', '/api/'] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
