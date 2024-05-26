import React, { FC, forwardRef, memo, Ref, useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
  useColorScheme
} from 'react-native';

import { Colors, DesignSystem as ds } from '../themes';
import { ICoreUIBaseProps } from '../types';

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
    const colorScheme = useColorScheme();

    const isDark = colorScheme === 'dark';

    const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const target = event.nativeEvent;

      setVal(target.text);
      onChange?.(event);
    };

    const handleTextChange = (text: string) => {
      setVal(text);
      onChangeText?.(text);
    };

    useEffect(() => {
      setVal(value);
    }, [value]);

    if (!visible) return null;

    return (
      <TextInput
        ref={ref}
        style={[
          ds.wFull,
          ds.border1,
          ds.rounded4,
          ds.px10,
          ds.text16,
          ds.leading20,
          isDark ? ds.textWhite : ds.textBlack,
          isDark ? ds.borderGray700 : ds.borderGray200,
          isDark ? ds.bgGray900 : ds.bgGray50,
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
        onChangeText={handleTextChange}
      />
    );
  }
);

export default memo(InputText);
