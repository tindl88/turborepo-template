import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import Heading from '@/components/core-ui/heading';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { AccommodationDetailScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

type AccommodationDetailHeaderProps = {
  routeParams: AccommodationDetailScreenParams;
  style?: StyleProp<ViewStyle>;
};

const AccommodationDetailHeader: FC<AccommodationDetailHeaderProps> = ({ style }) => {
  return (
    <View style={style}>
      <View>
        <Heading>Taj Mahal</Heading>
      </View>
      <View>
        <View>
          <Text>Rating</Text>
          <Text>4.8</Text>
          <Text>(120 reviewers)</Text>
        </View>
        <View>
          <Text>Price</Text>
          <Text>250$</Text>
          <Text>/night</Text>
        </View>
      </View>
    </View>
  );
};

export default AccommodationDetailHeader;
