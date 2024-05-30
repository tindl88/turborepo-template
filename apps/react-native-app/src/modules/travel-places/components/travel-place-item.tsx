import React, { FC } from 'react';
import { Image, ImageSourcePropType, ImageStyle } from 'react-native';
import { ds } from '@/design-system';

import { TravelPlaceEntity } from '../interfaces/travel-places.interface';

import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { useTheme } from '@/modules/theme/components/provider';

type TravelPlaceItemProps = {
  item: TravelPlaceEntity;
};

const TravelPlaceItem: FC<TravelPlaceItemProps> = ({ item }) => {
  const { theme } = useTheme();

  return (
    <View style={[ds.grow, ds.p6, ds.w240, ds.rounded24, theme === 'dark' ? ds.bgSlate800 : ds.bgZinc100]}>
      <Image style={[ds.wFull, ds.h144, ds.rounded20] as ImageStyle} source={item.image as ImageSourcePropType} />
      <View style={[ds.px10, ds.py6]}>
        <Text fontWeight="Bold" style={[ds.text14]}>
          {item.name}
        </Text>
        <Text style={[ds.text14]}>{item.location}</Text>
      </View>
    </View>
  );
};

export default TravelPlaceItem;
