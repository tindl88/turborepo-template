import React from 'react';
import ProfileScreen from '@/screens/profile';
import ProfileEditScreen from '@/screens/profile-edit';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileParamList } from '../interfaces/navigation.interface';

const Stack = createStackNavigator<ProfileParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
