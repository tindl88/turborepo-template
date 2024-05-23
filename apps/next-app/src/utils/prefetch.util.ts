import { cache } from 'react';
import { dehydrate, QueryClient, QueryFunction, QueryKey } from '@tanstack/react-query';

const prefetchData = async (name: QueryKey, callback: QueryFunction): Promise<ReturnType<typeof dehydrate>> => {
  const queryClient = cache(() => new QueryClient())();

  await queryClient.prefetchQuery({
    queryKey: name,
    queryFn: callback
  });
  const dehydratedState = dehydrate(queryClient);

  return dehydratedState;
};

export { prefetchData };
