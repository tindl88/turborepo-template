'use client';

import React, { FC } from 'react';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import Pagination from '~react-web-ui-shadcn/components/ui/pagination-custom';

import { useRouter } from '@/navigation';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { PostFilter } from '../interfaces/posts.interface';

import PostApi from '../api/posts.api';

import PostList from './post-list';

type PostRootProps = {
  filter: PostFilter;
} & ComponentBaseProps;

const PostRoot: FC<PostRootProps> = ({ className, filter }) => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['posts', filter],
    queryFn: async () => await PostApi.getServerPosts(filter)
  });

  if (!data) return null;

  return (
    <div className={classNames('post-root', className)}>
      <PostList items={data.data} />
      <Pagination
        totalItems={data.meta?.paging?.totalItems}
        currentPage={data.meta?.paging?.currentPage}
        itemPerPage={data.meta?.paging?.itemsPerPage}
        onChange={page => router.push({ pathname: '/blogs', query: { page } })}
      />
    </div>
  );
};

export default PostRoot;
