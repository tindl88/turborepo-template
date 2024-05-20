'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Loading } from '@ui/components/ui/loading';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/common/page-wrapper';

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
      {userState.isReading && (
        <div className="flex h-full items-center justify-center p-4">
          <Loading />
        </div>
      )}
      {userState.detail && <UserForm data={userState.detail} />}
    </PageWrapper>
  );
}
