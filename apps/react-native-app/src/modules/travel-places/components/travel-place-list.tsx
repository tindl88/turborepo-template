import React, { FC } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ds } from '~react-native-design-system';

import { TravelPlaceEntity } from '../interfaces/travel-places.interface';

import { ExploreParamList } from '@/modules/navigation/interfaces/navigation.interface';

import TravelPlaceItem from './travel-place-item';

type TravelPlaceListProps = {
  items: TravelPlaceEntity[];
};

const TravelPlaceList: FC<TravelPlaceListProps> = ({ items }) => {
  const navigation = useNavigation<StackNavigationProp<ExploreParamList>>();

  return (
    <ScrollView horizontal={true} contentContainerStyle={[ds.gap10, ds.px14]} showsHorizontalScrollIndicator={false}>
      {items.map(item => (
        <TravelPlaceItem
          key={item.id}
          item={item}
          onPress={() => navigation.navigate('TravelPlaceDetail', { id: item.id })}
        />
      ))}
    </ScrollView>
  );
};

export default TravelPlaceList;
