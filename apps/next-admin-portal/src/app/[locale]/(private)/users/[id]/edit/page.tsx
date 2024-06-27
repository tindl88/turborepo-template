'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/pages/page-wrapper';

import UserForm from '@/modules/users/components/user-form';
import useUserToast from '@/modules/users/hooks/use-user-toast';
import { useUsersState } from '@/modules/users/states/users.state';

export default function UserEditPage(_pageProps: PageBaseProps) {
  const params = useParams();
  const userState = useUsersState();

  useUserToast();

  useEffect(() => {
    if (params.id) userState.readRequest(params.id as string);
  }, [params.id]);

  return (
    <PageWrapper>
      <UserForm isEdit={true} />
    </PageWrapper>
  );
}
