import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthenticatedParamList, HomeBottomTabParamList } from '@/interfaces';

import { Avatar, Text } from '@/components/core-ui';
import { Colors, DesignSystem as ds } from '@/components/core-ui/themes';
import IconBell from '@/components/svgs/ico-bell';
import IconMenu from '@/components/svgs/ico-menu';
import IconSliders from '@/components/svgs/ico-sliders';

import { useThemeState } from '@/modules/themes/states/themes.state';

function HomeNavigationHeader() {
  const navigation =
    useNavigation<
      CompositeNavigationProp<StackNavigationProp<HomeBottomTabParamList>, DrawerNavigationProp<AuthenticatedParamList>>
    >();
  const themeState = useThemeState();

  const foregroundColor = themeState.configs?.foreground;

  return (
    <View style={[ds.mx12, ds.mt10]}>
      <View style={[styles.background(themeState.configs?.card), ds.relative, ds.roundedFull]}>
        <View style={[ds.row, ds.justifyBetween, ds.itemsCenter, ds.pl16, ds.pr4, ds.py4]}>
          <View style={[ds.row, ds.shrink, ds.justifyBetween]}>
            <View style={[ds.row, ds.shrink, ds.itemsCenter]}>
              <Pressable style={ds.shrink} onPress={() => navigation.toggleDrawer()}>
                <IconMenu color={foregroundColor} />
              </Pressable>
              <Text
                style={[ds.grow, ds.pl12]}
                color={themeState.configs?.foreground}
                onPress={() => navigation.navigate('Search')}
              >
                Search
              </Text>
            </View>
            <View style={[ds.row]}>
              <Pressable style={ds.mr12} onPress={() => navigation.navigate('Filter')}>
                <IconSliders color={foregroundColor} />
              </Pressable>
              <Pressable style={ds.mr12} onPress={() => navigation.navigate('Notification')}>
                <IconBell color={foregroundColor} />
              </Pressable>
            </View>
          </View>
          <Avatar
            size={36}
            text="T"
            color={Colors.white}
            background={Colors.rose[400]}
            style={[ds.border2, ds.borderLime200]}
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
      </View>
    </View>
  );
}

export default HomeNavigationHeader;

const styles = StyleSheet.create<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
  background(color?: string): ViewStyle;
}>({
  background: color => {
    return { backgroundColor: color };
  }
});
