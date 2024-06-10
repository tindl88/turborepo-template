import React, { FC } from 'react';
import { ds } from '@/design-system';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

import View from '@/components/core-ui/view';

import { TravelBottomTabParamList } from '@/modules/navigation/interfaces/navigation.interface';
import { AccomodationEntity } from '@/modules/travel-accomodations/interfaces/accomodations.interface';

import PopularHotelItem from './popular-hotel-item';

type PopularHotelListProps = {
  items: AccomodationEntity[];
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
            navigation.navigate('AccomodationStack', {
              screen: 'AccomodationDetail',
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
