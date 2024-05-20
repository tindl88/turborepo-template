import { PageBaseProps } from '@/interfaces/page.interface';

import PageWrapper from '@/components/common/page-wrapper';

import { AuditLogRoot } from '@/modules/audit-logs/components/audit-log-root';

export default function AuditLogsPage(_pageProps: PageBaseProps) {
  return (
    <PageWrapper>
      <AuditLogRoot />
    </PageWrapper>
  );
}
