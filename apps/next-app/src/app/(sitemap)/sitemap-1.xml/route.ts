import { getServerSideSitemap } from 'next-sitemap';

import { WEBSITE_URL } from '@/constants/site.constant';

export async function GET() {
  return getServerSideSitemap([{ loc: `${WEBSITE_URL}/dynamic-path-1`, lastmod: new Date().toISOString() }]);
}
