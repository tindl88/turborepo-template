import React, { FC } from 'react';

import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { AccomodationDetailScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

type AccomodationDetailRootProps = {
  routeParams: AccomodationDetailScreenParams;
};

const AccomodationDetailRoot: FC<AccomodationDetailRootProps> = ({ routeParams }) => {
  return (
    <View>
      <Text>{routeParams.id}</Text>
    </View>
  );
};

export default AccomodationDetailRoot;
