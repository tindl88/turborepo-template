import React, { FC } from 'react';
import { View } from 'react-native';
import { ds } from '@/design-system';

import { PostEntity } from '../interfaces/post.interface';

import { Text } from '@/components/core-ui';

interface IPostItemProps {
  item: PostEntity;
}

export const PostItem: FC<IPostItemProps> = ({ item }) => {
  return (
    <View style={[ds.p10, ds.borderB1, ds.borderCyan100]}>
      <View>
        <Text style={ds.fontBold}>{item.name}</Text>
      </View>
      <Text>{item.description}</Text>
    </View>
  );
};
