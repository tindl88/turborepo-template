import React, { FC } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';

import { TravelPlaceEntity } from '../interfaces/travel-places.interface';

import TravelPlaceItem from './travel-place-item';

type TravelPlaceListProps = {
  items: TravelPlaceEntity[];
};

const TravelPlaceList: FC<TravelPlaceListProps> = ({ items }) => {
  return (
    <ScrollView horizontal={true} contentContainerStyle={[ds.gap10, ds.px14]} showsHorizontalScrollIndicator={false}>
      {items.map(item => (
        <TravelPlaceItem key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

export default TravelPlaceList;
