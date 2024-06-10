import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { ResponseMeta } from '@/interfaces/api-response.interface';
import { PostEntity, PostFilter } from '../interfaces/post.interface';

import { TravelPlacesScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

import PostApi from '../api/post.api';

type UsePostProps = {
  data?: PostEntity[];
  meta?: ResponseMeta;
  isLoading: boolean;
  error: Error | null;
  filter: PostFilter;
  setFilter: (filter: PostFilter) => void;
};

export function usePost(filters: TravelPlacesScreenParams): UsePostProps {
  const { q, page, limit } = filters;
  const [filter, setFilter] = useState<PostFilter>({ q, page, limit });

  const fetchData = async (params: PostFilter) => {
    try {
      const response = await PostApi.list(params);

      return response.data;
    } catch (error) {
      throw new Error('Error fetching data');
    }
  };

  const query = useQuery({
    queryKey: ['posts', filter],
    queryFn: () => fetchData(filter)
  });

  return {
    filter,
    setFilter,
    data: query.data?.data,
    meta: query.data?.meta,
    isLoading: query.isLoading,
    error: query.error
  };
}
