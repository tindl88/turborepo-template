'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Loading } from '@ui/components/ui/loading';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/common/page-wrapper';

import ProductForm from '@/modules/products/components/product-form';
import useProductToast from '@/modules/products/hooks/use-product-toast';
import { useProductsState } from '@/modules/products/states/products.state';

export default function ProductEditPage(_pageProps: PageBaseProps) {
  const params = useParams();
  const productsState = useProductsState();

  useProductToast();

  useEffect(() => {
    if (params.id) productsState.readRequest(params.id as string);
  }, [params.id]);

  return (
    <PageWrapper>
      {productsState.isReading && (
        <div className="flex h-full items-center justify-center p-4">
          <Loading />
        </div>
      )}
      {productsState.detail && <ProductForm data={productsState.detail} />}
    </PageWrapper>
  );
}
