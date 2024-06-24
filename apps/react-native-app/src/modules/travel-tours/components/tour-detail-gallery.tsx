import React, { FC } from 'react';
import { Image, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import { ds } from '~react-native-design-system';

import View from '@/components/core-ui/view';

import { TourDetailScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

type TourDetailGalleryProps = {
  routeParams: TourDetailScreenParams;
  style?: StyleProp<ViewStyle>;
};

const TourDetailGallery: FC<TourDetailGalleryProps> = ({ style }) => {
  return (
    <View style={style}>
      <Image
        source={require('@/assets/travels/travel-place-taj-mahal.jpeg')}
        style={[ds.wFull, ds.rounded24, ds.overflowHidden] as ImageStyle}
        resizeMode="cover"
      />
    </View>
  );
};

export default TourDetailGallery;
