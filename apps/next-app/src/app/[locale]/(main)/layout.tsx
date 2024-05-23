import { Nunito } from 'next/font/google';
import { getServerSession } from 'next-auth';
import classNames from 'classnames';

import { LayoutProps } from '@/interfaces/layout.interface';

import Footer from '@/components/common/footer';
import Body from '@/components/common/layout/body';
import Head from '@/components/common/layout/head';
import Html from '@/components/common/layout/html';
import Root from '@/components/common/layout/root';
import TopBar from '@/components/common/topbar';

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
          <TopBar userSession={session} />
          {children}
          <Footer />
        </Root>
      </Body>
    </Html>
  );
}
