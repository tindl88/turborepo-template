import React from 'react';
import { Platform, Pressable } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { ds } from '~react-native-design-system';
import { dynamicStyles } from '~react-native-design-system/utils/common-style.util';

import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';
import Icon from '@/components/icon';

import { useThemeState } from '@/modules/theme/states/theme.state';

export type TravelTabBarProps = {
  showText?: boolean;
} & BottomTabBarProps;

const TravelTabBar = ({ showText = false, ...rest }: TravelTabBarProps) => {
  const { configs } = useThemeState();

  const renderIcon = (name: string, isFocused: boolean) => {
    let icon = null;
    const iconColor = isFocused ? configs.primary[500] : configs.foreground;

    switch (name) {
      case 'TravelExploreStack':
        icon = <Icon name="Compass" size={28} color={iconColor} />;
        break;
      case 'AccommodationStack':
        icon = <Icon name="Hotel" size={28} color={iconColor} />;
        break;
      case 'TourStack':
        icon = <Icon name="TentTree" size={28} color={iconColor} />;
        break;
      case 'NotificationStack':
        icon = <Icon name="Bell" size={28} color={iconColor} />;
        break;
      case 'ProfileStack':
        icon = <Icon name="User" size={28} color={iconColor} />;
        break;
    }

    return icon;
  };

  return (
    <View
      style={[
        ds.row,
        ds.justifyEvenly,
        ds.borderT1,
        dynamicStyles.background(configs.card),
        dynamicStyles.border(configs.border),
        Platform.OS === 'ios' && ds.h80
      ]}
    >
      {rest.state.routes.map((route, index) => {
        const { options } = rest.descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = rest.state.index === index;
        const color = isFocused ? configs.primary[500] : configs.foreground;

        const onPress = () => {
          const event = rest.navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });

          if (!isFocused && !event.defaultPrevented) {
            rest.navigation.navigate({ name: route.name, params: route.params });
          }
        };

        const onLongPress = () => {
          rest.navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            style={[ds.itemsCenter, ds.p12]}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {renderIcon(route.name, isFocused)}
            {showText && (
              <Text color={color} fontSize={16}>
                {label.toString()}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

export default TravelTabBar;
