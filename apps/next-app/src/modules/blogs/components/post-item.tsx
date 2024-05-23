import React, { FC } from 'react';
import classNames from 'classnames';

import { Link } from '@/navigation';

import { ComponentBaseProps } from '@/interfaces/component.interface';
import { PostEntity } from '../interfaces/posts.interface';

type PostItemProps = {
  item: PostEntity;
} & ComponentBaseProps;

const PostItem: FC<PostItemProps> = ({ className, item, ...rest }) => {
  return (
    <div className={classNames('post-item border text-center', className)} data-testid="post-item" {...rest}>
      <h3>{<Link href={{ pathname: '/blogs/[slug]', params: { slug: item.slug } }}>{item.name}</Link>}</h3>
      {item.description && <p>{item.description}</p>}
    </div>
  );
};

export default PostItem;
