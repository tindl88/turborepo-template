import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

import { locales } from '@/navigation';

import { LayoutProps } from '@/interfaces/layout.interface';

import {
  COMPANY_NAME,
  COMPANY_URL,
  WEBSITE_DESCRIPTION,
  WEBSITE_KEYWORD,
  WEBSITE_NAME
} from '@/constants/site.constant';

export default async function RootLayout({ children, params: { locale } }: LayoutProps) {
  unstable_setRequestLocale(locale);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locales.includes(locale as any)) notFound();

  let messages;

  try {
    messages = (await import(`@/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider timeZone="America/New_York" locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

// export async function generateStaticParams() {
//   return locales.map(locale => ({ locale }));
// }

export async function generateMetadata(_layoutProps: LayoutProps): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
    title: {
      default: WEBSITE_NAME,
      template: '%s | ' + WEBSITE_NAME
    },
    description: WEBSITE_DESCRIPTION,
    applicationName: WEBSITE_NAME,
    keywords: WEBSITE_KEYWORD,
    creator: COMPANY_NAME,
    publisher: COMPANY_NAME,
    authors: [{ name: COMPANY_NAME, url: COMPANY_URL }],
    twitter: {
      title: WEBSITE_NAME,
      card: 'summary_large_image',
      site: '@site',
      creator: '@creator',
      images: '/og-img.jpg'
    },
    openGraph: {
      siteName: WEBSITE_NAME,
      title: WEBSITE_NAME,
      description: WEBSITE_DESCRIPTION,
      type: 'website',
      images: [{ alt: WEBSITE_NAME, url: '/og-img.jpg', width: 1200, height: 630 }]
    },
    colorScheme: 'dark',
    themeColor: [
      { media: '(prefers-color-scheme: dark)', color: '#000000' },
      { media: '(prefers-color-scheme: light)', color: '#ffffff' }
    ],
    viewport: 'width=device-width, initial-scale=1',
    manifest: '/manifest.webmanifest',
    icons: [
      { rel: 'shortcut icon', type: 'image/x-icon', url: '/favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', url: '/favicon.ico' },
      {
        rel: 'icon',
        sizes: '16x16',
        type: 'image/png',
        url: '/favicon-16x16.png'
      },
      {
        rel: 'icon',
        sizes: '32x32',
        type: 'image/png',
        url: '/favicon-32x32.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/apple-touch-icon.png'
      },
      { rel: 'mask-icon', sizes: '#5bbad5', url: '/safari-pinned-tab.svg' }
    ],
    robots: { index: true, follow: true },
    other: {
      HandheldFriendly: 'true',
      MobileOptimized: '360',
      google: 'notranslate'
    }
  };
}
