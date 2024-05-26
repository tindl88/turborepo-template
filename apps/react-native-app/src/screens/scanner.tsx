import React, { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthenticatedParamList, HomeBottomTabParamList } from '@/interfaces';

import GeneralNavigationHeader from '@/components/common/header/general';
import { StatusBar } from '@/components/core-ui';
import { DesignSystem as ds } from '@/components/core-ui/themes';
import { Button } from '@/components/ui/button';

import GoogleMLKitScanner from '@/modules/scancode/components/google-ml-kit-scanner';
import { useScreenState } from '@/modules/screen/states/screen.state';

type Props = CompositeScreenProps<
  BottomTabScreenProps<HomeBottomTabParamList, 'ScanCode'>,
  StackScreenProps<AuthenticatedParamList>
>;

function ScanCodeScreen({}: Props) {
  const navigation = useNavigation();
  const [permissionResult, setPermissionResult] = useState('Not asked');
  const screenState = useScreenState();

  useEffect(() => {
    request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then(result => {
      setPermissionResult(result);
    });
  }, []);

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <GeneralNavigationHeader title={screenState.name} />
      <View style={[ds.flex1]}>
        {permissionResult === 'granted' && (
          <View style={ds.grow}>
            <GoogleMLKitScanner />
          </View>
        )}
        {permissionResult === 'blocked' && <Button label="Back" onPress={() => navigation.goBack()} />}
      </View>
    </View>
  );
}

export default ScanCodeScreen;
