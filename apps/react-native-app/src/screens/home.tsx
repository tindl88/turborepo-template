import React from 'react';
import { Image, ImageSourcePropType, ImageStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList, HomeBottomTabParamList } from '@/interfaces';

import Divider from '@/components/core-ui/divider';
import Heading from '@/components/core-ui/heading';
import StatusBar from '@/components/core-ui/statusbar';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import {
  TravelCategories,
  TravelCategoryList,
  TravelCategoryTrigger
} from '@/modules/travel-categories/components/travel-categories';
import TravelHeader from '@/modules/travel-common/components/travel-header';
import TravelPlaces from '@/modules/travel-places/components/travel-places';
import TravelPopularDestinations from '@/modules/travel-popular-destinations/components/travel-popular-destinations';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeBottomTabParamList, 'Home'>,
  StackScreenProps<AuthenticatedParamList>
>;

function HomeScreen({}: Props) {
  const travelCategories = [
    { id: '1', name: 'Asia', image: require('@/assets/travels/category-asia.jpeg') },
    { id: '2', name: 'Europe', image: require('@/assets/travels/category-europe.jpeg') },
    { id: '3', name: 'America', image: require('@/assets/travels/category-america.jpeg') },
    { id: '4', name: 'Australia', image: require('@/assets/travels/category-australia.jpeg') },
    { id: '5', name: 'Africa', image: require('@/assets/travels/category-africa.jpeg') }
  ];

  return (
    <View style={[ds.flex1, ds.relative]}>
      <StatusBar background="transparent" />
      <TravelHeader />
      <Divider height={20} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Heading as="h3" fontWeight="Medium" text="Categories" style={ds.px14} />
        <TravelCategories defaultValue={travelCategories[0].id} onChange={_id => {}}>
          <TravelCategoryList style={[ds.row, ds.gap8, ds.px14, ds.py10]}>
            {travelCategories?.map(item => (
              <TravelCategoryTrigger key={item.id} style={[ds.p4, ds.rounded10, ds.w84]} value={item.id}>
                <>
                  <Image
                    style={[ds.wFull, ds.h56, ds.rounded8] as ImageStyle}
                    source={item.image as ImageSourcePropType}
                  />
                  <Text fontWeight="Bold" style={[ds.textCenter, ds.text14]}>
                    {item.name}
                  </Text>
                </>
              </TravelCategoryTrigger>
            ))}
          </TravelCategoryList>
        </TravelCategories>
        <TravelPlaces />
        <TravelPopularDestinations />
        <Divider height={10} />
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
