import React from 'react';
import HelpCenterScreen from '@/screens/help-center';
import PreloadScreen from '@/screens/preload';
import PrivacyPolicyScreen from '@/screens/privacy-policy';
import ScanCodeScreen from '@/screens/scanner';
import SearchScreen from '@/screens/search';
import SettingLanguageScreen from '@/screens/setting-language';
import SettingThemeScreen from '@/screens/setting-theme';
import SettingsScreen from '@/screens/settings';
import TermsAndConditionsScreen from '@/screens/terms-and-conditions';
import UIScreen from '@/screens/ui';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthenticatedParamList } from '../interfaces/navigation.interface';

import TravelDrawer from './travel-drawer';

const Stack = createStackNavigator<AuthenticatedParamList>();

const Authenticated = () => {
  return (
    <Stack.Navigator initialRouteName="UI" screenOptions={{ headerShown: false }}>
      {/* BASE */}
      <Stack.Screen name="Preload" component={PreloadScreen} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ presentation: 'transparentModal' }} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="SettingLanguage" component={SettingLanguageScreen} />
      <Stack.Screen name="SettingTheme" component={SettingThemeScreen} />
      {/* TRAVEL APP */}
      <Stack.Screen name="TravelDrawer" component={TravelDrawer} options={{ presentation: 'transparentModal' }} />
      {/* DEMO */}
      <Stack.Screen name="ScanCode" component={ScanCodeScreen} />
      <Stack.Screen name="UI" component={UIScreen} />
    </Stack.Navigator>
  );
};

export default Authenticated;
