// InputPassword.tsx
import React, { FC, forwardRef, useState } from 'react';
import { Pressable, TextInput } from 'react-native';
import { ds } from '~react-native-design-system';

import Icon from '../icon';

import InputText, { IInputTextProps } from './input';
import View from './view';

const InputPassword: FC<IInputTextProps> = forwardRef<TextInput, IInputTextProps>(
  ({ secureTextEntry = true, ...props }, ref) => {
    const [isSecure, setIsSecure] = useState(secureTextEntry);

    const toggleSecureEntry = () => {
      setIsSecure(!isSecure);
    };

    return (
      <View style={[ds.row, ds.itemsCenter, ds.relative]}>
        <InputText ref={ref} secureTextEntry={isSecure} {...props} style={[ds.grow, ds.pr44]} />
        <Pressable style={[ds.absolute, ds.right14]} onPress={toggleSecureEntry}>
          <Icon name={isSecure ? 'Eye' : 'EyeOff'} />
        </Pressable>
      </View>
    );
  }
);

export default InputPassword;
