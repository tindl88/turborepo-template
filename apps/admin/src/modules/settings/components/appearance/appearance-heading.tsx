import { useTranslations } from 'next-intl';
import { Separator } from '@ui/components/ui/separator';

const AppearanceHeading = () => {
  const t = useTranslations();

  return (
    <div>
      <div>
        <h3 className="text-lg font-medium">{t('sidebar_menu_settings_appearance')}</h3>
        <p className="text-muted-foreground">{t('sidebar_menu_settings_appearance_desc')}</p>
      </div>
      <Separator className="my-6" />
    </div>
  );
};

export default AppearanceHeading;
