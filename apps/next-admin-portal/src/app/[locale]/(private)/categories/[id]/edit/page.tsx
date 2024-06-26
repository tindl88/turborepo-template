'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '~ui/components/ui/loading';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/common/page-wrapper';

import CategoryApi from '@/modules/categories/api/categories.api';
import CategoryForm from '@/modules/categories/components/category-form';
import useCategoryToast from '@/modules/categories/hooks/use-category-toast';

export default function CategoryEditPage(_pageProps: PageBaseProps) {
  const params = useParams();

  useCategoryToast();

  const { data: category, isFetched: isCategoryFetched } = useQuery({
    queryKey: ['category', params.id],
    queryFn: async () => {
      const categoryResp = await CategoryApi.read(params.id as string);

      return categoryResp.data.data;
    },
    gcTime: 0,
    staleTime: 0
  });

  const { data: categories, isFetched: isCategoriesFetched } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const categoriesResp = await CategoryApi.list({ type: category?.type, excludeId: category?.id });

      return categoriesResp.data.data;
    },
    enabled: !!category,
    gcTime: 0,
    staleTime: 0
  });

  const isAllFetched = isCategoriesFetched && isCategoryFetched;

  return (
    <PageWrapper>
      {!isAllFetched && (
        <div className="flex h-full items-center justify-center p-4">
          <Loading />
        </div>
      )}
      {isAllFetched && <CategoryForm data={category} categories={categories ?? []} />}
    </PageWrapper>
  );
}
