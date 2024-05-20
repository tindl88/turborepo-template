import { Metadata } from 'next';
import classNames from 'classnames';
import { Separator } from '@ui/components/ui/separator';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageHeader from '@/components/common/page-header';
import PageWrapper from '@/components/common/page-wrapper';

export default function ProfilePage(_pageProps: PageBaseProps) {
  return (
    <PageWrapper>
      <div
        className={classNames(
          'profile-root bg-card text-card-foreground flex grow flex-col rounded-lg border p-4 shadow-sm'
        )}
      >
        <PageHeader title="Profile" description="Profile" />
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <h1>Profile</h1>
        </div>
      </div>
    </PageWrapper>
  );
}

export async function generateMetadata(_pageProps: PageBaseProps): Promise<Metadata> {
  return {
    title: 'Profile',
    description: 'Profile Description'
  };
}
