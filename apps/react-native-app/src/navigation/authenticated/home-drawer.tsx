import React from 'react';
import { Pressable, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Colors, ds } from '@/design-system';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';

import { DrawerParamList } from '@/interfaces';

import { Heading, Text } from '@/components/core-ui';
import IconHome from '@/components/svgs/ico-home';
import IconPackage from '@/components/svgs/ico-package';
import IconSettings from '@/components/svgs/ico-settings';
import IconUser from '@/components/svgs/ico-user';

import { useScreenState } from '@/modules/screen/states/screen.state';
import { useThemeState } from '@/modules/themes/states/themes.state';

import HomeBottomTabNavigator from './home-bottom-tab';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerContent = (props: DrawerContentComponentProps) => {
  const screenState = useScreenState();
  const themeState = useThemeState();

  const foregroundColor = themeState.configs?.foreground;
  const isActive = (currentScreen: string) => screenState.name === currentScreen;

  return (
    <DrawerContentScrollView style={styles.background(themeState.configs?.card)} {...props}>
      <View style={[ds.borderB1, ds.borderBSlate200, ds.pl16, ds.pb10, ds.mb20]}>
        <Heading text="Bully" as={'h3'} color={foregroundColor} />
      </View>
      <View style={ds.pr16}>
        <Pressable
          style={[ds.row, ds.itemsCenter, ds.p12, isActive('Home') && [ds.bgPrimary500, ds.roundedRFull]]}
          onPress={() => props.navigation.navigate('Home')}
        >
          <IconHome color={isActive('Home') ? Colors.white : foregroundColor} />
          <Text color={isActive('Home') ? Colors.white : foregroundColor} style={ds.ml12}>
            Home
          </Text>
        </Pressable>
        <Pressable
          style={[ds.row, ds.itemsCenter, ds.p12, isActive('UI') && [ds.bgPrimary500, ds.roundedRFull]]}
          onPress={() => props.navigation.navigate('UI')}
        >
          <IconPackage color={isActive('UI') ? Colors.white : foregroundColor} />
          <Text color={isActive('UI') ? Colors.white : foregroundColor} style={ds.ml12}>
            UI Kit
          </Text>
        </Pressable>
        <Pressable
          style={[ds.row, ds.itemsCenter, ds.p12, isActive('ScanCode') && [ds.bgPrimary500, ds.roundedRFull]]}
          onPress={() => props.navigation.navigate('ScanCode')}
        >
          <IconPackage color={isActive('ScanCode') ? Colors.white : foregroundColor} />
          <Text color={isActive('ScanCode') ? Colors.white : foregroundColor} style={ds.ml12}>
            Scan Code
          </Text>
        </Pressable>
        <Pressable
          style={[ds.row, ds.itemsCenter, ds.p12, isActive('Setting') && [ds.bgPrimary500, ds.roundedRFull]]}
          onPress={() => props.navigation.navigate('Setting')}
        >
          <IconSettings color={isActive('Setting') ? Colors.white : foregroundColor} />
          <Text color={isActive('Setting') ? Colors.white : foregroundColor} style={ds.ml12}>
            Settings
          </Text>
        </Pressable>
        <Pressable
          style={[ds.row, ds.itemsCenter, ds.p12, isActive('Post') && [ds.bgPrimary500, ds.roundedRFull]]}
          onPress={() => props.navigation.navigate('Post')}
        >
          <IconSettings color={isActive('Post') ? Colors.white : foregroundColor} />
          <Text color={isActive('Post') ? Colors.white : foregroundColor} style={ds.ml12}>
            Post
          </Text>
        </Pressable>
        <Pressable
          style={[ds.row, ds.itemsCenter, ds.p12, isActive('Profile') && [ds.bgPrimary500, ds.roundedRFull]]}
          onPress={() => props.navigation.navigate('Profile')}
        >
          <IconUser color={isActive('Profile') ? Colors.white : foregroundColor} />
          <Text color={isActive('Profile') ? Colors.white : foregroundColor} style={ds.ml12}>
            Profile
          </Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => <DrawerContent {...props} />;

const HomeDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent} screenOptions={{ headerShown: false, drawerType: 'front' }}>
      <Drawer.Screen name="HomeBottomTabStack" component={HomeBottomTabNavigator} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;

const styles = StyleSheet.create<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
  background(color?: string): ViewStyle;
  text(color?: string): TextStyle;
}>({
  background: color => {
    return { backgroundColor: color };
  },
  text: color => {
    return { color: color };
  }
});
