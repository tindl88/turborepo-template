import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import Heading from '@/components/core-ui/heading';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { TravelPlaceDetailScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

type TravelPlaceDetailHeaderProps = {
  routeParams: TravelPlaceDetailScreenParams;
  style?: StyleProp<ViewStyle>;
};

const TravelPlaceDetailHeader: FC<TravelPlaceDetailHeaderProps> = ({ style }) => {
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

export default TravelPlaceDetailHeader;
