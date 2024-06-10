import React from 'react';
import { Pressable } from 'react-native';
import { ds } from '@/design-system';
import { dynamicStyles } from '@/design-system/utils/common-style.util';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';

import { TravelDrawerParamList } from '../interfaces/navigation.interface';

import Heading from '@/components/core-ui/heading';
import Separator from '@/components/core-ui/separator';
import Text from '@/components/core-ui/text';
import View from '@/components/core-ui/view';
import IconHome from '@/components/svgs/ico-home';
import IconPackage from '@/components/svgs/ico-package';
import IconSettings from '@/components/svgs/ico-settings';
import IconUser from '@/components/svgs/ico-user';

import { useScreenState } from '@/modules/screen/states/screen.state';
import { useThemeState } from '@/modules/theme/states/theme.state';

import TravelBottomTabNavigator from './travel-bottom-tab';

const Drawer = createDrawerNavigator<TravelDrawerParamList>();

const DrawerContent = (props: DrawerContentComponentProps) => {
  const screenState = useScreenState();
  const { configs } = useThemeState();

  const primaryForegroundColor = configs.primaryForeground;
  const foregroundColor = configs.foreground;
  const borderColor = configs.border;

  const isActive = (currentScreen: string) => screenState.name === currentScreen;

  return (
    <DrawerContentScrollView style={dynamicStyles.background(configs.card)} {...props}>
      <View style={[ds.pl16, ds.pb16]}>
        <Heading
          text="Travel Drawer"
          as={'h3'}
          color={foregroundColor}
          onPress={() => props.navigation.navigate('HomeDrawer')}
        />
      </View>
      <Separator style={[ds.mb12, dynamicStyles.border(borderColor)]} />
      <View style={ds.pr16}>
        <Pressable
          style={[
            ds.row,
            ds.itemsCenter,
            ds.roundedRFull,
            ds.p12,
            isActive('Home') && dynamicStyles.background(configs.primary)
          ]}
          onPress={() => props.navigation.navigate('TravelDrawer', { screen: 'Home' })}
        >
          <IconHome color={isActive('Home') ? primaryForegroundColor : foregroundColor} />
          <Text
            fontWeight={isActive('Home') ? 'Bold' : 'Regular'}
            color={isActive('Home') ? primaryForegroundColor : foregroundColor}
            style={ds.ml12}
          >
            Home
          </Text>
        </Pressable>
        <Pressable
          style={[
            ds.row,
            ds.itemsCenter,
            ds.roundedRFull,
            ds.p12,
            isActive('UI') && dynamicStyles.background(configs.primary)
          ]}
          onPress={() => props.navigation.navigate('UI')}
        >
          <IconPackage color={isActive('UI') ? primaryForegroundColor : foregroundColor} />
          <Text
            fontWeight={isActive('UI') ? 'Bold' : 'Regular'}
            color={isActive('UI') ? primaryForegroundColor : foregroundColor}
            style={ds.ml12}
          >
            UI Kit
          </Text>
        </Pressable>
        <Pressable
          style={[
            ds.row,
            ds.itemsCenter,
            ds.roundedRFull,
            ds.p12,
            isActive('ScanCode') && dynamicStyles.background(configs.primary)
          ]}
          onPress={() => props.navigation.navigate('ScanCode')}
        >
          <IconPackage color={isActive('ScanCode') ? primaryForegroundColor : foregroundColor} />
          <Text
            fontWeight={isActive('ScanCode') ? 'Bold' : 'Regular'}
            color={isActive('ScanCode') ? primaryForegroundColor : foregroundColor}
            style={ds.ml12}
          >
            Scan Code
          </Text>
        </Pressable>
        <Pressable
          style={[
            ds.row,
            ds.itemsCenter,
            ds.roundedRFull,
            ds.p12,
            isActive('Settings') && dynamicStyles.background(configs.primary)
          ]}
          onPress={() => props.navigation.navigate('Settings')}
        >
          <IconSettings color={isActive('Settings') ? primaryForegroundColor : foregroundColor} />
          <Text
            fontWeight={isActive('Settings') ? 'Bold' : 'Regular'}
            color={isActive('Settings') ? primaryForegroundColor : foregroundColor}
            style={ds.ml12}
          >
            Settings
          </Text>
        </Pressable>
        <Pressable
          style={[
            ds.row,
            ds.itemsCenter,
            ds.roundedRFull,
            ds.p12,
            isActive('Post') && dynamicStyles.background(configs.primary)
          ]}
          onPress={() => props.navigation.navigate('Post')}
        >
          <IconSettings color={isActive('Post') ? primaryForegroundColor : foregroundColor} />
          <Text
            fontWeight={isActive('Post') ? 'Bold' : 'Regular'}
            color={isActive('Post') ? primaryForegroundColor : foregroundColor}
            style={ds.ml12}
          >
            Post
          </Text>
        </Pressable>
        <Pressable
          style={[
            ds.row,
            ds.itemsCenter,
            ds.roundedRFull,
            ds.p12,
            isActive('Profile') && dynamicStyles.background(configs.primary)
          ]}
          onPress={() => props.navigation.navigate('ProfileStack')}
        >
          <IconUser color={isActive('Profile') ? primaryForegroundColor : foregroundColor} />
          <Text
            fontWeight={isActive('Profile') ? 'Bold' : 'Regular'}
            color={isActive('Profile') ? primaryForegroundColor : foregroundColor}
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

const TravelDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawerContent} screenOptions={{ headerShown: false, drawerType: 'front' }}>
      <Drawer.Screen name="TravelBottomTabStack" component={TravelBottomTabNavigator} />
    </Drawer.Navigator>
  );
};

export default TravelDrawer;
