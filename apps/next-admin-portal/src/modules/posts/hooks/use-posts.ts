import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import CategoryApi from '@/modules/categories/api/categories.api';
import { CATEGORY_TYPE } from '@/modules/categories/constants/categories.constant';

import PostApi from '../api/posts.api';

type CategoryFormFilter = {
  type?: CATEGORY_TYPE;
};

type UsePostsProps = {
  postId: string;
};

function usePosts({ postId }: UsePostsProps) {
  const [formFilter, refetchCategories] = useState<CategoryFormFilter>({ type: CATEGORY_TYPE.POST });
  const {
    data: post,
    isFetched: isPostFetched,
    isFetching: isPostFetching
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const postResp = await PostApi.read(postId);

      return postResp.data.data;
    },
    staleTime: 0,
    gcTime: 0
  });
  const {
    data: categories,
    isFetched: isCategoriesFetched,
    isFetching: isCategoriesFetching
  } = useQuery({
    queryKey: ['categories', formFilter],
    queryFn: async () => {
      const categoriesResp = await CategoryApi.list({ type: formFilter.type });

      return categoriesResp.data.data;
    },
    staleTime: 0,
    gcTime: 0
  });

  const isFetched = isCategoriesFetched;
  const isFetching = isCategoriesFetching;

  return {
    isFetched,
    isFetching,
    isPostFetched,
    isPostFetching,
    isCategoriesFetched,
    isCategoriesFetching,
    post,
    categories,
    refetchCategories
  };
}

export default usePosts;
