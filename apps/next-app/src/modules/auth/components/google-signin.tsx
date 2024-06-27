'use client';

import { Button } from '~react-web-ui-shadcn/components/ui/button';

import { useAuthState } from '@/modules/auth/states/auth.state';

const GoogleSignInButton = ({ ...rest }) => {
  const authState = useAuthState();

  return (
    <Button
      data-testid="btn-signin-google"
      onClick={e => {
        e.preventDefault();
        authState.googleSignIn({ redirect: true, callbackUrl: '/' });
      }}
      {...rest}
    >
      Google
    </Button>
  );
};

export default GoogleSignInButton;
