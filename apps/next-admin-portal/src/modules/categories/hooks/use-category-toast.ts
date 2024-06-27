import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useToast } from '~react-web-ui-shadcn/components/ui/use-toast';

import { useRouter } from '@/navigation';

import { useCategoriesState } from '../states/categories.state';

function useCategoryToast() {
  const t = useTranslations();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoriesState = useCategoriesState();

  /*****************************************************************
  LIST
  *****************************************************************/
  useEffect(() => {
    if (!categoriesState.isFetching && categoriesState.error) {
      toast({
        title: t('category_list_toast_title'),
        description: t('category_list_failure') + '<br />' + categoriesState.message
      });
    }
  }, [categoriesState.isFetching, categoriesState.error]);

  /*****************************************************************
  CREATE
  *****************************************************************/
  useEffect(() => {
    if (categoriesState.createdAt && !categoriesState.error) {
      toast({
        title: t('category_create_toast_title'),
        description: t('category_create_success')
      });
      categoriesState.reset();

      router.push({
        pathname: '/categories',
        query: { sidebar: searchParams.get('sidebar') }
      });
    }

    if (categoriesState.createdAt && categoriesState.error) {
      toast({
        title: t('category_create_toast_title'),
        description: t('category_create_failure') + '<br />' + categoriesState.message
      });
      categoriesState.reset();
    }
  }, [categoriesState.createdAt, categoriesState.error]);

  /*****************************************************************
  UPDATE
  *****************************************************************/
  useEffect(() => {
    if (categoriesState.updatedAt && !categoriesState.error) {
      toast({
        title: t('category_update_toast_title'),
        description: t('category_update_success')
      });
      categoriesState.reset();

      router.push({
        pathname: '/categories',
        query: { sidebar: searchParams.get('sidebar') }
      });
    }
    if (categoriesState.updatedAt && categoriesState.error) {
      toast({
        title: t('category_update_toast_title'),
        description: t('category_update_failure') + '<br />' + categoriesState.message
      });
      categoriesState.reset();
    }
  }, [categoriesState.updatedAt, categoriesState.error]);

  /*****************************************************************
  DELETE
  *****************************************************************/
  useEffect(() => {
    if (categoriesState.deletedAt && !categoriesState.error) {
      toast({
        title: t('category_delete_toast_title'),
        description: t('category_delete_success')
      });
      categoriesState.reset();

      router.push({
        pathname: '/categories',
        query: { sidebar: searchParams.get('sidebar') }
      });
    }
    if (categoriesState.deletedAt && categoriesState.error) {
      toast({
        title: t('category_delete_toast_title'),
        description: t('category_delete_failure') + '<br />' + categoriesState.message
      });
      categoriesState.reset();
    }
  }, [categoriesState.deletedAt, categoriesState.error]);
}

export default useCategoryToast;
