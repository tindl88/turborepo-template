'use client';

import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { Separator } from '~ui/components/ui/separator';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageHeader from '@/components/common/page-header';
import PageWrapper from '@/components/common/page-wrapper';

import { SettingNav } from '@/modules/settings/components/setting-nav';
import SettingRoot from '@/modules/settings/components/setting-root';

export default function SettingsPage(_pageProps: PageBaseProps) {
  const t = useTranslations();

  const sidebarNavItems = [{ title: t('sidebar_menu_settings_appearance'), href: 'appearance' }];

  return (
    <PageWrapper>
      <div
        className={classNames(
          'settings-root flex grow flex-col rounded-lg border bg-card p-4 text-card-foreground shadow-sm'
        )}
      >
        <PageHeader title={t('page_settings')} description={t('page_settings_description')} />
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <SettingNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <SettingRoot />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
