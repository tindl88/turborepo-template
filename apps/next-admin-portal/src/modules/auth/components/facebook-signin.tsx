import { FC } from 'react';
import { Button } from '~react-web-ui-shadcn/components/ui/button';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { useAuthState } from '@/modules/auth/states/auth.state';

const FacebookSignInButton: FC<ComponentBaseProps> = ({ ...rest }) => {
  const authState = useAuthState();

  return (
    <Button
      data-testid="btn-signin-facebook"
      onClick={e => {
        e.preventDefault();
        authState.facebookSignIn({ redirect: true, callbackUrl: '/' });
      }}
      {...rest}
    >
      Facebook
    </Button>
  );
};

export default FacebookSignInButton;
