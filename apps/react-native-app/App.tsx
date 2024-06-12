import React from 'react';
import CodePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import NavContainer from '@/modules/navigation/components/navigation-container';
import NotificationSetup from '@/modules/notifications/components/notification-setup';

import { MMKVStorage } from '@/utils/mmkv-storage.util';
import { getQueryClient } from '@/utils/query-client.util';

import { store } from '@/stores/redux/store';

import '@/global.css';

const queryClient = getQueryClient();
const asyncStoragePersister = createAsyncStoragePersister({ storage: MMKVStorage });

const App = () => {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
      <Provider store={store}>
        <NavContainer />
        <NotificationSetup />
      </Provider>
    </PersistQueryClientProvider>
  );
};

export default CodePush({
  installMode: CodePush.InstallMode.IMMEDIATE,
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME
})(App);
