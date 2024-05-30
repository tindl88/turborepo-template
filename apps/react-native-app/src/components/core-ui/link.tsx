import React, { FC } from 'react';
import { Pressable, StyleProp, TextStyle } from 'react-native';

import Text from '@/components/core-ui/text';

interface ILinkProps extends React.ComponentPropsWithoutRef<typeof Text> {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const Link: FC<ILinkProps> = ({ text, textStyle, onPress, ...rest }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={textStyle} {...rest}>
        {text}
      </Text>
    </Pressable>
  );
};

export default Link;
