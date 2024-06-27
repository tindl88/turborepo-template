import { Nunito } from 'next/font/google';
import { getServerSession } from 'next-auth';
import classNames from 'classnames';

import { LayoutProps } from '@/interfaces/layout.interface';

import Body from '@/components/layout/body';
import Head from '@/components/layout/head';
import Html from '@/components/layout/html';
import Root from '@/components/layout/root';
import LayoutWithLeftSidebar from '@/components/layout/with-left-sidebar';

import { authOptions } from '@/modules/auth/constants/auth.constant';

const fontNunito = Nunito({
  subsets: ['vietnamese'],
  variable: '--font-nunito',
  display: 'swap',
  weight: ['300', '400', '500', '700']
});

export default async function AuthLayout({ children, params }: LayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <Html locale={params.locale} className={session?.user?.preference?.theme}>
      <Head />
      <Body className={classNames(fontNunito.variable, session?.user?.preference?.themeColor, 'font-nunito')}>
        <Root>
          <LayoutWithLeftSidebar>{children}</LayoutWithLeftSidebar>
        </Root>
      </Body>
    </Html>
  );
}
