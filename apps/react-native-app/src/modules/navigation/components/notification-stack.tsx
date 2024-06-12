import React from 'react';
import NotificationsScreen from '@/screens/notifications';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NotificationParamList } from '../interfaces/navigation.interface';

const Stack = createNativeStackNavigator<NotificationParamList>();

const NotificationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

export default NotificationStack;
