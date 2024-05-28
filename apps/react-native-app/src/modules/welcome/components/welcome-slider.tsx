import React, { useMemo, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import FastImage, { ImageStyle, Source } from 'react-native-fast-image';
import PagerView, { PagerViewOnPageScrollEventData } from 'react-native-pager-view';
import { ds } from '@/design-system';

import Heading from '@/components/core-ui/heading';
import Text from '@/components/core-ui/text';

import { useTheme } from '@/modules/theme/components/provider';

import Images from '@/assets/images';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

interface ISlideItem {
  id: string;
  image: Source | number;
  title: string;
  content: string;
}

const slides: ISlideItem[] = [
  {
    id: '1',
    image: Images.welcomSlide2,
    title: 'Online Payment',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum in dolorem explicabo distinctio repudiandae!'
  },
  {
    id: '2',
    image: Images.welcomSlide2,
    title: 'Quickly Transfer',
    content:
      'Aperiam expedita distinctio beatae error, impedit iure officiis animi soluta numquam non alias libero fugit'
  },
  {
    id: '3',
    image: Images.welcomSlide2,
    title: 'Quickly Transfer',
    content:
      'Aperiam expedita distinctio beatae error, impedit iure officiis animi soluta numquam non alias libero fugit'
  },
  {
    id: '4',
    image: Images.welcomSlide2,
    title: 'Quickly Transfer',
    content:
      'Aperiam expedita distinctio beatae error, impedit iure officiis animi soluta numquam non alias libero fugit'
  }
];

const width = Dimensions.get('window').width;

export default function WelcomeSlider() {
  const ref = useRef<PagerView>(null);
  const { themeConfigs } = useTheme();
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;
  const inputRange = [0, slides.length];
  const scrollX = Animated.add(scrollOffsetAnimatedValue, positionAnimatedValue).interpolate({
    inputRange,
    outputRange: [0, slides.length * width]
  });

  const onPageScroll = useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue
            }
          }
        ],
        {
          useNativeDriver: false
        }
      ),

    []
  );

  return (
    <View style={[ds.grow]}>
      <AnimatedPagerView ref={ref} initialPage={0} style={[ds.grow, ds.row]} onPageScroll={onPageScroll}>
        {slides.map(item => (
          <View key={item.id} style={[ds.mt20, ds.px20]}>
            <FastImage
              source={item.image}
              resizeMode="contain"
              style={[ds.wFull, ds.h256, ds.justifyCenter] as ImageStyle}
            />
            <View style={ds.mt24}>
              <Heading color={themeConfigs.foreground} text={item.title} style={[ds.textCenter]} />
              <Text color={themeConfigs.foreground} text={item.content} style={[ds.textCenter, ds.text18, ds.mt20]} />
            </View>
          </View>
        ))}
      </AnimatedPagerView>
      <View style={ds.mb20}>
        <ExpandingDot
          data={slides}
          activeDotColor={themeConfigs.primary}
          inActiveDotColor={themeConfigs.secondary}
          dotStyle={{}}
          //@ts-ignore
          scrollX={scrollX}
        />
      </View>
    </View>
  );
}
