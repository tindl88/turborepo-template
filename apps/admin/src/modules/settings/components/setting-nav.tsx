'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import classNames from 'classnames';
import { buttonVariants } from '@ui/components/ui/button';

import { Link } from '@/navigation';

interface ISettingNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SettingNav({ className, items, ...props }: ISettingNavProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav className={classNames('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)} {...props}>
      {items.map(item => (
        <Link
          key={item.href}
          href={{
            pathname: '/settings/[type]',
            params: { type: item.href },
            query: { sidebar: searchParams.get('sidebar') }
          }}
          className={classNames(
            buttonVariants({ variant: 'ghost' }),
            pathname.includes('/settings/' + item.href)
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
