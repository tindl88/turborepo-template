'use client';

import { useQuery } from '@tanstack/react-query';
import { Loading } from '~ui/components/ui/loading';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/common/page-wrapper';

import CategoryApi from '@/modules/categories/api/categories.api';
import { CATEGORY_TYPE } from '@/modules/categories/constants/categories.constant';
import ProductForm from '@/modules/products/components/product-form';
import useProductToast from '@/modules/products/hooks/use-product-toast';

export default function ProductAddNewPage(_pageProps: PageBaseProps) {
  useProductToast();

  const { data: categories, isFetched: isCategoriesFetched } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const categoriesResp = await CategoryApi.list({ type: CATEGORY_TYPE.PRODUCT });

      return categoriesResp.data.data;
    },
    gcTime: 0,
    staleTime: 0
  });

  const isAllFetched = isCategoriesFetched;

  return (
    <PageWrapper>
      {!isAllFetched && (
        <div className="flex h-full items-center justify-center p-4">
          <Loading />
        </div>
      )}
      {isAllFetched && <ProductForm categories={categories ?? []} />}
    </PageWrapper>
  );
}
