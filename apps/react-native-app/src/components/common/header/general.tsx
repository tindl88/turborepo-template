import React, { FC, ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ds } from '@/design-system';
import { dynamicStyles } from '@/design-system/utils/common-style.util';
import { useNavigation } from '@react-navigation/native';

import Heading from '@/components/core-ui/heading';
import Text from '@/components/core-ui/text';
import IconArrowLeft from '@/components/svgs/ico-arrow-left';

import { useScreenState } from '@/modules/screen/states/screen.state';
import { useThemeState } from '@/modules/theme/states/theme.state';

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
  borderColor,
  backgroundColor,
  backgroundImage = '',
  leftIcon = null,
  rightIcon = null,
  leftFunc,
  rightFunc
}) => {
  const navigation = useNavigation();
  const screenState = useScreenState();
  const { configs } = useThemeState();

  const foregroundColor = configs.foreground;

  const goBack = () => {
    if (screenState.name === 'Home') return null;

    navigation.goBack();
  };

  const renderLeftIcon = () => {
    return leftIcon || <IconArrowLeft color={foregroundColor} />;
  };

  return (
    <View
      style={[
        ds.borderB1,
        dynamicStyles.border(borderColor ?? configs.border),
        dynamicStyles.background(backgroundColor ?? configs.card)
      ]}
    >
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
