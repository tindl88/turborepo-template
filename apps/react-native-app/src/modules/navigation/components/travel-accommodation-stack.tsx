import React from 'react';
import AccommodationDetailScreen from '@/screens/travel-accommodation-detail';
import AccommodationsScreen from '@/screens/travel-accommodations';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AccommodationParamList } from '../interfaces/navigation.interface';

const Stack = createNativeStackNavigator<AccommodationParamList>();

const AccommodationStack = ({}) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
