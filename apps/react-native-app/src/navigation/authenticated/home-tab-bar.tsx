import React from 'react';
import { File, LayoutGrid, UserRound, Webhook } from 'lucide-react-native';
import { Platform, Pressable, View, ViewStyle } from 'react-native';
import { ds } from '@/design-system';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import Text from '@/components/core-ui/text';

import { useTheme } from '@/modules/theme/components/provider';

import { createStyle } from '@/utils/stylesheet.util';

const HomeTabBar = (props: BottomTabBarProps) => {
  const { themeConfigs } = useTheme();

  const foregroundColor = themeConfigs.foreground;
  const borderColor = themeConfigs.border;

  const renderIcon = (name: string, isFocused: boolean) => {
    let icon = null;
    const iconColor = isFocused ? themeConfigs.primary : foregroundColor;

    switch (name) {
      case 'Home':
        icon = <LayoutGrid size={28} color={iconColor} />;
        break;
      case 'UI':
        icon = <Webhook size={28} color={iconColor} />;
        break;
      case 'Profile':
        icon = <UserRound size={28} color={iconColor} />;
        break;
      case 'Settings':
        icon = <File size={28} color={iconColor} />;
        break;
      default:
        icon = <UserRound size={28} color={iconColor} />;
    }

    return icon;
  };

  return (
    <View
      style={[
        ds.row,
        ds.justifyEvenly,
        ds.borderT1,
        styles.background(themeConfigs.card),
        styles.border(borderColor),
        Platform.OS === 'ios' && ds.h80
      ]}
    >
      {props.state.routes.map((route, index) => {
        const { options } = props.descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = props.state.index === index;
        const color = isFocused ? themeConfigs.primary : foregroundColor;

        const onPress = () => {
          const event = props.navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate({ name: route.name, params: route.params, merge: true });
          }
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
          >
            {renderIcon(route.name, isFocused)}
            <Text color={color} fontSize={16}>
              {label.toString()}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default HomeTabBar;

const styles = createStyle({
  border: (color: string): ViewStyle => {
    return { borderColor: color };
  },
  background: (color: string): ViewStyle => {
    return { backgroundColor: color };
  }
});
