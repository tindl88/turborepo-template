import React, { useCallback, useRef, useState } from 'react';
import { Alert, AlertButton, Linking, View } from 'react-native';
import { Camera, Code, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { ds } from '@/design-system';
import { useIsFocused } from '@react-navigation/core';
import { useNavigation } from '@react-navigation/native';

import { useIsForeground } from '@/hooks/use-is-foreground';

import Button from '@/components/core-ui/button';

const showCodeAlert = (value: string, onDismissed: () => void): void => {
  const buttons: AlertButton[] = [
    {
      text: 'Close',
      style: 'cancel',
      onPress: onDismissed
    }
  ];

  if (value.startsWith('http')) {
    buttons.push({
      text: 'Open URL',
      onPress: () => {
        Linking.openURL(value);
        onDismissed();
      }
    });
  }
  Alert.alert('Scanned Code', value, buttons);
};

const GoogleMLKitScanner = () => {
  const navigation = useNavigation();
  // 1. Use a simple default back camera
  const device = useCameraDevice('back');

  // 2. Only activate Camera when the app is focused and this screen is currently opened
  const isFocused = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocused && isForeground;

  // 3. (Optional) enable a torch setting
  const [isTorch, setIsTorch] = useState(false);

  // 4. On code scanned, we show an aler to the user
  const isShowingAlert = useRef(false);
  const onCodeScanned = useCallback((codes: Code[]) => {
    const value = codes[0]?.value;

    if (value == null) return;
    if (isShowingAlert.current) return;
    showCodeAlert(value, () => {
      isShowingAlert.current = false;
    });
    isShowingAlert.current = true;
  }, []);

  // 5. Initialize the Code Scanner to scan QR codes and Barcodes
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'pdf-417'],
    onCodeScanned: onCodeScanned
  });

  if (!device) return null;

  return (
    <>
      <Camera
        style={ds.flex1}
        device={device}
        isActive={isActive}
        codeScanner={codeScanner}
        torch={isTorch ? 'on' : 'off'}
        enableZoomGesture={true}
      />

      <View>
        <Button onPress={() => navigation.goBack()}>Back</Button>
        <Button onPress={() => setIsTorch(!isTorch)}>{`Flash: ${isTorch ? 'ON' : 'OFF'}`}</Button>
      </View>
    </>
  );
};

export default GoogleMLKitScanner;
