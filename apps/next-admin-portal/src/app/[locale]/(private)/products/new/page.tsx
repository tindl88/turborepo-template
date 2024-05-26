'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/common/page-wrapper';

import ProductForm from '@/modules/products/components/product-form';
import useProductToast from '@/modules/products/hooks/use-product-toast';

export default function ProductAddNewPage(_pageProps: PageBaseProps) {
  useProductToast();

  return (
    <PageWrapper>
      <ProductForm />
    </PageWrapper>
  );
}