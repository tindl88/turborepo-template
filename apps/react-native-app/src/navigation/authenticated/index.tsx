import React from 'react';
import FilterScreen from '@/screens/filter';
import HelpCenterScreen from '@/screens/help-center';
import NotificationScreen from '@/screens/notification';
import PostDetailScreen from '@/screens/post-detail';
import PreloadScreen from '@/screens/preload';
import PrivacyPolicyScreen from '@/screens/privacy-policy';
import ProfileEditScreen from '@/screens/profile-edit';
import SearchScreen from '@/screens/search';
import SettingScreen from '@/screens/setting';
import SettingLanguageScreen from '@/screens/setting-language';
import SettingThemeScreen from '@/screens/setting-theme';
import TermsAndConditionsScreen from '@/screens/terms-and-conditions';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthenticatedParamList } from '@/interfaces';

import HomeDrawer from './home-drawer';

const Stack = createStackNavigator<AuthenticatedParamList>();

const Authenticated = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Preload" component={PreloadScreen} />
      <Stack.Screen name="HomeStack" component={HomeDrawer} options={{ presentation: 'transparentModal' }} />
      <Stack.Screen name="Filter" component={FilterScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ presentation: 'transparentModal' }} />
      <Stack.Screen name="Notification" component={NotificationScreen} options={{ presentation: 'transparentModal' }} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="SettingLanguage" component={SettingLanguageScreen} />
      <Stack.Screen name="SettingTheme" component={SettingThemeScreen} />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
        options={{ title: 'Terms & Conditions' }}
      />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ title: 'Privacy Policy' }} />
    </Stack.Navigator>
  );
};

export default Authenticated;
