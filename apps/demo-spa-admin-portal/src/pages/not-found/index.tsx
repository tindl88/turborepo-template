import { useTranslations } from 'use-intl';

const NotFound: React.FC = () => {
  const t = useTranslations();
  return <h1>{t('not_found')}</h1>;
};

export default NotFound;
