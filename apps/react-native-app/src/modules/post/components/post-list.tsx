import React, { FC } from 'react';
import { FlashList } from '@shopify/flash-list';

import { PostEntity } from '../interfaces/post.interface';

import { PostItem } from './post-item';

interface IPostListProps {
  items?: PostEntity[];
}

export const PostList: FC<IPostListProps> = ({ items = [], ...rest }) => {
  if (items.length === 0) return null;

  return (
    <FlashList
      data={items}
      estimatedItemSize={50}
      renderItem={({ item }) => <PostItem item={item} />}
      keyExtractor={item => item.id.toString()}
      {...rest}
    />
  );
};
