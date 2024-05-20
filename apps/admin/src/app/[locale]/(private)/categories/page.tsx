'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/common/page-wrapper';

import CategoryList from '@/modules/categories/components/category-list';
import useCategoryToast from '@/modules/categories/hooks/use-category-toast';

export default function CategoriesPage(_pageProps: PageBaseProps) {
  useCategoryToast();

  return (
    <PageWrapper>
      <CategoryList />
    </PageWrapper>
  );
}
