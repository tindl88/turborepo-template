'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '~ui/components/ui/loading';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/common/page-wrapper';

import CategoryApi from '@/modules/categories/api/categories.api';
import { CATEGORY_TYPE } from '@/modules/categories/constants/categories.constant';
import PostApi from '@/modules/posts/api/posts.api';
import PostForm from '@/modules/posts/components/post-form';
import usePostToast from '@/modules/posts/hooks/use-post-toast';

export default function PostEditPage(_pageProps: PageBaseProps) {
  const params = useParams();

  usePostToast();

  const { data: categories, isFetched: isCategoriesFetched } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const categoriesResp = await CategoryApi.list({ type: CATEGORY_TYPE.POST });

      return categoriesResp.data.data;
    },
    gcTime: 0,
    staleTime: 0
  });

  const { data: post, isFetched: isPostFetched } = useQuery({
    queryKey: ['post', params.id],
    queryFn: async () => {
      const postResp = await PostApi.read(params.id as string);

      return postResp.data.data;
    },
    gcTime: 0,
    staleTime: 0
  });

  const isAllFetched = isCategoriesFetched && isPostFetched;

  return (
    <PageWrapper>
      {!isAllFetched && (
        <div className="flex h-full items-center justify-center p-4">
          <Loading />
        </div>
      )}
      {isAllFetched && <PostForm data={post} categories={categories ?? []} />}
    </PageWrapper>
  );
}
