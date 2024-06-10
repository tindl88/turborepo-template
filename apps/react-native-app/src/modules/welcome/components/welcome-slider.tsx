import React, { useMemo, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import FastImage, { ImageStyle, Source } from 'react-native-fast-image';
import PagerView, { PagerViewOnPageScrollEventData } from 'react-native-pager-view';
import { Colors, ds } from '@/design-system';

import Heading from '@/components/core-ui/heading';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';

import { useThemeState } from '@/modules/theme/states/theme.state';

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
    image: require('@/assets/images/welcome_slide1.png'),
    title: 'Online Payment',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum in dolorem explicabo distinctio repudiandae!'
  },
  {
    id: '2',
    image: require('@/assets/images/welcome_slide1.png'),
    title: 'Quickly Transfer',
    content:
      'Aperiam expedita distinctio beatae error, impedit iure officiis animi soluta numquam non alias libero fugit'
  },
  {
    id: '3',
    image: require('@/assets/images/welcome_slide1.png'),
    title: 'Quickly Transfer',
    content:
      'Aperiam expedita distinctio beatae error, impedit iure officiis animi soluta numquam non alias libero fugit'
  },
  {
    id: '4',
    image: require('@/assets/images/welcome_slide1.png'),
    title: 'Quickly Transfer',
    content:
      'Aperiam expedita distinctio beatae error, impedit iure officiis animi soluta numquam non alias libero fugit'
  }
];

const width = Dimensions.get('window').width;

export default function WelcomeSlider() {
  const ref = useRef<PagerView>(null);
  const { configs } = useThemeState();
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
              <Heading color={configs.foreground} text={item.title} style={[ds.textCenter]} />
              <Text color={configs.foreground} text={item.content} style={[ds.textCenter, ds.text18, ds.mt20]} />
            </View>
          </View>
        ))}
      </AnimatedPagerView>
      <View style={ds.mb20}>
        <ExpandingDot
          data={slides}
          activeDotColor={configs.primary}
          inActiveDotColor={Colors.stone[400]}
          dotStyle={{}}
          //@ts-ignore
          scrollX={scrollX}
        />
      </View>
    </View>
  );
}
