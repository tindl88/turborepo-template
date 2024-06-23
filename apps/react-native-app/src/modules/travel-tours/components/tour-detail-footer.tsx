import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import Button from '@/components/core-ui/button';
import View from '@/components/core-ui/view';

import { TourDetailScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

type TourDetailFooterProps = {
  routeParams: TourDetailScreenParams;
  style?: StyleProp<ViewStyle>;
};

const TourDetailFooter: FC<TourDetailFooterProps> = ({ style }) => {
  return (
    <View style={style}>
      <Button size="lg">Booking Now</Button>
    </View>
  );
};

export default TourDetailFooter;
