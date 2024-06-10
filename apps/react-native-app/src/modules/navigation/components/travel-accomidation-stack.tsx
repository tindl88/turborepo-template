import React from 'react';
import TravelAccomodationDetailScreen from '@/screens/travel-accomodation-detail';
import TravelAccomodationsScreen from '@/screens/travel-accomodations';
import { createStackNavigator } from '@react-navigation/stack';

import { TravelAccomodationParamList } from '../interfaces/navigation.interface';

const Stack = createStackNavigator<TravelAccomodationParamList>();

const TravelAccomodationStack = () => {
  return (
    <Stack.Navigator initialRouteName="TravelAccomodations" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="TravelAccomodations"
        component={TravelAccomodationsScreen}
        initialParams={{ q: '', page: 1, limit: 10 }}
      />
      <Stack.Screen name="TravelAccomodationDetail" component={TravelAccomodationDetailScreen} />
    </Stack.Navigator>
  );
};

export default TravelAccomodationStack;
