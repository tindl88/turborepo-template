import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import FilterScreen from '@/screens/filter';
import NotificationScreen from '@/screens/notification';
import PostDetailScreen from '@/screens/post-detail';
import PreloadScreen from '@/screens/preload';
import SearchScreen from '@/screens/search';

import {AuthenticatedParamList} from '@/common/interfaces';

import HomeDrawer from './home-drawer';

const Stack = createStackNavigator<AuthenticatedParamList>();

const Authenticated = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Preload" component={PreloadScreen} />
      <Stack.Screen name="HomeStack" component={HomeDrawer} options={{presentation: 'transparentModal'}} />
      <Stack.Screen name="Filter" component={FilterScreen} options={{presentation: 'modal'}} />
      <Stack.Screen name="Search" component={SearchScreen} options={{presentation: 'transparentModal'}} />
      <Stack.Screen name="Notification" component={NotificationScreen} options={{presentation: 'transparentModal'}} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
    </Stack.Navigator>
  );
};

export default Authenticated;
