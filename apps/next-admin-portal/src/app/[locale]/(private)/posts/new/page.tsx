'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/common/page-wrapper';

import PostForm from '@/modules/posts/components/post-form';
import usePostToast from '@/modules/posts/hooks/use-post-toast';

export default function PostAddNewPage(_pageProps: PageBaseProps) {
  usePostToast();

  return (
    <PageWrapper>
      <PostForm />
    </PageWrapper>
  );
}
