'use client';

import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { MediaContextProvider } from '@/components/common/media';
import ServiceWorker from '@/components/common/service-worker';
import Tracking from '@/components/common/third-party/tracking';

import { store } from '@/stores/redux/store';

import ErrorBoundary from '../error-boundary';

import '@/libs/svg-icons/dist/svg-icons.scss';
import '@ui/globals.css';

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnWindowFocus: false
    }
  }
});

type ProvidersProps = {
  children: ReactNode;
};

function Providers({ children }: ProvidersProps) {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
      <SessionProvider>
        <Provider store={store}>
          <ErrorBoundary>
            <Tracking />
            <ServiceWorker />
            <MediaContextProvider disableDynamicMediaQueries>{children}</MediaContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </ErrorBoundary>
        </Provider>
      </SessionProvider>
    </PersistQueryClientProvider>
  );
}

export default Providers;
