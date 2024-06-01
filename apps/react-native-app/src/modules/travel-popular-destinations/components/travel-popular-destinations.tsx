import React, { FC } from 'react';
import { ds } from '@/design-system';

import Heading from '@/components/core-ui/heading';
import Link from '@/components/core-ui/link';
import View from '@/components/core-ui/view';

import { useThemeState } from '@/modules/theme/states/theme.state';
import { AccomodationEntity } from '@/modules/travel-accomodations/interfaces/accomodations.interface';

import TravelPopularDestinationList from './travel-popular-destination-list';

const items = [
  {
    id: '1',
    name: 'Bury Yuri',
    location: 'Bali, Indonesia',
    image: require('@/assets/travels/accomodation-1.jpeg'),
    rating: '4.5',
    price: 450
  },
  {
    id: '2',
    name: 'Palm Trees',
    location: 'Binh Thuan, Viet Nam',
    image: require('@/assets/travels/accomodation-2.jpeg'),
    rating: '4.5',
    price: 250
  },
  {
    id: '3',
    name: 'Yolana Dalana',
    location: 'Uttar Pradesh, India',
    image: require('@/assets/travels/accomodation-3.jpeg'),
    rating: '4.5',
    price: 190
  },
  {
    id: '4',
    name: 'Luxury Hotel',
    location: 'Davao, Philippines',
    image: require('@/assets/travels/accomodation-4.jpeg'),
    rating: '4.5',
    price: 320
  },
  {
    id: '5',
    name: 'Country Side',
    location: 'Kedah, Malaysia',
    image: require('@/assets/travels/accomodation-5.jpeg'),
    rating: '4.5',
    price: 280
  }
] as AccomodationEntity[];

type TravelPopularDestinationsProps = {};

const TravelPopularDestinations: FC<TravelPopularDestinationsProps> = () => {
  const { configs } = useThemeState();

  return (
    <View style={[ds.px14]}>
      <View style={[ds.row, ds.itemsCenter, ds.justifyBetween, ds.py10]}>
        <Heading as="h3" fontWeight="Medium" text="Popular Destinations" />
        <Link text="See All" color={configs.primary} onPress={() => {}} />
      </View>
      <TravelPopularDestinationList items={items} />
    </View>
  );
};

export default TravelPopularDestinations;
