import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MMKV} from 'react-native-mmkv';

import {useAppState} from '@/modules/app/states/app.state';
import {useAuthState} from '@/modules/auth/states/auth.state';

import {RootStackParamList} from '@/common/interfaces/navigation.interface';

import Anthenticated from './authenticated';
import Unanthenticated from './unauthenticated';

const storage = new MMKV();

const Stack = createStackNavigator<RootStackParamList>();

const InitNavigator = () => {
  const appState = useAppState();
  const authState = useAuthState();

  useEffect(() => {
    const authJsonString = storage.getString('@auth');

    authState.setUserData(authJsonString ? JSON.parse(authJsonString) : null);

    if (!appState.ready) appState.setAppReady(true);
  }, []);

  if (!appState.ready) return null;

  return (
    <Stack.Navigator screenOptions={{headerShown: false, presentation: 'transparentModal'}}>
      {authState.isAuthenticated ? (
        <Stack.Screen name="Anthenticated" component={Anthenticated} />
      ) : (
        <Stack.Screen name="Unanthenticated" component={Unanthenticated} />
      )}
    </Stack.Navigator>
  );
};

export default InitNavigator;
