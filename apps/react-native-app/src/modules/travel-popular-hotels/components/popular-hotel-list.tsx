import React, { FC } from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { ds } from '~react-native-design-system';

import View from '@/components/core-ui/view';

import { TravelBottomTabParamList } from '@/modules/navigation/interfaces/navigation.interface';
import { AccommodationEntity } from '@/modules/travel-accommodations/interfaces/accommodations.interface';

import PopularHotelItem from './popular-hotel-item';

type PopularHotelListProps = {
  items: AccommodationEntity[];
};

const PopularHotelList: FC<PopularHotelListProps> = ({ items }) => {
  const navigation = useNavigation<BottomTabNavigationProp<TravelBottomTabParamList>>();

  return (
    <View style={ds.gap10}>
      {items.map(item => (
        <PopularHotelItem
          key={item.id}
          item={item}
          onPress={() => {
            navigation.navigate('AccommodationStack', {
              screen: 'AccommodationDetail',
              params: { id: item.id },
              initial: false
            });
          }}
        />
      ))}
    </View>
  );
};

export default PopularHotelList;
