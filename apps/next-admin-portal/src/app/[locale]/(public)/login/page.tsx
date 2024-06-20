'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import BackgroundImage from '@/components/common/background-image';

import LoginForm from '@/modules/auth/components/login-form';

import LoginBg from '@/assets/images/login-bg.jpg';

export default function LoginPage(_pageProps: PageBaseProps) {
  return (
    <div className="relative grow">
      <BackgroundImage src={LoginBg} />
      <LoginForm />
    </div>
  );
}
