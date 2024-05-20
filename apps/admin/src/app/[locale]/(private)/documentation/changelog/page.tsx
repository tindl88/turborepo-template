import classNames from 'classnames';
import { Badge } from '@ui/components/ui/badge';
import { Separator } from '@ui/components/ui/separator';

import { PageBaseProps } from '@/interfaces/page.interface';

import PageHeader from '@/components/common/page-header';
import PageWrapper from '@/components/common/page-wrapper';

export default function ChangeLogPage(_pageProps: PageBaseProps) {
  return (
    <PageWrapper>
      <div
        className={classNames(
          'changelog-root bg-card text-card-foreground flex grow flex-col rounded-lg border p-4 shadow-sm'
        )}
      >
        <PageHeader title="Changelog" description="Changelog" />
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="item">
            <div className="space-x-2">
              <Badge>v1.0.0</Badge>
              <span>-</span>
              <span className="text-sm text-gray-500">Mar 25th, 2024</span>
            </div>
            <div className="mt-4">
              <ul className="ml-8 list-disc">
                <li>Initial release of NextAP! Lots more coming soon though</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
