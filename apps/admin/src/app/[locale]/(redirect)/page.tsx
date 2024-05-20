'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loading } from '@ui/components/ui/loading';

import { useRouter } from '@/navigation';

import { PageBaseProps } from '@/interfaces/page.interface';

export default function RedirectPage(_pageProps: PageBaseProps) {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push(
        {
          pathname: '/dashboard',
          query: {
            sidebar: searchParams.get('sidebar') !== 'opened' ? 'opened' : 'closed'
          }
        },
        { locale: session.data.user.preference.language }
      );
    }
    if (session.status === 'unauthenticated') router.push({ pathname: '/login' });
  }, [session.status]);

  return (
    <div className="redirect-page flex grow items-center justify-center p-4">
      <Loading size="lg" thickness={4} />
    </div>
  );
}
