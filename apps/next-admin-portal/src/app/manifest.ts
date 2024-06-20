import { MetadataRoute } from 'next';

import { WEBSITE_DESCRIPTION, WEBSITE_NAME } from '@/constants/site.constant';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: WEBSITE_NAME,
    short_name: WEBSITE_NAME,
    description: WEBSITE_DESCRIPTION,
    theme_color: '#4b9ae8',
    background_color: '#334155',
    orientation: 'portrait-primary',
    display: 'standalone',
    start_url: '/',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon'
      },
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon'
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: '/icon-192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  };
}
