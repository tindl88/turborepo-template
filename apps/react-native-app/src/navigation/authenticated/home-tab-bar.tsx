import React from 'react';
import { Platform, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { ds } from '@/design-system';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import Text from '@/components/core-ui/text';
import IconHome from '@/components/svgs/ico-home';
import IconPackage from '@/components/svgs/ico-package';
import IconSettings from '@/components/svgs/ico-settings';
import IconUser from '@/components/svgs/ico-user';

import { useTheme } from '@/modules/theme/components/provider';

const HomeTabBar = (props: BottomTabBarProps) => {
  const { themeConfigs } = useTheme();

  const foregroundColor = themeConfigs.foreground;
  const borderColor = themeConfigs.border;

  const renderIcon = (name: string, isFocused: boolean) => {
    let icon = null;
    const iconColor = isFocused ? themeConfigs.primary : foregroundColor;

    switch (name) {
      case 'Home':
        icon = <IconHome color={iconColor} />;
        break;
      case 'UI':
        icon = <IconPackage color={iconColor} />;
        break;
      case 'Profile':
        icon = <IconUser color={iconColor} />;
        break;
      case 'Settings':
        icon = <IconSettings color={iconColor} />;
        break;
      default:
        icon = <IconHome color={iconColor} />;
    }

    return icon;
  };

  return (
    <View style={[ds.row, ds.justifyEvenly, ds.borderT1, styles.border(borderColor), Platform.OS === 'ios' && ds.h80]}>
      {props.state.routes.map((route, index) => {
        const { options } = props.descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

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
            <Text color={color}>{label.toString()}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default HomeTabBar;

const styles = StyleSheet.create<{
  // FIXME: Update style
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
  border(color?: string): ViewStyle;
}>({
  border: color => {
    return { borderColor: color };
  }
});
