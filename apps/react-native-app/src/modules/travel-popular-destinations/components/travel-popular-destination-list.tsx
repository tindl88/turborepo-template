import React, { FC } from 'react';
import { ds } from '@/design-system';

import View from '@/components/core-ui/view';

import { AccomodationEntity } from '@/modules/travel-accomodations/interfaces/accomodations.interface';

import TravelPopularDestinationItem from './travel-popular-destination-item';

type TravelPopularDestinationListProps = {
  items: AccomodationEntity[];
};

const TravelPopularDestinationList: FC<TravelPopularDestinationListProps> = ({ items }) => {
  return (
    <View style={ds.gap10}>
      {items.map(item => (
        <TravelPopularDestinationItem key={item.id} item={item} />
      ))}
    </View>
  );
};

export default TravelPopularDestinationList;
