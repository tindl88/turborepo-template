import { useTranslations } from 'use-intl';

const Posts = () => {
  const t = useTranslations();

  return <h1>{t('posts')}</h1>;
};

export default Posts;
