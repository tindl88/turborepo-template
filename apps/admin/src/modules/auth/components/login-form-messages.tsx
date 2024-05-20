'use client';

import { useEffect } from 'react';
import { useToast } from '@ui/components/ui/use-toast';

import { useAuthState } from '@/modules/auth/states/auth.state';

const LoginFormMessages = () => {
  const { toast } = useToast();
  const authState = useAuthState();

  useEffect(() => {
    if (!authState.isLoggedIn && authState.error) {
      toast({ title: 'Login', description: authState?.message });
    }
  }, [authState.isLoggedIn]);

  return null;
};

export default LoginFormMessages;
