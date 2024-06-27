'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/pages/page-wrapper';

import PostList from '@/modules/posts/components/post-list';
import usePostToast from '@/modules/posts/hooks/use-post-toast';

export default function PostsPage(_pageProps: PageBaseProps) {
  usePostToast();

  return (
    <PageWrapper>
      <PostList />
    </PageWrapper>
  );
}
