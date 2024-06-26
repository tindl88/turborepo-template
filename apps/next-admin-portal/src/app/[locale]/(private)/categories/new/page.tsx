'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/common/page-wrapper';

import CategoryForm from '@/modules/categories/components/category-form';
import useCategoryToast from '@/modules/categories/hooks/use-category-toast';

export default function CategoryAddNewPage(_pageProps: PageBaseProps) {
  useCategoryToast();

  return (
    <PageWrapper>
      <CategoryForm isEditMode={false} />
    </PageWrapper>
  );
}
