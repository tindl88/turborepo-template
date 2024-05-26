import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { OtpInput } from '@/components/core-ui';

import { useAuthState } from '../states/auth.state';

const MAXIMUM_CODE_LENGTH = 5;

const VerifyOtpForm = () => {
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const authState = useAuthState();

  useEffect(() => {
    if (isPinReady) {
      console.log('Verifying');
      authState.verifyEmailOtpRequest(otpCode as any);
    }
  }, [isPinReady]);

  return (
    <View>
      <OtpInput code={otpCode} maximumLength={MAXIMUM_CODE_LENGTH} setCode={setOTPCode} setIsPinReady={setIsPinReady} />
    </View>
  );
};

export default VerifyOtpForm;
