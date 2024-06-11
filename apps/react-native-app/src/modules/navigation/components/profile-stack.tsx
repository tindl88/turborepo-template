import React from 'react';
import ProfileScreen from '@/screens/profile';
import ProfileEditScreen from '@/screens/profile-edit';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProfileParamList } from '../interfaces/navigation.interface';

const Stack = createNativeStackNavigator<ProfileParamList>();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
