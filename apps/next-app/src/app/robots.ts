import { MetadataRoute } from 'next';

import { WEBSITE_URL } from '@/constants/site.constant';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/protected/', '/admin/']
      }
    ],
    host: WEBSITE_URL,
    sitemap: [`${WEBSITE_URL}/sitemap.xml`, `${WEBSITE_URL}/sitemap-0.xml`, `${WEBSITE_URL}/sitemap-1.xml`]
  };
}
