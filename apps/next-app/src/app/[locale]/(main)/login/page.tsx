import { PageBaseProps } from '@/interfaces/page.interface';

import BackgroundImage from '@/components/background-image';

import LoginForm from '@/modules/auth/components/form-login';

import LoginBg from '@/assets/images/login-bg.jpg';

export default async function LoginPage(_pageProps: PageBaseProps) {
  return (
    <div className="relative grow">
      <BackgroundImage src={LoginBg} />
      <LoginForm />
    </div>
  );
}
