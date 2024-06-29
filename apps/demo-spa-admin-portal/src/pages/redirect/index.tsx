import { Navigate } from 'react-router-dom';
import { useLocale } from 'use-intl';
import { useAuthState } from '../../modules/auth/states/auth.state';

const Redirect = () => {
  const locale = useLocale();
  const { isAuthenticated } = useAuthState();

  return <Navigate to={`/${locale}/${isAuthenticated ? 'dashboard' : 'login'}`} replace />;
};

export default Redirect;
