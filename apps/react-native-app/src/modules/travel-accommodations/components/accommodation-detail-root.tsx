import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '~react-native-design-system';

import Separator from '@/components/core-ui/separator';
import View from '@/components/core-ui/view';

import { AccommodationDetailScreenParams } from '@/modules/navigation/interfaces/navigation.interface';

import AccommodationDetailBody from './accommodation-detail-body';
import AccommodationDetailFooter from './accommodation-detail-footer';
import AccommodationDetailGallery from './accommodation-detail-gallery';
import AccommodationDetailHeader from './accommodation-detail-header';

type AccommodationDetailRootProps = {
  routeParams: AccommodationDetailScreenParams;
  style?: StyleProp<ViewStyle>;
};

const AccommodationDetailRoot: FC<AccommodationDetailRootProps> = ({ routeParams, style }) => {
  return (
    <View style={[ds.flex1, style]}>
      <ScrollView style={[ds.grow]}>
        <AccommodationDetailGallery routeParams={routeParams} />
        <AccommodationDetailHeader routeParams={routeParams} style={[ds.p14]} />
        <Separator />
        <AccommodationDetailBody routeParams={routeParams} style={[ds.p14]} />
      </ScrollView>
      <AccommodationDetailFooter routeParams={routeParams} style={[ds.px14, ds.pb14, ds.pt8]} />
    </View>
  );
};

export default AccommodationDetailRoot;
