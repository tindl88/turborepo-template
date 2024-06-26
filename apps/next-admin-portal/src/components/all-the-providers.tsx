'use client';

import React, { ReactNode, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Unsubscribe } from '@reduxjs/toolkit';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { MediaContextProvider } from '@/components/media';
import ServiceWorker from '@/components/service-worker';
import Tracking from '@/components/third-party/tracking';

import { AppDataProvider } from '@/modules/app-data/components/app-data.provider';
import { setupPostListeners } from '@/modules/posts/states/posts.listener';

import { getQueryClient } from '@/utils/query-client.util';

import { startAppListening, store } from '@/stores/redux/store';

import ErrorBoundary from './errors/error-boundary';

import '@/libs/svg-icons/dist/svg-icons.scss';
import '~react-web-ui-shadcn/globals.css';

const queryClient = getQueryClient();
const asyncStoragePersister = createAsyncStoragePersister({ storage: AsyncStorage });

type AllTheProvidersProps = {
  children: ReactNode;
};

function AllTheProviders({ children }: AllTheProvidersProps) {
  useEffect(() => {
    const subscriptions: Unsubscribe[] = [setupPostListeners(startAppListening)];

    return () => subscriptions.forEach(unsubscribe => unsubscribe());
  }, []);

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
      <SessionProvider>
        <Provider store={store}>
          <ErrorBoundary>
            <Tracking />
            <ServiceWorker />
            <MediaContextProvider disableDynamicMediaQueries>
              <AppDataProvider>{children}</AppDataProvider>
            </MediaContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </ErrorBoundary>
        </Provider>
      </SessionProvider>
    </PersistQueryClientProvider>
  );
}

export default AllTheProviders;
