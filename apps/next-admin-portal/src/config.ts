import { LocalePrefix, Pathnames } from 'next-intl/routing';

export const localeDetection = false;
export const defaultLocale = 'en-us';
export const publicPages = ['/', '/login'];
export const locales = ['en-us', 'vi-vn'] as const;
export const localePrefix = { mode: 'always' } satisfies LocalePrefix<typeof locales>;
export const pathnames = {
  '/': '/',
  '/login': '/login',
  '/register': '/register',
  '/dashboard': '/dashboard',
  '/users': '/users',
  '/users/new': '/users/new',
  '/users/[id]/edit': '/users/[id]/edit',
  '/users/[id]': '/users/[id]',
  '/posts': '/posts',
  '/posts/new': '/posts/new',
  '/posts/[id]/edit': '/posts/[id]/edit',
  '/posts/[id]': '/posts/[id]',
  '/categories': '/categories',
  '/categories/new': '/categories/new',
  '/categories/[id]/edit': '/categories/[id]/edit',
  '/categories/[id]': '/categories/[id]',
  '/products': '/products',
  '/products/new': '/products/new',
  '/products/[id]/edit': '/products/[id]/edit',
  '/products/[id]': '/products/[id]',
  '/audit-logs': '/audit-logs',
  '/settings/[type]': '/settings/[type]',
  '/notifications/[type]': '/notifications/[type]',
  '/files': '/files',
  '/profile': '/profile',
  '/documentation/getting-started': '/documentation/getting-started',
  '/documentation/components': '/documentation/components',
  '/documentation/changelog': '/documentation/changelog'
} satisfies Pathnames<typeof locales>;
