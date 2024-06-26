import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '~react-web-ui-shadcn/components/ui/button';

import { ComponentBaseProps } from '@/interfaces/component.interface';

import { ROUTES } from '@/constants/routes.constant';

const Unauthenticated: FC<ComponentBaseProps> = ({ visible = false, ...rest }) => {
  const router = useRouter();
  const t = useTranslations();

  if (!visible) return null;

  return (
    <div className="flex items-center gap-x-3" data-testid="unauthenticated" {...rest}>
      <Button data-testid="btn-signin" onClick={() => router.push(ROUTES.SIGN_IN)}>
        {t('signin')}
      </Button>
      <Button data-testid="btn-signup" onClick={() => router.push(ROUTES.REGISTER)}>
        {t('signup')}
      </Button>
    </div>
  );
};

export default Unauthenticated;
