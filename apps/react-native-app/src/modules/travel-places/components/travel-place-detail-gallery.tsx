import React, { FC } from 'react';
import { Image, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import { ds } from '~react-native-design-system';

import View from '@/components/core-ui/view';

import { TravelPlaceDetailScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

type TravelPlaceDetailGalleryProps = {
  routeParams: TravelPlaceDetailScreenParams;
  style?: StyleProp<ViewStyle>;
};

const TravelPlaceDetailGallery: FC<TravelPlaceDetailGalleryProps> = ({ style }) => {
  return (
    <View style={style}>
      <Image
        source={require('@/assets/travels/travel-place-taj-mahal.jpeg')}
        style={[ds.wFull, ds.h320, ds.rounded24, ds.overflowHidden] as ImageStyle}
        resizeMode="cover"
      />
    </View>
  );
};

export default TravelPlaceDetailGallery;
