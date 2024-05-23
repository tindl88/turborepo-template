import { createLocalizedPathnamesNavigation, Pathnames } from 'next-intl/navigation';

export const locales = ['en-us', 'vi-vn'] as const;

export const defaultLocale = 'en-us';
export const localePrefix = 'as-needed';
export const localeDetection = false;

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
  '/files': '/files',
  '/profile': '/profile',
  '/documentation/getting-started': '/documentation/getting-started',
  '/documentation/components': '/documentation/components',
  '/documentation/changelog': '/documentation/changelog'
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } = createLocalizedPathnamesNavigation({
  locales,
  pathnames: pathnames as typeof pathnames & Record<string & NonNullable<unknown>, string>
});
