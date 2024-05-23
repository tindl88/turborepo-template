'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Loading } from '~ui/components/ui/loading';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/common/page-wrapper';

import PostForm from '@/modules/posts/components/post-form';
import usePostToast from '@/modules/posts/hooks/use-post-toast';
import { usePostsState } from '@/modules/posts/states/posts.state';

export default function PostEditPage(_pageProps: PageBaseProps) {
  const params = useParams();
  const postsState = usePostsState();

  usePostToast();

  useEffect(() => {
    if (params.id) postsState.readRequest(params.id as string);
  }, [params.id]);

  return (
    <PageWrapper>
      {postsState.isReading && (
        <div className="flex h-full items-center justify-center p-4">
          <Loading />
        </div>
      )}
      {postsState.detail && <PostForm data={postsState.detail} />}
    </PageWrapper>
  );
}
