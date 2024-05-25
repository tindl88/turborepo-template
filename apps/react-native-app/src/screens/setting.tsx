import {ScrollView} from 'react-native-gesture-handler';
import React from 'react';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {View} from 'react-native';

import {useLanguageState} from '@/modules/language/states/language.state';
import {useScreenState} from '@/modules/screen/states/screen.state';
import {useThemeState} from '@/modules/themes/states/themes.state';

import GeneralNavigationHeader from '@/components/common/header/general';
import {Divider, StatusBar} from '@/components/core-ui';
import {DesignSystem as ds} from '@/components/core-ui/themes';
import {Button} from '@/components/ui/button';

import {AuthenticatedParamList, DrawerParamList, HomeBottomTabParamList} from '@/common/interfaces';

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
        <Button label="Tiếng Việt" onPress={() => languageState.setLanguage('vi')} />
        <Button label="English" onPress={() => languageState.setLanguage('en')} />
        <Divider />
        <Button label="Dark Theme" onPress={() => themeState.setColorScheme('dark')} />
        <Button label="Light Theme" onPress={() => themeState.setColorScheme('light')} />
      </ScrollView>
    </View>
  );
}

export default SettingScreen;
