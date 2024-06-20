import React, { FC } from 'react';
import { Dimensions, ViewStyle } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';
import { ds } from '~react-native-design-system';

import View from '@/components/core-ui/view';

import { createStyle } from '@/utils/stylesheet.util';

const WINDOW_SIZES = Dimensions.get('window');
const banners = [
  { id: 1, image: require('@/assets/images/banner-1.jpg') },
  { id: 2, image: require('@/assets/images/banner-2.jpg') },
  { id: 3, image: require('@/assets/images/banner-3.jpg') }
];

interface ICarouselBanner {
  height?: number;
}

const CarouselBanner: FC<ICarouselBanner> = ({ height = 176 }) => {
  return (
    <View style={[styles.container(height)]}>
      <Carousel
        width={WINDOW_SIZES.width}
        loop={true}
        autoPlay={true}
        autoPlayInterval={4000}
        scrollAnimationDuration={1000}
        data={banners}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.87,
          parallaxAdjacentItemScale: 0.82,
          parallaxScrollingOffset: 50
        }}
        style={[ds.absolute, styles.carousel(height)]}
        renderItem={({ item }) => (
          <View style={[ds.relative]}>
            <FastImage
              source={item.image}
              resizeMode="cover"
              style={[ds.rounded10, ds.wFull, ds.hFull] as ImageStyle}
            />
          </View>
        )}
      />
    </View>
  );
};

export default CarouselBanner;

const styles = createStyle({
  container: (height: number): ViewStyle => {
    return {
      height: height * 0.85
    };
  },
  carousel: (height: number): ViewStyle => {
    return {
      height,
      top: -height * (0.15 / 2)
    };
  }
});
