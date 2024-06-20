'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import RegisterForm from '@/modules/auth/components/register-form';

export default function RegisterPage(_pageProps: PageBaseProps) {
  return (
    <div className="grow">
      <RegisterForm />
    </div>
  );
}
