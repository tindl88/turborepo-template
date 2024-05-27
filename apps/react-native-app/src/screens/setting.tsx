import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ds } from '@/design-system';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList, DrawerParamList, HomeBottomTabParamList } from '@/interfaces';

import GeneralNavigationHeader from '@/components/common/header/general';
import Button from '@/components/core-ui/button';
import Divider from '@/components/core-ui/divider';
import StatusBar from '@/components/core-ui/statusbar';

import { useLanguageState } from '@/modules/language/states/language.state';
import { useScreenState } from '@/modules/screen/states/screen.state';
import { useThemeState } from '@/modules/themes/states/themes.state';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeBottomTabParamList, 'Setting'>,
  CompositeScreenProps<DrawerScreenProps<DrawerParamList>, StackScreenProps<AuthenticatedParamList>>
>;

function SettingScreen({}: Props) {
  const screenState = useScreenState();
  const themeState = useThemeState();
  const languageState = useLanguageState();

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader title={screenState.name} />
      <Divider />
      <ScrollView style={ds.flex1}>
        <Button onPress={() => languageState.setLanguage('vi')}>Tiếng Việt</Button>
        <Button onPress={() => languageState.setLanguage('en')}>English</Button>
        <Divider />
        <Button onPress={() => themeState.setColorScheme('dark')}>Dark Theme</Button>
        <Button onPress={() => themeState.setColorScheme('light')}>Light Theme</Button>
      </ScrollView>
    </View>
  );
}

export default SettingScreen;
