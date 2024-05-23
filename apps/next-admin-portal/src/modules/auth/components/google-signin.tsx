'use client';

import { Button } from '~ui/components/ui/button';

import { AUTH_PROVIDER } from '../constants/auth.constant';

import { useAuthState } from '@/modules/auth/states/auth.state';

const GoogleSignInButton = ({ ...rest }) => {
  const authState = useAuthState();

  return (
    <Button
      data-testid="btn-signin-google"
      onClick={e => {
        e.preventDefault();
        authState.googleSignIn({
          provider: AUTH_PROVIDER.GOOGLE,
          redirect: true,
          callbackUrl: '/'
        });
      }}
      {...rest}
    >
      Google
    </Button>
  );
};

export default GoogleSignInButton;
