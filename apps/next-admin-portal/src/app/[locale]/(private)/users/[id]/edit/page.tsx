'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/pages/page-wrapper';

import UserForm from '@/modules/users/components/user-form';
import useUserToast from '@/modules/users/hooks/use-user-toast';

export default function UserEditPage(_pageProps: PageBaseProps) {
  useUserToast();

  return (
    <PageWrapper>
      <UserForm isEdit={true} />
    </PageWrapper>
  );
}
