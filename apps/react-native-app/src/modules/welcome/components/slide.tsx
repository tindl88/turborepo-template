import React, { FC, useEffect, useState } from 'react';
import { Animated, Dimensions, FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import FastImage, { ImageStyle, Source } from 'react-native-fast-image';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import VersionCheck from 'react-native-version-check';
import { ds } from '@/design-system';

import Text from '@/components/core-ui/text';

import Images from '@/assets/images';

const { width, height } = Dimensions.get('window');

interface IDotData {
  id: string;
  width: Animated.Value;
}

interface ISlideItem {
  id: string;
  image: Source | number;
  title: string;
  content: string;
}

interface IWelcomeSlideshowProps {
  style?: StyleProp<ViewStyle>;
}

const slides: ISlideItem[] = [
  {
    id: '1',
    image: Images.welcomSlide1,
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

const WelcomeSlideshow: FC<IWelcomeSlideshowProps> = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressValue = useSharedValue(10);

  return (
    <View>
      <Carousel
        width={width}
        height={height / 2}
        loop={true}
        autoPlay={true}
        autoPlayInterval={4000}
        scrollAnimationDuration={400}
        pagingEnabled={true}
        snapEnabled={true}
        data={slides}
        renderItem={({ item }) => (
          <View style={[ds.justifyBetween]}>
            <FastImage source={item.image} resizeMode="contain" style={[ds.wFull, ds.h40Percent] as ImageStyle} />
            <View>
              <Text text={item.title} style={[ds.textCenter, ds.text36]} />
              <Text text={VersionCheck.getCurrentVersion()} style={ds.textCenter} />
              <Text text={item.content} style={ds.textCenter} />
            </View>
          </View>
        )}
        onSnapToItem={index => setActiveIndex(index)}
        onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
      />
      <View style={[ds.flex, ds.itemsCenter]}>
        <Dots data={slides} activeIndex={activeIndex} />
      </View>
    </View>
  );
};

const Dots: FC<{ data: ISlideItem[]; activeIndex: number }> = ({ data, activeIndex }) => {
  const animatedList: IDotData[] = data.map(item => ({ id: item.id, width: new Animated.Value(10) }));

  useEffect(() => {
    animatedList.forEach(item => item.width.setValue(10));

    Animated.timing(animatedList[activeIndex].width, { toValue: 20, duration: 250, useNativeDriver: false }).start();
  }, [data, activeIndex]);

  return (
    <FlatList
      horizontal
      data={animatedList}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <DotItem item={item} />}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const DotItem: FC<{ item: IDotData }> = ({ item }) => {
  const animatedStyle = { width: item.width };

  return <Animated.View style={[styles.dotItem, animatedStyle]} />;
};

export default WelcomeSlideshow;

const styles = StyleSheet.create({
  dotItem: {
    height: 10,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'gray'
  }
});
