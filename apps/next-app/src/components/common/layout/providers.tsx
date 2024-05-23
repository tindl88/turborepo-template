'use client';

import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { MediaContextProvider } from '@/components/common/media';
import ServiceWorker from '@/components/common/service-worker';
import Tracking from '@/components/common/third-party/tracking';

import { getQueryClient } from '@/utils/query-client.util';

import ErrorBoundary from '../error-boundary';

import '@/libs/svg-icons/dist/svg-icons.scss';
import '~ui/globals.css';

const queryClient = getQueryClient();
const asyncStoragePersister = createAsyncStoragePersister({ storage: AsyncStorage });

type ProvidersProps = {
  children: ReactNode;
};

function Providers({ children }: ProvidersProps) {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
      <SessionProvider>
        <ErrorBoundary>
          <Tracking />
          <ServiceWorker />
          <MediaContextProvider disableDynamicMediaQueries>{children}</MediaContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ErrorBoundary>
      </SessionProvider>
    </PersistQueryClientProvider>
  );
}

export default Providers;
