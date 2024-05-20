'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import RegisterForm from '@/modules/auth/components/register-form';
import RegisterFromMessages from '@/modules/auth/components/register-form-messages';

export default function RegisterPage(_pageProps: PageBaseProps) {
  return (
    <div className="grow">
      <RegisterFromMessages />
      <RegisterForm />
    </div>
  );
}
