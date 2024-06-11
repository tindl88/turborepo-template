import React, { FC } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { TourEntity } from '../interfaces/travel-tours.interface';

import { TourParamList } from '@/modules/navigation/interfaces/navigation.interface';

import TravelTourItem from './tour-item';

type TourListProps = {
  items: TourEntity[];
};

const TourList: FC<TourListProps> = ({ items }) => {
  const navigation = useNavigation<StackNavigationProp<TourParamList>>();

  return (
    <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={[ds.gap10, ds.px14]}>
      {items.map(item => (
        <TravelTourItem key={item.id} item={item} onPress={() => navigation.navigate('TourDetail', { id: item.id })} />
      ))}
    </ScrollView>
  );
};

export default TourList;
