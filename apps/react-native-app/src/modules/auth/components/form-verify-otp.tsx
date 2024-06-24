import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import InputOTP from '@/components/core-ui/input-otp';
import View from '@/components/core-ui/view';

import { UnauthenticatedNavigationProps } from '@/modules/navigation/interfaces/navigation.interface';

const MAXIMUM_CODE_LENGTH = 5;

const VerifyOtpForm = () => {
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const navigation = useNavigation<UnauthenticatedNavigationProps>();

  useEffect(() => {
    if (isPinReady) {
      navigation.navigate('ResetPassword');
    }
  }, [isPinReady]);

  return (
    <View>
      <InputOTP code={otpCode} maximumLength={MAXIMUM_CODE_LENGTH} setCode={setOTPCode} setIsPinReady={setIsPinReady} />
    </View>
  );
};

export default VerifyOtpForm;
