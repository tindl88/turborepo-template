import React, { FC } from 'react';

import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { TravelPlaceDetailScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

type TravelPlaceDetailRootProps = {
  routeParams: TravelPlaceDetailScreenParams;
};

const TravelPlaceDetailRoot: FC<TravelPlaceDetailRootProps> = ({ routeParams }) => {
  return (
    <View>
      <Text>{routeParams.id}</Text>
    </View>
  );
};

export default TravelPlaceDetailRoot;
