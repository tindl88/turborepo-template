import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { ds } from '~react-native-design-system';

import Button from '@/components/core-ui/button';
import StatusBar from '@/components/core-ui/statusbar';
import View from '@/components/core-ui/view';
import NavigationHeader from '@/components/navigation-header';

import { AuthenticatedParamList } from '@/modules/navigation/interfaces/navigation.interface';
import GoogleMLKitScanner from '@/modules/scancode/components/google-ml-kit-scanner';

type Props = StackScreenProps<AuthenticatedParamList, 'ScanCode'>;

function ScanCodeScreen({ route }: Props) {
  const navigation = useNavigation();
  const [permissionResult, setPermissionResult] = useState('Not asked');

  useEffect(() => {
    request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then(result => {
      setPermissionResult(result);
    });
  }, []);

  return (
    <View style={ds.flex1}>
      <StatusBar />
      <NavigationHeader title={route.name} />
      <View style={ds.flex1}>
        {permissionResult === 'granted' && (
          <View style={ds.grow}>
            <GoogleMLKitScanner />
          </View>
        )}
        {permissionResult === 'blocked' && <Button onPress={() => navigation.goBack()}>Back</Button>}
      </View>
    </View>
  );
}

export default ScanCodeScreen;
