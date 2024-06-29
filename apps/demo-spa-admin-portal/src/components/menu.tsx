import { Link } from 'react-router-dom';
import { useTranslations, useLocale } from 'use-intl';
import { useAuthState } from '@/modules/auth/states/auth.state';

const Menu = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { isAuthenticated, signOut } = useAuthState();

  return (
    <nav className="nav">
      <Link to={`/${locale}/dashboard`}>{t('home')}</Link>
      <Link to={`/${locale}/about`}>{t('about')}</Link>
      <Link to={`/${locale}/posts`}>{t('posts')}</Link>
      <Link to={`/${locale}/settings`}>{t('settings')}</Link>
      {!isAuthenticated && <Link to={`/${locale}/login`}>{t('login')}</Link>}
      {isAuthenticated && <button onClick={signOut}>Logout</button>}
    </nav>
  );
};

export default Menu;
