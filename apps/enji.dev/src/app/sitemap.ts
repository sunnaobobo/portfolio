import { getPostSlugs } from '@/lib/posts';

import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.enji.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const postRoutes = getPostSlugs().map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }));

  const workSlugs = ['contact', 'experience', 'skills-and-tools', 'studio'];
  const workRoutes = workSlugs.map((slug) => ({
    url: `${SITE_URL}/work/${slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/today-i-learned`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/credits`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/docs/tailwindcss-accent`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.6,
    },
    ...workRoutes,
    ...postRoutes,
  ];
}
