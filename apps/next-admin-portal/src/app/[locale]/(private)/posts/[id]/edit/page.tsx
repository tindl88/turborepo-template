'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/pages/page-wrapper';

import PostForm from '@/modules/posts/components/post-form';
import usePostToast from '@/modules/posts/hooks/use-post-toast';

export default function PostEditPage(_pageProps: PageBaseProps) {
  usePostToast();

  return (
    <PageWrapper>
      <PostForm isEdit={true} />
    </PageWrapper>
  );
}
