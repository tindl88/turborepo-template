import React, { FC } from 'react';

import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { AccommodationDetailScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

type AccommodationDetailRootProps = {
  routeParams: AccommodationDetailScreenParams;
};

const AccommodationDetailRoot: FC<AccommodationDetailRootProps> = ({ routeParams }) => {
  return (
    <View>
      <Text>{routeParams.id}</Text>
    </View>
  );
};

export default AccommodationDetailRoot;
