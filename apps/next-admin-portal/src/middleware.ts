import type { NextRequest, NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';

import { defaultLocale, localeDetection, localePrefix, locales, pathnames } from './navigation';

const intlMiddleware = createIntlMiddleware({
  locales,
  pathnames,
  defaultLocale,
  localePrefix,
  localeDetection
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token != null;
      }
    },
    pages: {
      signIn: '/login'
    }
  }
);

export default async function middleware(request: NextRequest) {
  const locale = request.headers.get('x-default-locale') || defaultLocale;

  const isPublicPage = true; // request.nextUrl.pathname !== '/admin/';

  let response: NextResponse;

  if (isPublicPage) {
    response = intlMiddleware(request);
    response.headers.set('x-default-locale', locale);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response = (authMiddleware as any)(request);
  }

  return response;
}

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
