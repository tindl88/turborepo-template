import React, { FC, useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import Carousel from 'react-native-reanimated-carousel';

import { DesignSystem as ds } from '@/components/core-ui/themes';

import Images from '@/assets/images';

const WINDOW_SIZES = Dimensions.get('window');
const banners = [
  { id: 1, image: Images.banner1 },
  { id: 2, image: Images.banner2 },
  { id: 3, image: Images.banner3 }
];

interface ICarouselBanner {
  height?: number;
}

const CarouselBanner: FC<ICarouselBanner> = ({ height = 176 }) => {
  const style = useMemo(
    () =>
      StyleSheet.create({
        container: { height: height * 0.85 },
        carousel: { height, top: -height * (0.15 / 2) }
      }),
    [height]
  );

  return (
    <View style={[style.container]}>
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
        style={[ds.absolute, style.carousel]}
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
