import React, {FC, ReactNode} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Pressable, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';

import {useScreenState} from '@/modules/screen/states/screen.state';
import {useThemeState} from '@/modules/themes/states/themes.state';

import {Heading} from '@/components/core-ui';
import Text from '@/components/core-ui/text';
import {Colors, DesignSystem as ds} from '@/components/core-ui/themes';
import IconArrowLeft from '@/components/svgs/ico-arrow-left';

interface IGeneralNavigationHeaderProps {
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
}

const GeneralNavigationHeader: FC<IGeneralNavigationHeaderProps> = ({
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
  const themeState = useThemeState();

  const foregroundColor = themeState.configs?.foreground;

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
          {backgroundImage && <FastImage source={{uri: backgroundImage}} />}
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

const styles = StyleSheet.create<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
  background(color: string): ViewStyle;
  border(color?: string): ViewStyle;
  heading(color: string): TextStyle;
  subHeading(color: string): TextStyle;
}>({
  background: color => {
    return {
      backgroundColor: color
    };
  },
  border: color => {
    return {borderColor: color};
  },
  heading: color => {
    return {
      color: color
    };
  },
  subHeading: color => {
    return {
      color: color
    };
  }
});
