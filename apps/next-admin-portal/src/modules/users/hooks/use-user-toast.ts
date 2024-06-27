import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useToast } from '~react-web-ui-shadcn/components/ui/use-toast';

import { useRouter } from '@/navigation';

import { useUsersState } from '../states/users.state';

function useUserToast() {
  const t = useTranslations();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const usersState = useUsersState();

  /*****************************************************************
  LIST
  *****************************************************************/
  useEffect(() => {
    if (!usersState.isFetching && usersState.error) {
      toast({
        title: t('user_list_toast_title'),
        description: t('user_list_failure') + '<br />' + usersState.message
      });
    }
  }, [usersState.isFetching, usersState.error]);

  /*****************************************************************
  CREATE
  *****************************************************************/
  useEffect(() => {
    if (usersState.createdAt && !usersState.error) {
      toast({
        title: t('user_create_toast_title'),
        description: t('user_create_success')
      });
      usersState.reset();

      router.push({
        pathname: '/users',
        query: { sidebar: searchParams.get('sidebar') }
      });
    }

    if (usersState.createdAt && usersState.error) {
      toast({
        title: t('user_create_toast_title'),
        description: t('user_create_failure') + '<br />' + usersState.message
      });
      usersState.reset();
    }
  }, [usersState.createdAt, usersState.error]);

  /*****************************************************************
  UPDATE
  *****************************************************************/
  useEffect(() => {
    if (usersState.updatedAt && !usersState.error) {
      toast({
        title: t('user_update_toast_title'),
        description: t('user_update_success')
      });
      usersState.reset();

      router.push({
        pathname: '/users',
        query: { sidebar: searchParams.get('sidebar') }
      });
    }
    if (usersState.updatedAt && usersState.error) {
      toast({
        title: t('user_update_toast_title'),
        description: t('user_update_failure') + '<br />' + usersState.message
      });
      usersState.reset();
    }
  }, [usersState.updatedAt, usersState.error]);

  /*****************************************************************
  DELETE
  *****************************************************************/
  useEffect(() => {
    if (usersState.deletedAt && !usersState.error) {
      toast({
        title: t('user_delete_toast_title'),
        description: t('user_delete_success')
      });
      usersState.reset();

      router.push({
        pathname: '/users',
        query: { sidebar: searchParams.get('sidebar') }
      });
    }
    if (usersState.deletedAt && usersState.error) {
      toast({
        title: t('user_delete_toast_title'),
        description: t('user_delete_failure') + '<br />' + usersState.message
      });
      usersState.reset();
    }
  }, [usersState.deletedAt, usersState.error]);
}

export default useUserToast;
