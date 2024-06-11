import React, { FC } from 'react';
import { ds } from '@/design-system';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import View from '@/components/core-ui/view';

import { AccomodationParamList } from '@/modules/navigation/interfaces/navigation.interface';
import { AccomodationEntity } from '@/modules/travel-accomodations/interfaces/accomodations.interface';

import PopularHotelItem from './accomodation-item';

type AccomodationListProps = {
  items: AccomodationEntity[];
};

const AccomodationList: FC<AccomodationListProps> = ({ items }) => {
  const navigation = useNavigation<StackNavigationProp<AccomodationParamList>>();

  return (
    <View style={ds.gap10}>
      {items.map(item => (
        <PopularHotelItem
          key={item.id}
          item={item}
          onPress={() =>
            navigation.navigate('AccomodationDetail', {
              id: item.id
            })
          }
        />
      ))}
    </View>
  );
};

export default AccomodationList;
