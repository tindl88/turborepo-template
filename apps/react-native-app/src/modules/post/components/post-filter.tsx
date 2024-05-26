import React, { FC } from 'react';
import { View } from 'react-native';

import { Input, Text } from '@/components/core-ui';

interface IPostFilterProps {
  value?: string;
  onTextChange?: (text: string) => void;
}

const PostFilters: FC<IPostFilterProps> = ({ value, onTextChange, ...rest }) => {
  return (
    <View {...rest}>
      <Text>Search</Text>
      <Input value={value} onChangeText={onTextChange} />
    </View>
  );
};

export default PostFilters;
