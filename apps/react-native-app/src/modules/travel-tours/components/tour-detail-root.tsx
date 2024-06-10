import React, { FC } from 'react';

import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { TourDetailScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

type TourDetailRootProps = {
  routeParams: TourDetailScreenParams;
};

const TourDetailRoot: FC<TourDetailRootProps> = ({ routeParams }) => {
  return (
    <View>
      <Text>{routeParams.id}</Text>
    </View>
  );
};

export default TourDetailRoot;
