import React, { FC } from 'react';
import { ds } from '@/design-system';

import { TravelPlaceEntity } from '../interfaces/travel-places.interface';

import Heading from '@/components/core-ui/heading';
import Link from '@/components/core-ui/link';
import View from '@/components/core-ui/view';

import { useTheme } from '@/modules/theme/components/provider';

import TravelPlaceList from './travel-place-list';

type TravelPlacesProps = {};

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

const TravelPlaces: FC<TravelPlacesProps> = () => {
  const { themeConfigs } = useTheme();

  return (
    <>
      <View style={[ds.row, ds.itemsCenter, ds.justifyBetween, ds.px14, ds.py10]}>
        <Heading as="h3" fontWeight="Medium" text="Travel Places" />
        <Link text="See All" color={themeConfigs.primary} onPress={() => {}} />
      </View>
      <TravelPlaceList items={items} />
    </>
  );
};

export default TravelPlaces;
