import React, { useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { ds } from '@/design-system';
import { BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList, HomeBottomTabParamList } from '@/interfaces';

import { Button, Divider, Heading, StatusBar, Text } from '@/components/core-ui';

import { useAuthState } from '@/modules/auth/states/auth.state';
import CarouselBanner from '@/modules/home/components/carousel';
import HomeNavigationHeader from '@/modules/home/components/header';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeBottomTabParamList, 'Home'>,
  StackScreenProps<AuthenticatedParamList>
>;

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolation.CLAMP)
  }));

  // styles
  const containerStyle = useMemo(() => [style, containerAnimatedStyle], [style, containerAnimatedStyle]);

  return <Animated.View style={containerStyle} />;
};

function HomeScreen({}: Props) {
  const authState = useAuthState();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%', '50%'], []);
  const handlePresentModalPress = useCallback(() => bottomSheetModalRef.current?.present(), []);

  return (
    <View style={[ds.flex1, ds.relative]}>
      <StatusBar />
      <HomeNavigationHeader />
      <Divider height={20} />
      <CarouselBanner />
      <View style={ds.flex1}>
        <Heading as={'h2'} text={'Name: ' + authState.auth?.user?.email} />
        <Button onPress={() => authState.logoutRequest()}>Sign Out</Button>
        <Button onPress={handlePresentModalPress}>Present Modal</Button>
      </View>
      <BottomSheetModalProvider>
        <View style={[ds.flex1, ds.p24, ds.justifyCenter]}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={CustomBackdrop}
            backgroundComponent={null}
            style={[ds.rounded12, ds.bgGray700]}
          >
            <View style={[ds.flex1, ds.itemsCenter]}>
              <Text>Awesome 🎉</Text>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
}

export default HomeScreen;
