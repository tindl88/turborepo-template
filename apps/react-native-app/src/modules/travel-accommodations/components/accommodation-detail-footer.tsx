import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import Button from '@/components/core-ui/button';
import View from '@/components/core-ui/view';

import { AccommodationDetailScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

type AccommodationDetailFooterProps = {
  routeParams: AccommodationDetailScreenParams;
  style?: StyleProp<ViewStyle>;
};

const AccommodationDetailFooter: FC<AccommodationDetailFooterProps> = ({ style }) => {
  return (
    <View style={style}>
      <Button size="lg">Booking Now</Button>
    </View>
  );
};

export default AccommodationDetailFooter;
