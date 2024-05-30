import React from 'react';
import { useTranslation } from 'react-i18next';
import HomeScreen from '@/screens/home';
import PostScreen from '@/screens/post';
import ProfileScreen from '@/screens/profile';
import ScanCodeScreen from '@/screens/scanner';
import UIScreen from '@/screens/ui';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeTabBar from '@/navigation/authenticated/home-tab-bar';

import { HomeBottomTabParamList } from '@/interfaces';

const Tab = createBottomTabNavigator<HomeBottomTabParamList>();

const CustomHomeTabBar = (props: BottomTabBarProps) => <HomeTabBar {...props} />;

const HomeBottomTabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator tabBar={CustomHomeTabBar} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: t('home') }} />
      <Tab.Screen name="UI" component={UIScreen} />
      <Tab.Screen name="ScanCode" component={ScanCodeScreen} options={{ tabBarLabel: t('scancode') }} />
      <Tab.Screen
        name="Post"
        component={PostScreen}
        options={{ tabBarLabel: t('post') }}
        initialParams={{ q: '', page: 1, limit: 10 }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: t('profile') }} />
    </Tab.Navigator>
  );
};

export default HomeBottomTabNavigator;
