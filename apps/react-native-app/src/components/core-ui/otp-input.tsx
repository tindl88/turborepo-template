import React, { useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { ds } from '@/design-system';
import { dynamicStyles } from '@/design-system/utils/common-style.util';

import { useThemeState } from '@/modules/theme/states/theme.state';

import Text from './text';

interface IOTPInputProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  maximumLength: number;
  setIsPinReady: React.Dispatch<React.SetStateAction<boolean>>;
}

const OTPInput: React.FC<IOTPInputProps> = ({ code, setCode, maximumLength, setIsPinReady }) => {
  const { configs } = useThemeState();
  const inputRef = useRef<TextInput>(null);
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const boxArray = new Array(maximumLength).fill(0);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current?.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === maximumLength);

    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code, setIsPinReady]);

  const boxDigit = (_: unknown, index: number) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;
    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;
    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    return (
      <View
        key={index}
        style={[
          ds.row,
          ds.itemsCenter,
          ds.justifyCenter,
          ds.w64,
          ds.h64,
          ds.rounded4,
          ds.border1,
          dynamicStyles.color(configs.foreground),
          dynamicStyles.border(configs.border),
          dynamicStyles.background(configs.background),
          isInputBoxFocused && isValueFocused && ds.borderBlue500
        ]}
      >
        <Text style={[ds.fontBold, ds.text32]}>{digit.toUpperCase()}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={[ds.itemsCenter, ds.justifyCenter]}>
        <Pressable style={[ds.row, ds.itemsCenter, ds.gap10]} onPress={handleOnPress}>
          {boxArray.map(boxDigit)}
        </Pressable>
      </View>
      <TextInput
        ref={inputRef}
        style={(ds.absolute, ds.opacity0)}
        value={code}
        keyboardType="numeric"
        maxLength={maximumLength}
        onChangeText={setCode}
        onBlur={handleOnBlur}
      />
    </>
  );
};

export default OTPInput;
