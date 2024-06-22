import React, { FC, forwardRef, useEffect, useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData } from 'react-native';
import { Colors, ds } from '~react-native-design-system';
import { dynamicStyles } from '~react-native-design-system/utils/common-style.util';

import { useThemeState } from '@/modules/theme/states/theme.state';

export interface IInputTextProps extends React.ComponentPropsWithRef<typeof TextInput> {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onChangeText?: (text: string) => void;
}

const InputText: FC<IInputTextProps> = forwardRef<TextInput, IInputTextProps>(
  (
    {
      value,
      defaultValue,
      placeholder,
      keyboardType,
      secureTextEntry,
      multiline = false,
      style,
      onChange,
      onChangeText,
      ...props
    },
    ref
  ) => {
    const [val, setVal] = useState(value);
    const { configs } = useThemeState();

    useEffect(() => {
      setVal(value);
    }, [value]);

    const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const text = event.nativeEvent.text;

      setVal(text);
      onChange?.(event);
      onChangeText?.(text);
    };

    return (
      <TextInput
        ref={ref}
        value={val}
        defaultValue={defaultValue}
        placeholder={placeholder}
        placeholderTextColor={Colors.stone[400]}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        style={[
          ds.border1,
          ds.rounded10,
          ds.px14,
          ds.text18,
          ds.leading20,
          dynamicStyles.color(configs.foreground),
          dynamicStyles.border(configs.border),
          dynamicStyles.background(configs.card),
          multiline ? ds.h144 : ds.h52,
          style
        ]}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

export default InputText;
