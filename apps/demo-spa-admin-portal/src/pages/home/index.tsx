import { useTranslations } from 'use-intl';

const Home = () => {
  const t = useTranslations();
  return <h1>{t('home')}</h1>;
};

export default Home;
