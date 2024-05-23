import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useToast } from '~ui/components/ui/use-toast';

import { useRouter } from '@/navigation';

import { useProductsState } from '../states/products.state';

function useProductToast() {
  const t = useTranslations();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const productsState = useProductsState();

  /*****************************************************************
  LIST
  *****************************************************************/
  useEffect(() => {
    if (!productsState.isFetching && productsState.error) {
      toast({
        title: t('product_list_toast_title'),
        description: t('product_list_failure') + '<br />' + productsState.message
      });
    }
  }, [productsState.isFetching, productsState.error]);

  /*****************************************************************
  CREATE
  *****************************************************************/
  useEffect(() => {
    if (productsState.createdAt && !productsState.error) {
      toast({
        title: t('product_create_toast_title'),
        description: t('product_create_success')
      });
      productsState.reset();

      router.push({
        pathname: '/products',
        query: { sidebar: searchParams.get('sidebar') }
      });
    }

    if (productsState.createdAt && productsState.error) {
      toast({
        title: t('product_create_toast_title'),
        description: t('product_create_failure') + '<br />' + productsState.message
      });
      productsState.reset();
    }
  }, [productsState.createdAt, productsState.error]);

  /*****************************************************************
  UPDATE
  *****************************************************************/
  useEffect(() => {
    if (productsState.updatedAt && !productsState.error) {
      toast({
        title: t('product_update_toast_title'),
        description: t('product_update_success')
      });
      productsState.reset();

      router.push({
        pathname: '/products',
        query: { sidebar: searchParams.get('sidebar') }
      });
    }
    if (productsState.updatedAt && productsState.error) {
      toast({
        title: t('product_update_toast_title'),
        description: t('product_update_failure') + '<br />' + productsState.message
      });
      productsState.reset();
    }
  }, [productsState.updatedAt, productsState.error]);

  /*****************************************************************
  DELETE
  *****************************************************************/
  useEffect(() => {
    if (productsState.deletedAt && !productsState.error) {
      toast({
        title: t('product_delete_toast_title'),
        description: t('product_delete_success')
      });
      productsState.reset();

      router.push({
        pathname: '/products',
        query: { sidebar: searchParams.get('sidebar') }
      });
    }
    if (productsState.deletedAt && productsState.error) {
      toast({
        title: t('product_delete_toast_title'),
        description: t('product_delete_failure') + '<br />' + productsState.message
      });
      productsState.reset();
    }
  }, [productsState.deletedAt, productsState.error]);
}

export default useProductToast;
