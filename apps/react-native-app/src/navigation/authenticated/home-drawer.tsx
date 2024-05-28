import React from 'react';
import { Pressable, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { ds } from '@/design-system';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';

import { DrawerParamList } from '@/interfaces';

import Heading from '@/components/core-ui/heading';
import Separator from '@/components/core-ui/separator';
import Text from '@/components/core-ui/text';
import IconHome from '@/components/svgs/ico-home';
import IconPackage from '@/components/svgs/ico-package';
import IconSettings from '@/components/svgs/ico-settings';
import IconUser from '@/components/svgs/ico-user';

import { useScreenState } from '@/modules/screen/states/screen.state';
import { useTheme } from '@/modules/theme/components/provider';

import HomeBottomTabNavigator from './home-bottom-tab';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerContent = (props: DrawerContentComponentProps) => {
  const screenState = useScreenState();
  const { themeConfigs } = useTheme();

  const primaryColor = themeConfigs.primary;
  const foregroundColor = themeConfigs.foreground;
  const borderColor = themeConfigs.border;

  const isActive = (currentScreen: string) => screenState.name === currentScreen;

  return (
    <DrawerContentScrollView style={styles.background(themeConfigs.card)} {...props}>
      <View style={[ds.pl16, ds.pb16]}>
        <Heading text="Bully" as={'h3'} color={foregroundColor} />
      </View>
      <Separator style={styles.border(borderColor)} />
      <View style={ds.pr16}>
        <Pressable
          style={[ds.row, ds.itemsCenter, ds.p12, isActive('Home') && [ds.bgPrimary500, ds.roundedRFull]]}
          onPress={() => props.navigation.navigate('Home')}
        >
          <IconHome color={isActive('Home') ? primaryColor : foregroundColor} />
          <Text
            fontWeight={isActive('Home') ? 'Bold' : 'Regular'}
            color={isActive('Home') ? primaryColor : foregroundColor}
            style={ds.ml12}
          >
            Home
          </Text>
        </Pressable>
        <Pressable
          style={[ds.row, ds.itemsCenter, ds.p12, isActive('UI') && [ds.bgPrimary500, ds.roundedRFull]]}
          onPress={() => props.navigation.navigate('UI')}
        >
          <IconPackage color={isActive('UI') ? primaryColor : foregroundColor} />
          <Text
            fontWeight={isActive('UI') ? 'Bold' : 'Regular'}
            color={isActive('UI') ? primaryColor : foregroundColor}
            style={ds.ml12}
          >
            UI Kit
          </Text>
        </Pressable>
        <Pressable
          style={[ds.row, ds.itemsCenter, ds.p12, isActive('ScanCode') && [ds.bgPrimary500, ds.roundedRFull]]}
          onPress={() => props.navigation.navigate('ScanCode')}
        >
          <IconPackage color={isActive('ScanCode') ? primaryColor : foregroundColor} />
          <Text
            fontWeight={isActive('ScanCode') ? 'Bold' : 'Regular'}
            color={isActive('ScanCode') ? primaryColor : foregroundColor}
            style={ds.ml12}
          >
            Scan Code
          </Text>
        </Pressable>
        <Pressable
          style={[ds.row, ds.itemsCenter, ds.p12, isActive('Setting') && [ds.bgPrimary500, ds.roundedRFull]]}
          onPress={() => props.navigation.navigate('Setting')}
        >
          <IconSettings color={isActive('Setting') ? primaryColor : foregroundColor} />
          <Text
            fontWeight={isActive('Setting') ? 'Bold' : 'Regular'}
            color={isActive('Setting') ? primaryColor : foregroundColor}
            style={ds.ml12}
          >
            Settings
          </Text>
        </Pressable>
        <Pressable
          style={[ds.row, ds.itemsCenter, ds.p12, isActive('Post') && [ds.bgPrimary500, ds.roundedRFull]]}
          onPress={() => props.navigation.navigate('Post')}
        >
          <IconSettings color={isActive('Post') ? primaryColor : foregroundColor} />
          <Text
            fontWeight={isActive('Post') ? 'Bold' : 'Regular'}
            color={isActive('Post') ? primaryColor : foregroundColor}
            style={ds.ml12}
          >
            Post
          </Text>
        </Pressable>
        <Pressable
          style={[ds.row, ds.itemsCenter, ds.p12, isActive('Profile') && [ds.bgPrimary500, ds.roundedRFull]]}
          onPress={() => props.navigation.navigate('Profile')}
        >
          <IconUser color={isActive('Profile') ? primaryColor : foregroundColor} />
          <Text
            fontWeight={isActive('Profile') ? 'Bold' : 'Regular'}
            color={isActive('Profile') ? primaryColor : foregroundColor}
            style={ds.ml12}
          >
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
  // FIXME: Update Style
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
  border(color?: string): ViewStyle;
  background(color?: string): ViewStyle;
  text(color?: string): TextStyle;
}>({
  border: color => {
    return { borderColor: color };
  },
  background: color => {
    return { backgroundColor: color };
  },
  text: color => {
    return { color: color };
  }
});
