import React from 'react';
import { useTranslation } from 'react-i18next';
import HomeScreen from '@/screens/home';
import ProfileScreen from '@/screens/profile';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TravelBottomTabParamList } from '@/interfaces';

import TabBar from '../tab-bar';

const Tab = createBottomTabNavigator<TravelBottomTabParamList>();

const CustomTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

const TravelBottomTabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator tabBar={CustomTabBar} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: t('home') }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: t('profile') }} />
    </Tab.Navigator>
  );
};

export default TravelBottomTabNavigator;
