import React, { createContext, useContext, useEffect, useState } from 'react';
import { ViewStyle } from 'react-native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { Colors, ds } from '@/design-system';
import { dynamicStyles } from '@/design-system/utils/common-style.util';

import { useThemeState } from '@/modules/theme/states/theme.state';

import Text from './text';
import View from './view';

type AvatarProps = {
  size?: number;
  style?: ViewStyle;
  children: React.ReactNode;
};

type AvatarImageProps = {
  style?: ImageStyle;
  src?: string;
};

interface IAvatarFallbackProps extends React.ComponentPropsWithoutRef<typeof Text> {
  style?: ViewStyle;
  children: React.ReactNode;
  charsToShow?: number;
}

const AvatarContext = createContext({
  isImageLoaded: false,
  setIsImageLoaded: (_loaded: boolean) => {}
});

const Avatar: React.FC<AvatarProps> = ({ style, children, size = 40, ...props }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <AvatarContext.Provider value={{ isImageLoaded, setIsImageLoaded }}>
      <View style={[ds.roundedFull, ds.overflowHidden, dynamicStyles.size(size), style]} {...props}>
        {children}
      </View>
    </AvatarContext.Provider>
  );
};

const AvatarImage: React.FC<AvatarImageProps> = ({ style, src = '', ...props }) => {
  const { setIsImageLoaded } = useContext(AvatarContext);

  useEffect(() => {
    if (!src) {
      setIsImageLoaded(false);
    } else {
      setIsImageLoaded(true);
    }
  }, [src]);

  return src ? (
    <FastImage
      source={{ uri: src }}
      style={[ds.wFull, ds.hFull, style] as ImageStyle}
      onError={() => setIsImageLoaded(false)}
      onLoad={() => setIsImageLoaded(true)}
      {...props}
    />
  ) : null;
};

const AvatarFallback: React.FC<IAvatarFallbackProps> = ({ style, children, charsToShow = 1, ...props }) => {
  const { isImageLoaded } = useContext(AvatarContext);
  const { configs } = useThemeState();

  if (isImageLoaded) return null;

  const name = children?.toString().substring(0, charsToShow).toUpperCase();

  return (
    <View
      style={[ds.wFull, ds.hFull, ds.itemsCenter, ds.justifyCenter, dynamicStyles.background(configs.primary), style]}
    >
      <Text fontWeight="Bold" fontSize={26} lineHeight={30} color={Colors.white} {...props}>
        {name}
      </Text>
    </View>
  );
};

export { Avatar, AvatarFallback, AvatarImage };
