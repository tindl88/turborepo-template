import React from 'react';
import HomeScreen from '@/screens/home';
import TravelPlaceDetailScreen from '@/screens/travel-place-detail';
import TravelPlacesScreen from '@/screens/travel-places';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ExploreParamList } from '../interfaces/navigation.interface';

const Stack = createNativeStackNavigator<ExploreParamList>();

const TravelExploreStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TravelPlaces" component={TravelPlacesScreen} initialParams={{ q: '', page: 1, limit: 10 }} />
      <Stack.Screen name="TravelPlaceDetail" component={TravelPlaceDetailScreen} />
    </Stack.Navigator>
  );
};

export default TravelExploreStack;
