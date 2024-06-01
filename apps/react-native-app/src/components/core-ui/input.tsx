import React, { FC, forwardRef, Ref, useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, TextInputProps } from 'react-native';
import { Colors, ds } from '@/design-system';
import { dynamicStyles } from '@/design-system/utils/common-style.util';

import { useThemeState } from '@/modules/theme/states/theme.state';

import { ICoreUIBaseProps } from './types';

interface IInputTextProps extends ICoreUIBaseProps, TextInputProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onChangeText?: (text: string) => void;
}

const InputText: FC<IInputTextProps> = forwardRef(
  (
    {
      value,
      defaultValue,
      placeholder,
      keyboardType,
      secureTextEntry,
      multiline = false,
      visible = true,
      onChange,
      onChangeText,
      style
    },
    ref: Ref<TextInput>
  ) => {
    const [val, setVal] = useState(value);
    const { configs } = useThemeState();

    const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const target = event.nativeEvent;

      setVal(target.text);
      onChange?.(event);
      onChangeText?.(target.text);
    };

    if (!visible) return null;

    return (
      <TextInput
        ref={ref}
        style={[
          ds.border1,
          ds.rounded10,
          ds.px10,
          ds.text16,
          ds.leading20,
          dynamicStyles.color(configs.foreground),
          dynamicStyles.border(configs.border),
          dynamicStyles.background(configs.card),
          multiline ? ds.h144 : ds.h48,
          style
        ]}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray[400]}
        defaultValue={defaultValue}
        value={val}
        multiline={multiline}
        onChange={handleChange}
      />
    );
  }
);

export default InputText;
