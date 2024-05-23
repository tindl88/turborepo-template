import { getServerSideSitemapIndex } from 'next-sitemap';

import { WEBSITE_URL } from '@/constants/site.constant';

export async function GET() {
  return getServerSideSitemapIndex([`${WEBSITE_URL}/sitemap-0.xml`, `${WEBSITE_URL}/sitemap-1.xml`]);
}
