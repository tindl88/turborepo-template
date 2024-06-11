import React from 'react';
import NotificationsScreen from '@/screens/notifications';
import { createStackNavigator } from '@react-navigation/stack';

import { NotificationParamList } from '../interfaces/navigation.interface';

const Stack = createStackNavigator<NotificationParamList>();

const NotificationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

export default NotificationStack;
