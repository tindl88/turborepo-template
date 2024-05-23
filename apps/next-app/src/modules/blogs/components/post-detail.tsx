import React, { FC } from 'react';
import classNames from 'classnames';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { PostEntity } from '../interfaces/posts.interface';

type PostDetailProps = {
  item: PostEntity;
} & ComponentBaseProps;

const PostDetail: FC<PostDetailProps> = ({ className, item }) => {
  if (!item) return <>Something went wrong.</>;

  return (
    <div className={classNames('post-detail border text-center', className)}>
      <h1>{item.name}</h1>
      {item.description && <p>{item.description}</p>}
    </div>
  );
};

export default PostDetail;
