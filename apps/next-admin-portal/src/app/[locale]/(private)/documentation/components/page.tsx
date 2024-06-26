'use client';

import classNames from 'classnames';
import { Separator } from '~react-web-ui-shadcn/components/ui/separator';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageHeader from '@/components/pages/page-header';
import PageWrapper from '@/components/pages/page-wrapper';

export default function ComponentsPage(_pageProps: PageBaseProps) {
  return (
    <PageWrapper>
      <div
        className={classNames(
          'component-root flex grow flex-col rounded-lg border bg-card p-4 text-card-foreground shadow-sm'
        )}
      >
        <PageHeader title="Components" description="Components" />
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <h1>Components</h1>
        </div>
      </div>
    </PageWrapper>
  );
}
