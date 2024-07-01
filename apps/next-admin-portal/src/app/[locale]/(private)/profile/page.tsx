'use client';

import { PageBaseProps } from '@/interfaces/page.interface';

import Box from '@/components/box';
import PageWrapper from '@/components/pages/page-wrapper';

import ProfileRoot from '@/modules/profile/components/profile-root';

export default function ProfilePage(_pageProps: PageBaseProps) {
  return (
    <PageWrapper>
      <Box spacing={false}>
        <ProfileRoot />
      </Box>
    </PageWrapper>
  );
}
