import React, { FC, forwardRef, useEffect, useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, TextStyle, ViewStyle } from 'react-native';
import { Colors } from '~react-native-design-system';
import { dynamicStyles } from '~react-native-design-system/utils/common-style.util';

import { useThemeState } from '@/modules/theme/states/theme.state';

type InputSizeVariant = 'sm' | 'md' | 'lg';
type InputRoundedVariant = 'none' | 'sm' | 'md' | 'full';
export interface IInputTextProps extends React.ComponentPropsWithRef<typeof TextInput> {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  size?: InputSizeVariant;
  rounded?: InputRoundedVariant;
  error?: boolean;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
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
      size = 'md',
      rounded = 'full',
      error = false,
      style,
      onChange,
      onChangeText,
      onFocus,
      onBlur
    },
    ref
  ) => {
    const [val, setVal] = useState(value);
    const [isFocused, setIsFocused] = useState(false);
    const { configs } = useThemeState();

    const inputSizes = {
      sm: { height: 46, paddingHorizontal: 12, fontSize: 16, iconSize: 18 },
      md: { height: 52, paddingHorizontal: 20, fontSize: 18, iconSize: 20 },
      lg: { height: 56, paddingHorizontal: 28, fontSize: 20, iconSize: 22 }
    };
    const inputRoundedVariants = {
      none: { borderRadius: 0 },
      sm: { borderRadius: 4 },
      md: { borderRadius: 8 },
      lg: { borderRadius: 12 },
      full: { borderRadius: 9999 }
    };
    const { height, paddingHorizontal, fontSize } = inputSizes[size];
    const { borderRadius } = inputRoundedVariants[rounded];

    const inputStyle: ViewStyle | TextStyle = {
      fontSize,
      height,
      paddingHorizontal,
      borderRadius,
      borderWidth: 1,
      borderColor: error ? Colors.red[500] : isFocused ? configs.primary[500] : configs.border
    };

    const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const text = event.nativeEvent.text;

      onChange?.(event);
      setVal(text);
      onChangeText?.(text);
    };

    const handleFocus = () => {
      setIsFocused(true);
      onFocus?.();
    };

    const handleBlur = () => {
      setIsFocused(false);
      onBlur?.();
    };

    useEffect(() => {
      setVal(value);
    }, [value]);

    return (
      <TextInput
        ref={ref}
        value={val}
        defaultValue={defaultValue}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        placeholderTextColor={Colors.stone[400]}
        style={[dynamicStyles.color(configs.foreground), dynamicStyles.background(configs.card), inputStyle, style]}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );
  }
);

export default InputText;
