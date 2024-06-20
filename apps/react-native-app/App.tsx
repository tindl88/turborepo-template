import React, { useEffect } from 'react';
import CodePush from 'react-native-code-push';
import { ToastProvider } from 'react-native-toast-notifications';
import { useAppState } from '@/states/app.state';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import NavContainer from '@/modules/navigation/components/navigation-container';
import NotificationSetup from '@/modules/notifications/components/notification-setup';

import { MMKVStorage } from '@/utils/mmkv-storage.util';
import { getQueryClient } from '@/utils/query-client.util';

import '@/global.css';

const queryClient = getQueryClient();
const asyncStoragePersister = createAsyncStoragePersister({ storage: MMKVStorage });

const App = () => {
  const appState = useAppState();

  useEffect(() => {
    if (!appState.ready) appState.setReady(true);
  }, []);

  if (!appState.ready) return null;

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
      <ToastProvider duration={4000} placement="bottom" animationType="slide-in">
        <NavContainer />
        <NotificationSetup />
      </ToastProvider>
    </PersistQueryClientProvider>
  );
};

export default CodePush({
  installMode: CodePush.InstallMode.IMMEDIATE,
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME
})(App);
