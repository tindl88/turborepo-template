import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MMKV } from 'react-native-mmkv';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from '@/interfaces/navigation.interface';

import { useAppState } from '@/modules/app/states/app.state';
import { useAuthState } from '@/modules/auth/states/auth.state';
import { useLanguageState } from '@/modules/language/states/language.state';

import Anthenticated from './authenticated';
import Unanthenticated from './unauthenticated';

const storage = new MMKV();

const Stack = createStackNavigator<RootStackParamList>();

const InitNavigator = () => {
  const appState = useAppState();
  const authState = useAuthState();
  const { i18n } = useTranslation();
  const { language } = useLanguageState();

  useEffect(() => {
    const authJsonString = storage.getString('@auth');

    authState.setAuthData(authJsonString ? JSON.parse(authJsonString) : null);

    if (!appState.ready) appState.setAppReady(true);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language.key);
  }, [language.key]);

  if (!appState.ready) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, presentation: 'transparentModal' }}>
      {authState.isAuthenticated ? (
        <Stack.Screen name="Anthenticated" component={Anthenticated} />
      ) : (
        <Stack.Screen name="Unanthenticated" component={Unanthenticated} />
      )}
    </Stack.Navigator>
  );
};

export default InitNavigator;
