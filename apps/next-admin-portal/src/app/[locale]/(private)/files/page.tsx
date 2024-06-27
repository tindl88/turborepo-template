import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/pages/page-wrapper';

import FilesRoot from '@/modules/files/components/file-root';

export default function FilePage(_pageProps: PageBaseProps) {
  return (
    <PageWrapper>
      <FilesRoot categoryVisible={false} />
    </PageWrapper>
  );
}
