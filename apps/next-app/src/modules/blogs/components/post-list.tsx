'use client';

import React, { FC } from 'react';
import classNames from 'classnames';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { PostEntity } from '../interfaces/posts.interface';

import PostItem from './post-item';

type PostListProps = {
  items: PostEntity[];
} & ComponentBaseProps;

const PostList: FC<PostListProps> = ({ className, items, ...rest }) => {
  return (
    <div className={classNames('grid grid-cols-4 gap-3', className)} data-testid="post-list" {...rest}>
      {items?.map(item => <PostItem key={item.id} item={item} />)}
    </div>
  );
};

export default PostList;
