'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '~ui/components/ui/loading';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/common/page-wrapper';

import CategoryApi from '@/modules/categories/api/categories.api';
import { CATEGORY_TYPE } from '@/modules/categories/constants/categories.constant';
import ProductApi from '@/modules/products/api/products.api';
import ProductForm from '@/modules/products/components/product-form';
import useProductToast from '@/modules/products/hooks/use-product-toast';

export default function ProductEditPage(_pageProps: PageBaseProps) {
  const params = useParams();

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

  const { data: product, isFetched: isProductFetched } = useQuery({
    queryKey: ['product', params.id],
    queryFn: async () => {
      const productResp = await ProductApi.read(params.id as string);

      return productResp.data.data;
    },
    gcTime: 0,
    staleTime: 0
  });

  const isAllFetched = isCategoriesFetched && isProductFetched;

  return (
    <PageWrapper>
      {!isAllFetched && (
        <div className="flex h-full items-center justify-center p-4">
          <Loading />
        </div>
      )}
      {isAllFetched && <ProductForm data={product} categories={categories ?? []} />}
    </PageWrapper>
  );
}
