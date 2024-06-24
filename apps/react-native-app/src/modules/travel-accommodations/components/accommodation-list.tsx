import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ds } from '~react-native-design-system';

import View from '@/components/core-ui/view';

import { AccommodationParamList } from '@/modules/navigation/interfaces/navigation.interface';
import { AccommodationEntity } from '@/modules/travel-accommodations/interfaces/accommodations.interface';

import PopularHotelItem from './accommodation-item';

type AccommodationListProps = {
  items: AccommodationEntity[];
};

const AccommodationList: FC<AccommodationListProps> = ({ items }) => {
  const navigation = useNavigation<StackNavigationProp<AccommodationParamList>>();

  return (
    <View style={ds.gap10}>
      {items.map(item => (
        <PopularHotelItem
          key={item.id}
          item={item}
          onPress={() =>
            navigation.navigate('AccommodationDetail', {
              id: item.id
            })
          }
        />
      ))}
    </View>
  );
};

export default AccommodationList;
