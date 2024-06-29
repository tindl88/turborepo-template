import { useLanguage } from '@/modules/languages/hooks/use-languages';
import { useTheme } from '@/modules/themes/hooks/use-themes';
import { useLocale, useTranslations } from 'use-intl';

const Settings = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { changeLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <h1>{t('settings')}</h1>
      <button onClick={toggleTheme}>{theme === 'light' ? 'Dark' : 'Light'}</button>
      <select value={locale} onChange={e => changeLanguage(e.target.value)}>
        <option value="en-us">English</option>
        <option value="vi-vn">Tiếng Việt</option>
      </select>
    </>
  );
};

export default Settings;
