import React, { useEffect, useState } from 'react';

import OtpInput from '@/components/core-ui/otp-input';
import View from '@/components/core-ui/view';

const MAXIMUM_CODE_LENGTH = 5;

const VerifyOtpForm = () => {
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);

  useEffect(() => {
    if (isPinReady) {
    }
  }, [isPinReady]);

  return (
    <View>
      <OtpInput code={otpCode} maximumLength={MAXIMUM_CODE_LENGTH} setCode={setOTPCode} setIsPinReady={setIsPinReady} />
    </View>
  );
};

export default VerifyOtpForm;
