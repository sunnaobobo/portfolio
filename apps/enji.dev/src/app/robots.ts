import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: 'https://portfolio.sunnao.wtf',
    sitemap: 'https://portfolio.sunnao.wtf/sitemap.xml',
  };
}
