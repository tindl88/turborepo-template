import React from 'react';
import { UserRound, Webhook } from 'lucide-react-native';
import { Platform, Pressable, View } from 'react-native';
import { Colors, ds } from '@/design-system';
import { dynamicStyles } from '@/design-system/utils/common-style.util';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import Text from '@/components/core-ui/text';
import IconHome from '@/components/svgs/ico-home';

import { useThemeState } from '@/modules/theme/states/theme.state';

const TabBar = (props: BottomTabBarProps) => {
  const { configs } = useThemeState();

  const foregroundColor = Colors.stone[600];
  const borderColor = configs.border;

  const renderIcon = (name: string, isFocused: boolean) => {
    let icon = null;
    const iconColor = isFocused ? configs.primary : foregroundColor;

    switch (name) {
      case 'Home':
        icon = <IconHome size={28} strokeWidth={1.5} color={iconColor} />;
        break;
      case 'UI':
        icon = <Webhook size={28} strokeWidth={1.5} color={iconColor} />;
        break;
      case 'Profile':
        icon = <UserRound size={28} strokeWidth={1.5} color={iconColor} />;
        break;
      default:
        icon = <UserRound size={28} strokeWidth={1.5} color={iconColor} />;
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
        dynamicStyles.border(borderColor),
        Platform.OS === 'ios' && ds.h80
      ]}
    >
      {props.state.routes.map((route, index) => {
        const { options } = props.descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = props.state.index === index;
        const color = isFocused ? configs.primary : foregroundColor;

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

export default TabBar;
