'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Loading } from '~ui/components/ui/loading';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/common/page-wrapper';

import CategoryForm from '@/modules/categories/components/category-form';
import useCategoryToast from '@/modules/categories/hooks/use-category-toast';
import { useCategoriesState } from '@/modules/categories/states/categories.state';

export default function CategoryEditPage(_pageProps: PageBaseProps) {
  const params = useParams();
  const categoriesState = useCategoriesState();

  useCategoryToast();

  useEffect(() => {
    if (params.id) categoriesState.readRequest(params.id as string);
  }, [params.id]);

  return (
    <PageWrapper>
      {categoriesState.isReading && (
        <div className="flex h-full items-center justify-center p-4">
          <Loading />
        </div>
      )}
      {categoriesState.detail && <CategoryForm data={categoriesState.detail} />}
    </PageWrapper>
  );
}
