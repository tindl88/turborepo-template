'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/pages/page-wrapper';

import ProductList from '@/modules/products/components/product-list';
import useProductToast from '@/modules/products/hooks/use-product-toast';

export default function ProductsPage(_pageProps: PageBaseProps) {
  useProductToast();

  return (
    <PageWrapper>
      <ProductList />
    </PageWrapper>
  );
}
