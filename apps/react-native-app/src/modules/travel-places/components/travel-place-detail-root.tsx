import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '~react-native-design-system';

import Separator from '@/components/core-ui/separator';
import View from '@/components/core-ui/view';

import { TravelPlaceDetailScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

import TravelPlaceDetailBody from './travel-place-detail-body';
import TravelPlaceDetailFooter from './travel-place-detail-footer';
import TravelPlaceDetailGallery from './travel-place-detail-gallery';
import TravelPlaceDetailHeader from './travel-place-detail-header';

type TravelPlaceDetailRootProps = {
  routeParams: TravelPlaceDetailScreenParams;
  style?: StyleProp<ViewStyle>;
};

const TravelPlaceDetailRoot: FC<TravelPlaceDetailRootProps> = ({ routeParams, style }) => {
  return (
    <View style={[ds.flex1, style]}>
      <ScrollView style={[ds.grow]}>
        <TravelPlaceDetailGallery routeParams={routeParams} />
        <TravelPlaceDetailHeader routeParams={routeParams} style={[ds.p14]} />
        <Separator />
        <TravelPlaceDetailBody routeParams={routeParams} style={[ds.p14]} />
      </ScrollView>
      <TravelPlaceDetailFooter routeParams={routeParams} style={[ds.px14, ds.pb14, ds.pt8]} />
    </View>
  );
};

export default TravelPlaceDetailRoot;
