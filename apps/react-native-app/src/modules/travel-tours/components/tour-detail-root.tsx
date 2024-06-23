import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '~react-native-design-system';

import Separator from '@/components/core-ui/separator';
import View from '@/components/core-ui/view';

import { TourDetailScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

import TourDetailBody from './tour-detail-body';
import TourDetailFooter from './tour-detail-footer';
import TourDetailGallery from './tour-detail-gallery';
import TourDetailHeader from './tour-detail-header';

type TourDetailRootProps = {
  routeParams: TourDetailScreenParams;
  style?: StyleProp<ViewStyle>;
};

const TourDetailRoot: FC<TourDetailRootProps> = ({ routeParams, style }) => {
  return (
    <View style={[ds.flex1, style]}>
      <ScrollView style={[ds.grow]}>
        <TourDetailGallery routeParams={routeParams} />
        <TourDetailHeader routeParams={routeParams} style={[ds.p14]} />
        <Separator />
        <TourDetailBody routeParams={routeParams} style={[ds.p14]} />
      </ScrollView>
      <TourDetailFooter routeParams={routeParams} style={[ds.px14, ds.pb14, ds.pt8]} />
    </View>
  );
};

export default TourDetailRoot;
