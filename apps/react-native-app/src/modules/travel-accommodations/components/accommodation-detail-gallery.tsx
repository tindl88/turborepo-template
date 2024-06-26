import React, { FC } from 'react';
import { Image, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import { ds } from '~react-native-design-system';

import View from '@/components/core-ui/view';

import { AccommodationDetailScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

type AccommodationDetailGalleryProps = {
  routeParams: AccommodationDetailScreenParams;
  style?: StyleProp<ViewStyle>;
};

const AccommodationDetailGallery: FC<AccommodationDetailGalleryProps> = ({ style }) => {
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

export default AccommodationDetailGallery;
