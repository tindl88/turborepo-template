import React from 'react';
import TourDetailScreen from '@/screens/travel-tour-detail';
import ToursScreen from '@/screens/travel-tours';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TourParamList } from '../interfaces/navigation.interface';

const Stack = createNativeStackNavigator<TourParamList>();

const TourStack = () => {
  return (
    <Stack.Navigator initialRouteName="Tours" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tours" component={ToursScreen} initialParams={{ q: '', page: 1, limit: 10 }} />
      <Stack.Screen name="TourDetail" component={TourDetailScreen} />
    </Stack.Navigator>
  );
};

export default TourStack;
