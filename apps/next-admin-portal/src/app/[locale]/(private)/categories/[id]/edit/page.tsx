'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/pages/page-wrapper';

import CategoryForm from '@/modules/categories/components/category-form';
import useCategoryToast from '@/modules/categories/hooks/use-category-toast';

export default function CategoryEditPage(_pageProps: PageBaseProps) {
  useCategoryToast();

  return (
    <PageWrapper>
      <CategoryForm isEdit={true} />
    </PageWrapper>
  );
}
