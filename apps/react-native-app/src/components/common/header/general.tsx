import React, { FC, ReactNode } from 'react';
import { Pressable, TextStyle, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors, ds } from '@/design-system';
import { useNavigation } from '@react-navigation/native';

import Heading from '@/components/core-ui/heading';
import Text from '@/components/core-ui/text';
import IconArrowLeft from '@/components/svgs/ico-arrow-left';

import { useScreenState } from '@/modules/screen/states/screen.state';
import { useTheme } from '@/modules/theme/components/provider';

import { createStyle } from '@/utils/stylesheet.util';

type GeneralNavigationHeaderProps = {
  title?: string;
  titleColor?: string;
  subTitle?: string;
  subTitleColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftFunc?: () => void;
  rightFunc?: () => void;
};

const GeneralNavigationHeader: FC<GeneralNavigationHeaderProps> = ({
  title = '',
  titleColor,
  subTitle = '',
  subTitleColor,
  borderColor = Colors.transparent,
  backgroundColor = Colors.transparent,
  backgroundImage = '',
  leftIcon = null,
  rightIcon = null,
  leftFunc,
  rightFunc
}) => {
  const navigation = useNavigation();
  const screenState = useScreenState();
  const { themeConfigs } = useTheme();

  const foregroundColor = themeConfigs.foreground;

  const goBack = () => {
    if (screenState.name === 'Home') return null;

    navigation.goBack();
  };

  const renderLeftIcon = () => {
    return leftIcon || <IconArrowLeft color={foregroundColor} />;
  };

  return (
    <View style={[ds.borderB1, styles.border(borderColor), styles.background(backgroundColor)]}>
      <View style={[ds.row, ds.justifyBetween, ds.itemsCenter, ds.px8]}>
        <Pressable
          style={[ds.w32, ds.h32, ds.textCenter, ds.itemsCenter, ds.justifyCenter]}
          onPress={leftFunc || goBack}
        >
          {renderLeftIcon()}
        </Pressable>
        <View style={[ds.column, ds.itemsCenter, ds.justifyCenter, ds.grow, ds.h56]}>
          {backgroundImage && <FastImage source={{ uri: backgroundImage }} />}
          {title && <Heading text={title} as={'h5'} color={titleColor ? titleColor : foregroundColor} />}
          {subTitle && <Text text={subTitle} color={subTitleColor ? subTitleColor : foregroundColor} />}
        </View>
        <Pressable style={[ds.w32, ds.h32, ds.textCenter, ds.itemsCenter, ds.justifyCenter]} onPress={rightFunc}>
          {rightIcon}
        </Pressable>
      </View>
    </View>
  );
};

export default GeneralNavigationHeader;

const styles = createStyle({
  background: (color: string): ViewStyle => {
    return {
      backgroundColor: color
    };
  },
  border: (color: string): ViewStyle => {
    return {
      borderColor: color
    };
  },
  heading: (color: string): TextStyle => {
    return {
      color: color
    };
  },
  subHeading: (color: string): TextStyle => {
    return {
      color: color
    };
  }
});
