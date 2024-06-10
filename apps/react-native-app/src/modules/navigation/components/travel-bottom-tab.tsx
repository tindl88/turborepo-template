import React from 'react';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TravelBottomTabParamList } from '../interfaces/navigation.interface';

import NotificationStack from './notification-stack';
import ProfileStack from './profile-stack';
import TravelAccomodationStack from './travel-accomidation-stack';
import TravelExploreStack from './travel-explore-stack';
import TravelTabBar, { TravelTabBarProps } from './travel-tab-bar';
import TravelTourStack from './travel-tour-stack';

const Tab = createBottomTabNavigator<TravelBottomTabParamList>();

const CustomTabBar = (props: TravelTabBarProps) => <TravelTabBar {...props} />;

const TravelBottomTabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator tabBar={CustomTabBar} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="TravelExploreStack" component={TravelExploreStack} options={{ tabBarLabel: t('home') }} />
      <Tab.Screen
        name="TravelAccomodationStack"
        component={TravelAccomodationStack}
        options={{ tabBarLabel: t('travel_accomodations') }}
      />
      <Tab.Screen name="TravelTourStack" component={TravelTourStack} options={{ tabBarLabel: t('travel_tours') }} />
      <Tab.Screen name="NotificationStack" component={NotificationStack} options={{ tabBarLabel: t('travel_tours') }} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ tabBarLabel: t('profile') }} />
    </Tab.Navigator>
  );
};

export default TravelBottomTabNavigator;
