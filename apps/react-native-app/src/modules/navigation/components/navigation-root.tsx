import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../interfaces/navigation.interface';

import { useAuthState } from '@/modules/auth/states/auth.state';
import { useLanguageState } from '@/modules/language/states/language.state';

import Anthenticated from './authenticated';
import Unanthenticated from './unauthenticated';

const Stack = createNativeStackNavigator<RootStackParamList>();

const NavigationRoot = () => {
  const authState = useAuthState();
  const { i18n } = useTranslation();
  const { language } = useLanguageState();

  useEffect(() => {
    i18n.changeLanguage(language.key);
  }, [language.key]);

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

export default NavigationRoot;
