import { getServerSession } from 'next-auth';

import { LayoutProps } from '@/interfaces/layout.interface';

import Body from '@/components/common/layout/body';
import Head from '@/components/common/layout/head';
import Html from '@/components/common/layout/html';
import Root from '@/components/common/layout/root';

import { authOptions } from '@/modules/auth/constants/auth.constant';

export default async function RedirectLayout({ children, params }: LayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <Html locale={params.locale} className={session?.user?.preference?.theme}>
      <Head />
      <Body className={session?.user?.preference?.themeColor}>
        <Root>{children}</Root>
      </Body>
    </Html>
  );
}
