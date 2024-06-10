import React from 'react';
import TravelTourDetailScreen from '@/screens/travel-tour-detail';
import TravelToursScreen from '@/screens/travel-tours';
import { createStackNavigator } from '@react-navigation/stack';

import { TravelTourParamList } from '../interfaces/navigation.interface';

const Stack = createStackNavigator<TravelTourParamList>();

const TravelTourStack = () => {
  return (
    <Stack.Navigator initialRouteName="TravelTours" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TravelTours" component={TravelToursScreen} initialParams={{ q: '', page: 1, limit: 10 }} />
      <Stack.Screen name="TravelTourDetail" component={TravelTourDetailScreen} />
    </Stack.Navigator>
  );
};

export default TravelTourStack;
