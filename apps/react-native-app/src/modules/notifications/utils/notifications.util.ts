import { PermissionsAndroid, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  let isEnabled: boolean;

  if (Platform.OS === 'ios') {
    const iosPermissionStatus = await messaging().requestPermission();

    // await notifee.requestPermission();
    isEnabled =
      iosPermissionStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      iosPermissionStatus === messaging.AuthorizationStatus.PROVISIONAL;
  } else {
    const androidPermissionStatus = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

    isEnabled = androidPermissionStatus === 'granted';
  }

  if (isEnabled) getFcmToken();
}

const getFcmToken = async () => {
  //   const fcmToken = await MMKVStorage.getItem('fcmToken');

  //   console.log('Old token', fcmToken);
  //   if (!fcmToken) {
  try {
    // const fcmToken = await messaging().getToken();
    // console.log(fcmToken);
    //   if (fcmToken) {
    //     console.log(fcmToken, 'The new generated token');
    //     MMKVStorage.setItem('fcmToken', fcmToken);
    //   }
  } catch (error) {
    // console.log(error, 'Error raised in fcm token');
  }
  //   }
};
