import React from 'react';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TravelBottomTabParamList } from '../interfaces/navigation.interface';

import NotificationStack from './notification-stack';
import ProfileStack from './profile-stack';
import AccomodationStack from './travel-accomidation-stack';
import TravelExploreStack from './travel-explore-stack';
import TravelTabBar, { TravelTabBarProps } from './travel-tab-bar';
import TourStack from './travel-tour-stack';

const Tab = createBottomTabNavigator<TravelBottomTabParamList>();

const CustomTabBar = (props: TravelTabBarProps) => <TravelTabBar {...props} />;

const TravelBottomTabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator initialRouteName="TravelExploreStack" tabBar={CustomTabBar} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="TravelExploreStack" component={TravelExploreStack} options={{ tabBarLabel: t('home') }} />
      <Tab.Screen
        name="AccomodationStack"
        component={AccomodationStack}
        options={{ tabBarLabel: t('travel_accomodations') }}
      />
      <Tab.Screen name="TourStack" component={TourStack} options={{ tabBarLabel: t('travel_tours') }} />
      <Tab.Screen name="NotificationStack" component={NotificationStack} options={{ tabBarLabel: t('travel_tours') }} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ tabBarLabel: t('profile') }} />
    </Tab.Navigator>
  );
};

export default TravelBottomTabNavigator;
