import React, { FC } from 'react';
import { Image, ImageSourcePropType, ImageStyle } from 'react-native';
import { ds } from '@/design-system';
import { dynamicStyles } from '@/design-system/utils/common-style.util';

import { TravelPlaceEntity } from '../interfaces/travel-places.interface';

import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { useThemeState } from '@/modules/theme/states/theme.state';

type TravelPlaceItemProps = {
  item: TravelPlaceEntity;
};

const TravelPlaceItem: FC<TravelPlaceItemProps> = ({ item }) => {
  const { configs } = useThemeState();

  return (
    <View style={[ds.grow, ds.p6, ds.w240, ds.rounded24, dynamicStyles.background(configs.card)]}>
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
