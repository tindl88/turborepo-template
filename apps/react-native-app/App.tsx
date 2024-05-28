import React from 'react';
import CodePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import NavContainer from '@/navigation/container';

import { LanguageProvider } from '@/modules/language/components/provider';
import { ThemeProvider } from '@/modules/theme/components/provider';

import { MMKVStorage } from '@/utils/mmkv-storage.util';

import { store } from '@/stores/redux/store';

import '@/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // cacheTime: 1000 * 60 * 60 * 0.5, // 30 minutes
      // staleTime: 100000 // 10 seconds,
      refetchOnWindowFocus: false,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
    }
  }
});

const syncStoragePersister = createSyncStoragePersister({ storage: MMKVStorage });

const App = () => {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: syncStoragePersister }}>
      <Provider store={store}>
        <LanguageProvider>
          <ThemeProvider>
            <NavContainer />
          </ThemeProvider>
        </LanguageProvider>
      </Provider>
    </PersistQueryClientProvider>
  );
};

export default CodePush({
  installMode: CodePush.InstallMode.IMMEDIATE,
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME
})(App);
