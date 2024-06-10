import React, { FC } from 'react';

import { TourEntity } from '../interfaces/travel-tours.interface';

import TourList from './tour-list';

type ToursRootProps = {};

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
] as TourEntity[];

const ToursRoot: FC<ToursRootProps> = () => {
  return <TourList items={items} />;
};

export default ToursRoot;
