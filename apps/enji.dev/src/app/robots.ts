import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: 'https://www.enji.dev',
    sitemap: 'https://www.enji.dev/sitemap.xml',
  };
}
