'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/pages/page-wrapper';

import UserList from '@/modules/users/components/user-list';
import useUserToast from '@/modules/users/hooks/use-user-toast';

export default function UsersPage(_pageProps: PageBaseProps) {
  useUserToast();

  return (
    <PageWrapper>
      <UserList />
    </PageWrapper>
  );
}
