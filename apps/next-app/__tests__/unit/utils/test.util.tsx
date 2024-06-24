import React, { FC, ReactElement, ReactNode } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { render, RenderOptions } from '@testing-library/react';

import ErrorBoundary from '@/components/common/error-boundary';
import { MediaContextProvider } from '@/components/common/media';

import enus from '@/locales/en-us.json';

type AllTheProvidersProps = {
  children: ReactNode;
  session?: Session | null;
};

export const AllTheProviders: FC<AllTheProvidersProps> = ({ children, session = null }) => {
  return (
    <NextIntlClientProvider timeZone="America/New_York" locale={'en-us'} messages={enus}>
      <SessionProvider session={session}>
        <ErrorBoundary>
          <MediaContextProvider disableDynamicMediaQueries>{children}</MediaContextProvider>
        </ErrorBoundary>
      </SessionProvider>
    </NextIntlClientProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
