import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import OtpInput from '@/components/core-ui/otp-input';

import { useAuthState } from '../states/auth.state';

const MAXIMUM_CODE_LENGTH = 5;

const VerifyOtpForm = () => {
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const authState = useAuthState();

  useEffect(() => {
    if (isPinReady) {
      // FIXME: Fix type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
