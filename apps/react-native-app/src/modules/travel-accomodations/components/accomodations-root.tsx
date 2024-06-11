import React, { FC } from 'react';

import { AccomodationEntity } from '@/modules/travel-accomodations/interfaces/accomodations.interface';

import AccomodationList from './accomodation-list';

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

type AccomodationsRootProps = {};

const AccomodationsRoot: FC<AccomodationsRootProps> = () => {
  return <AccomodationList items={items} />;
};

export default AccomodationsRoot;
