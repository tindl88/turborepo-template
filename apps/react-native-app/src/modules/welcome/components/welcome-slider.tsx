import React, { useMemo, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';
import { ExpandingDot } from 'react-native-animated-pagination-dots';
import FastImage, { ImageStyle, Source } from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import PagerView, { PagerViewOnPageScrollEventData } from 'react-native-pager-view';
import { Colors, ds } from '~react-native-design-system';

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
    title: 'Plan your Trip',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum in dolorem explicabo distinctio repudiandae!',
    image: require('@/assets/travels/welcome-1.jpg')
  },
  {
    id: '2',
    image: require('@/assets/travels/welcome-2.jpg'),
    title: 'Book the Flight',
    content:
      'Aperiam expedita distinctio beatae error, impedit iure officiis animi soluta numquam non alias libero fugit'
  },
  {
    id: '3',
    image: require('@/assets/travels/welcome-3.jpg'),
    title: "Let's Travel",
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

  const inputRange = [0, slides.length];
  const scrollX = Animated.add(scrollOffsetAnimatedValue, positionAnimatedValue).interpolate({
    inputRange,
    outputRange: [0, slides.length * width]
  });

  return (
    <View style={[ds.grow, ds.relative]}>
      <AnimatedPagerView
        ref={ref}
        initialPage={0}
        style={[ds.grow, ds.row, ds.absolute, ds.wFull, ds.hFull]}
        onPageScroll={onPageScroll}
      >
        {slides.map(item => (
          <View key={item.id} style={[ds.relative]}>
            <FastImage source={item.image} resizeMode="cover" style={[ds.absolute, ds.wFull, ds.hFull] as ImageStyle} />
            <View style={[ds.wFull, ds.hFull, ds.absolute, ds.left0, ds.top0, ds.bgBlack, ds.opacity30]} />
            <View style={[ds.flex1]}>
              <View style={[ds.grow]} />
              <LinearGradient
                colors={[
                  'rgba(0, 0, 0, 0)',
                  'rgba(0, 0, 0, 0.3)',
                  'rgba(0, 0, 0, 0.5)',
                  'rgba(0, 0, 0, 0.8)',
                  'rgba(0, 0, 0, 1)'
                ]}
                style={[ds.bottom0]}
              >
                <View style={[ds.pb208, ds.px14]}>
                  <Heading color={Colors.white} text={item.title} style={[ds.textCenter]} />
                  <Text
                    fontWeight="Medium"
                    color={Colors.white}
                    text={item.content}
                    style={[ds.textCenter, ds.text18, ds.mt20]}
                  />
                </View>
              </LinearGradient>
            </View>
          </View>
        ))}
      </AnimatedPagerView>
      <View style={[ds.absolute, ds.bottom144, ds.wFull]}>
        <ExpandingDot
          data={slides}
          activeDotColor={configs.primary[500]}
          inActiveDotColor={Colors.stone[400]}
          dotStyle={{}}
          //@ts-ignore
          scrollX={scrollX}
        />
      </View>
    </View>
  );
}
