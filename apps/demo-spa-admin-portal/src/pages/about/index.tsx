import { useTranslations } from 'use-intl';

const About = () => {
  const t = useTranslations();
  return <h1>{t('about')}</h1>;
};

export default About;
