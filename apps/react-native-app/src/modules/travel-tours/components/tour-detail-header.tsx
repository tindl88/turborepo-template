import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import Heading from '@/components/core-ui/heading';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { TourDetailScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

type TourDetailHeaderProps = {
  routeParams: TourDetailScreenParams;
  style?: StyleProp<ViewStyle>;
};

const TourDetailHeader: FC<TourDetailHeaderProps> = ({ style }) => {
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

export default TourDetailHeader;
