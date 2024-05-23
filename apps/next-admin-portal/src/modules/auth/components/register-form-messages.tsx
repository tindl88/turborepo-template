'use client';

import { useEffect } from 'react';
import { useToast } from '~ui/components/ui/use-toast';

import { useAuthState } from '@/modules/auth/states/auth.state';

const RegisterFromMessages = () => {
  const { toast } = useToast();
  const authState = useAuthState();

  const errorMsg = 'Đã xảy ra lỗi không thể đăng ký.';

  useEffect(() => {
    if (!authState.isCreating && authState.error) {
      toast({ title: 'Register', description: errorMsg });
    }
  }, [authState.isCreating]);

  return null;
};

export default RegisterFromMessages;
