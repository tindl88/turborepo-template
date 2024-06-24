'use client';

import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { Separator } from '~ui/components/ui/separator';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageHeader from '@/components/common/page-header';
import PageWrapper from '@/components/common/page-wrapper';

import NotificationRoot from '@/modules/notifications/components/notification-root';

export default function NotificationsPage(_pageProps: PageBaseProps) {
  const t = useTranslations();

  return (
    <PageWrapper>
      <div
        className={classNames(
          'settings-root flex grow flex-col rounded-lg border bg-card p-4 text-card-foreground shadow-sm'
        )}
      >
        <PageHeader title={t('page_notifications')} description={t('page_notifications_description')} />
        <Separator className="my-6" />
        <NotificationRoot />
      </div>
    </PageWrapper>
  );
}
