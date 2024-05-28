import React, { FC } from 'react';
import { ds } from '@/design-system';

import { PostEntity } from '../interfaces/post.interface';

import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { useTheme } from '@/modules/theme/components/provider';

interface IPostItemProps {
  item: PostEntity;
}

export const PostItem: FC<IPostItemProps> = ({ item }) => {
  const { themeConfigs } = useTheme();

  return (
    <View style={[ds.p10, ds.borderB1, ds.borderRed500]}>
      <View>
        <Text color={themeConfigs.foreground} fontWeight="Bold">
          {item.name}
        </Text>
      </View>
      <Text color={themeConfigs.foreground}>{item.description}</Text>
    </View>
  );
};
