import React, { FC } from 'react';
import { ds } from '@/design-system';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Heading from '@/components/core-ui/heading';
import Link from '@/components/core-ui/link';
import View from '@/components/core-ui/view';

import { AccomodationParamList } from '@/modules/navigation/interfaces/navigation.interface';
import { useThemeState } from '@/modules/theme/states/theme.state';
import { AccomodationEntity } from '@/modules/travel-accomodations/interfaces/accomodations.interface';

import PopularHotelList from './popular-hotel-list';

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

type PopularHotelsRootProps = {};

const PopularHotelsRoot: FC<PopularHotelsRootProps> = () => {
  const navigation = useNavigation<StackNavigationProp<AccomodationParamList>>();
  const { configs } = useThemeState();

  return (
    <View style={[ds.px14]}>
      <View style={[ds.row, ds.itemsCenter, ds.justifyBetween, ds.py10]}>
        <Heading as="h3" fontWeight="Medium" text="Popular Hotels" />
        <Link
          text="See All"
          color={configs.primary}
          onPress={() => navigation.navigate('Accomodations', { q: '', page: 1, limit: 10 })}
        />
      </View>
      <PopularHotelList items={items} />
    </View>
  );
};

export default PopularHotelsRoot;
