import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ds } from '~react-native-design-system';

import { TravelPlaceEntity } from '../interfaces/travel-places.interface';

import Divider from '@/components/core-ui/divider';
import Heading from '@/components/core-ui/heading';
import Link from '@/components/core-ui/link';
import View from '@/components/core-ui/view';

import { ExploreParamList } from '@/modules/navigation/interfaces/navigation.interface';
import { useThemeState } from '@/modules/theme/states/theme.state';

import TravelPlaceList from './travel-place-list';

const items = [
  {
    id: '1',
    name: 'Taj Mahal',
    location: 'Uttar Pradesh, India',
    image: require('@/assets/travels/travel-place-taj-mahal.jpeg'),
    price: 50
  },
  {
    id: '2',
    name: 'Trang An',
    location: 'Ninh Binh, Viet Nam',
    image: require('@/assets/travels/travel-place-trang-an.jpeg'),
    price: 45
  },
  {
    id: '3',
    name: 'Angkor Wat',
    location: 'Siem Reap, Cambodia',
    image: require('@/assets/travels/travel-place-angkor-wat.jpeg'),
    price: 45
  }
] as TravelPlaceEntity[];

type TravelPlacesRootProps = {};

const TravelPlacesRoot: FC<TravelPlacesRootProps> = ({}) => {
  const navigation = useNavigation<StackNavigationProp<ExploreParamList>>();
  const { configs } = useThemeState();

  return (
    <>
      <View style={[ds.row, ds.itemsCenter, ds.justifyBetween, ds.px14]}>
        <Heading as="h3" fontWeight="Medium" text="Travel Places" />
        <Link
          text="See All"
          color={configs.primary[500]}
          onPress={() => navigation.navigate('TravelPlaces', { limit: 10, page: 1, q: '' })}
        />
      </View>
      <Divider height={10} />
      <TravelPlaceList items={items} />
    </>
  );
};

export default TravelPlacesRoot;
