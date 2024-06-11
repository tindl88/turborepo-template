import React from 'react';
import AccomodationDetailScreen from '@/screens/travel-accomodation-detail';
import AccomodationsScreen from '@/screens/travel-accomodations';
import { createStackNavigator } from '@react-navigation/stack';

import { AccomodationParamList } from '../interfaces/navigation.interface';

const Stack = createStackNavigator<AccomodationParamList>();

const AccomodationStack = () => {
  return (
    <Stack.Navigator initialRouteName="Accomodations" screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Accomodations"
        component={AccomodationsScreen}
        initialParams={{ q: '', page: 1, limit: 10 }}
      />
      <Stack.Screen name="AccomodationDetail" component={AccomodationDetailScreen} />
    </Stack.Navigator>
  );
};

export default AccomodationStack;
