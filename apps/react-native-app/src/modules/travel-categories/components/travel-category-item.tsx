import React, { FC } from 'react';
import { Pressable } from 'react-native';

import Text from '@/components/core-ui/text';

type TravelCategoryItemProps = {
  onPress?: () => void;
};

const TravelCategoryItem: FC<TravelCategoryItemProps> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text>Text</Text>
    </Pressable>
  );
};

export default TravelCategoryItem;
