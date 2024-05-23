import { PageBaseProps } from '@/interfaces/page.interface';

import BackgroundImage from '@/components/common/background-image';

import LoginForm from '@/modules/auth/components/login-form';
import LoginFormMessages from '@/modules/auth/components/login-form-messages';

import LoginBg from '@/assets/images/login-bg.jpg';

export default async function LoginPage(_pageProps: PageBaseProps) {
  return (
    <div className="relative grow">
      <BackgroundImage src={LoginBg} />
      <LoginFormMessages />
      <LoginForm />
    </div>
  );
}
