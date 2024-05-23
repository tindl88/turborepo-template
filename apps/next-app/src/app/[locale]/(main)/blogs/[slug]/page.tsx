import React from 'react';
import { Metadata } from 'next';

import { PageBaseProps } from '@/interfaces/page.interface';

import PostApi from '@/modules/blogs/api/posts.api';
import PostDetail from '@/modules/blogs/components/post-detail';

type PageProps = PageBaseProps & {
  params: { locale: string; slug: string };
};

export default async function PostDetailPage(pageProps: PageProps) {
  const postResponse = await PostApi.getServerPost(pageProps.params.slug);

  return (
    <div className="grow">
      <PostDetail item={postResponse.data} />
    </div>
  );
}

export async function generateStaticParams() {
  const postsResponse = await PostApi.getServerPosts({ page: 1, limit: 30 });

  return postsResponse.data.map(post => ({ slug: post.slug }));
}

export async function generateMetadata(pageProps: PageProps): Promise<Metadata> {
  const postResponse = await PostApi.getServerPost(pageProps.params.slug);

  return {
    title: postResponse.data?.name,
    description: postResponse.data?.description
  };
}
