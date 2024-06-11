import React from 'react';
import AccommodationDetailScreen from '@/screens/travel-accommodation-detail';
import AccommodationsScreen from '@/screens/travel-accommodations';
import { createStackNavigator } from '@react-navigation/stack';

import { AccommodationParamList } from '../interfaces/navigation.interface';

const Stack = createStackNavigator<AccommodationParamList>();

const AccommodationStack = () => {
  return (
    <Stack.Navigator initialRouteName="Accommodations" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Accommodations"
        component={AccommodationsScreen}
        initialParams={{ q: '', page: 1, limit: 10 }}
      />
      <Stack.Screen name="AccommodationDetail" component={AccommodationDetailScreen} />
    </Stack.Navigator>
  );
};

export default AccommodationStack;
