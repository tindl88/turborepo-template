import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {IconProps} from 'react-native-vector-icons/Icon';

interface IIconFeatherProps extends IconProps {}

const IconFeather: FC<IIconFeatherProps> = ({size = 28, style, ...rest}) => {
  return <Icon size={size} style={[style]} {...rest} />;
};

export default IconFeather;
