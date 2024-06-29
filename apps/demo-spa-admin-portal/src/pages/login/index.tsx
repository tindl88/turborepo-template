import { useLocale, useTranslations } from 'use-intl';
import { useAuthState } from '../../modules/auth/states/auth.state';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { isAuthenticated, signIn } = useAuthState();

  if (isAuthenticated) {
    return <Navigate to={`/${locale}/dashboard`} />;
  }

  return (
    <div>
      <h1>{t('login')}</h1>
      <button onClick={() => signIn({ email: 'ammodesk@gmail.com', password: 'Ammodesk123@' })}>Login</button>
    </div>
  );
};

export default Login;
