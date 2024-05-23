'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import ErrorInformation from '@/components/common/error-information';

export default function NotFoundPage(_pageProps: PageBaseProps) {
  return (
    <div className="grow">
      <ErrorInformation code={404} />
    </div>
  );
}
