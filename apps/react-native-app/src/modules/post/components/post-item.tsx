import React, { FC } from 'react';
import { ds } from '~react-native-design-system';

import { PostEntity } from '../interfaces/post.interface';

import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { useThemeState } from '@/modules/theme/states/theme.state';

interface IPostItemProps {
  item: PostEntity;
}

export const PostItem: FC<IPostItemProps> = ({ item }) => {
  const { configs } = useThemeState();

  return (
    <View style={[ds.p10, ds.borderB1, ds.borderRed500]}>
      <View>
        <Text color={configs.foreground} fontWeight="Bold">
          {item.name}
        </Text>
      </View>
      <Text color={configs.foreground}>{item.description}</Text>
    </View>
  );
};
