'use client';

import { FC } from 'react';
import { Button } from '@ui/components/ui/button';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { AUTH_PROVIDER } from '../constants/auth.constant';

import { useAuthState } from '@/modules/auth/states/auth.state';

const FacebookSignInButton: FC<ComponentBaseProps> = ({ ...rest }) => {
  const authState = useAuthState();

  return (
    <Button
      data-testid="btn-signin-facebook"
      onClick={e => {
        e.preventDefault();
        authState.facebookSignIn({
          provider: AUTH_PROVIDER.FACEBOOK,
          redirect: true,
          callbackUrl: '/'
        });
      }}
      {...rest}
    >
      Facebook
    </Button>
  );
};

export default FacebookSignInButton;
