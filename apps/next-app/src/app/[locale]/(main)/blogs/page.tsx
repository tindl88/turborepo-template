import { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { PageBaseProps } from '@/interfaces/page.interface';

import PostApi from '@/modules/blogs/api/posts.api';
import PostRoot from '@/modules/blogs/components/post-root';
import { PostFilter } from '@/modules/blogs/interfaces/posts.interface';

import { getQueryClient } from '@/utils/query-client.util';

const queryClient = getQueryClient();

export default async function BlogPage(pageProps: PageBaseProps) {
  const filter: PostFilter = {
    page: parseInt(pageProps.searchParams.page as string) || 1,
    limit: parseInt(pageProps.searchParams.limit as string) || 10
  };

  await queryClient.prefetchQuery({
    queryKey: ['posts', filter],
    queryFn: async () => await PostApi.getServerPosts(filter)
  });

  return (
    <div className="grow">
      <div className="container">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PostRoot filter={filter} />
        </HydrationBoundary>
      </div>
    </div>
  );
}

export async function generateMetadata(_pageProps: PageBaseProps): Promise<Metadata> {
  return {
    title: 'Blog',
    description: 'Blog Description'
  };
}
