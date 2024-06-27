'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/pages/page-wrapper';

import DashboardRoot from '@/modules/dashboard/components/dashboard';

export default function DashboardPage(_pageProps: PageBaseProps) {
  return (
    <PageWrapper>
      <DashboardRoot />
    </PageWrapper>
  );
}
