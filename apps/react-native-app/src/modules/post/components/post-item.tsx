import React, {FC} from 'react';
import {View} from 'react-native';

import {Text} from '@/components/core-ui';
import {DesignSystem as ds} from '@/components/core-ui/themes';

import {PostEntity} from '../interfaces/post.interface';

interface IPostItemProps {
  item: PostEntity;
}

export const PostItem: FC<IPostItemProps> = ({item}) => {
  return (
    <View style={[ds.p10, ds.borderB1, ds.borderCyan100]}>
      <View>
        <Text style={ds.fontBold}>{item.name}</Text>
      </View>
      <Text>{item.description}</Text>
    </View>
  );
};
