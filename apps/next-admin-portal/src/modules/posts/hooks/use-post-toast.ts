import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useToast } from '~react-web-ui-shadcn/components/ui/use-toast';

import { useRouter } from '@/navigation';

import { usePostsState } from '../states/posts.state';

function usePostToast() {
  const t = useTranslations();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const postsState = usePostsState();

  /*****************************************************************
  LIST
  *****************************************************************/
  useEffect(() => {
    if (!postsState.isFetching && postsState.error) {
      toast({
        title: t('post_list_toast_title'),
        description: t('post_list_failure') + '<br />' + postsState.message
      });
    }
  }, [postsState.isFetching, postsState.error]);

  /*****************************************************************
  CREATE
  *****************************************************************/
  useEffect(() => {
    if (postsState.createdAt && !postsState.error) {
      toast({
        title: t('post_create_toast_title'),
        description: t('post_create_success')
      });
      postsState.reset();

      router.push({
        pathname: '/posts',
        query: { sidebar: searchParams.get('sidebar') }
      });
    }

    if (postsState.createdAt && postsState.error) {
      toast({
        title: t('post_create_toast_title'),
        description: t('post_create_failure') + '<br />' + postsState.message
      });
      postsState.reset();
    }
  }, [postsState.createdAt, postsState.error]);

  /*****************************************************************
  UPDATE
  *****************************************************************/
  useEffect(() => {
    if (postsState.updatedAt && !postsState.error) {
      toast({
        title: t('post_update_toast_title'),
        description: t('post_update_success')
      });
      postsState.reset();

      router.push({
        pathname: '/posts',
        query: { sidebar: searchParams.get('sidebar') }
      });
    }
    if (postsState.updatedAt && postsState.error) {
      toast({
        title: t('post_update_toast_title'),
        description: t('post_update_failure') + '<br />' + postsState.message
      });
      postsState.reset();
    }
  }, [postsState.updatedAt, postsState.error]);

  /*****************************************************************
  DELETE
  *****************************************************************/
  useEffect(() => {
    if (postsState.deletedAt && !postsState.error) {
      toast({
        title: t('post_delete_toast_title'),
        description: t('post_delete_success')
      });
      postsState.reset();

      router.push({
        pathname: '/posts',
        query: { sidebar: searchParams.get('sidebar') }
      });
    }

    if (postsState.deletedAt && postsState.error) {
      toast({
        title: t('post_delete_toast_title'),
        description: t('post_delete_failure') + '<br />' + postsState.message
      });
      postsState.reset();
    }
  }, [postsState.deletedAt, postsState.error]);
}

export default usePostToast;
