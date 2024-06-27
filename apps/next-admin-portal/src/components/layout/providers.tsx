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

import { setupPostListeners } from '@/modules/posts/states/posts.listener';

import { getQueryClient } from '@/utils/query-client.util';

import { startAppListening, store } from '@/stores/redux/store';

import ErrorBoundary from '../error-boundary';

import '@/libs/svg-icons/dist/svg-icons.scss';
import '~react-web-ui-shadcn/globals.css';

const queryClient = getQueryClient();
const asyncStoragePersister = createAsyncStoragePersister({ storage: AsyncStorage });

type ProvidersProps = {
  children: ReactNode;
};

// if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//   store.dispatch(themeActions.changeColorScheme('dark'));
// }

function Providers({ children }: ProvidersProps) {
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
            <MediaContextProvider disableDynamicMediaQueries>{children}</MediaContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </ErrorBoundary>
        </Provider>
      </SessionProvider>
    </PersistQueryClientProvider>
  );
}

export default Providers;
