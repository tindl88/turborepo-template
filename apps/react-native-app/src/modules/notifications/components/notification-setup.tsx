import { FC, useEffect } from 'react';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import UserApi from '@/modules/users/api/users.api';

import log from '@/utils/logger.util';
import { MMKVStorage } from '@/utils/mmkv-storage.util';
import { requestNotificationPermission } from '../utils/notifications.util';

async function createNotificationChannel() {
  return await notifee.createChannel({
    id: 'default',
    name: 'Default Channel'
  });
}

async function displayNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
  const channelId = await createNotificationChannel();

  await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    android: {
      channelId,
      importance: AndroidImportance.HIGH
    }
  });
}

async function onMessageReceived(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
  try {
    await displayNotification(remoteMessage);
  } catch (error) {
    log.extend('MESSAGE').error('Display Notification Failed', error);
  }
}

function handleNotificationOpenedApp(remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) {
  if (remoteMessage) {
    // Handle the notification causing the app to open from quit state
  }
}

async function handleTokenUpdate(deviceToken: string) {
  try {
    const currentDeviceToken = MMKVStorage.getItem('@fcmToken');

    if (deviceToken !== currentDeviceToken) {
      await UserApi.updateDeviceToken(deviceToken);
      MMKVStorage.setItem('@fcmToken', deviceToken);
    }
  } catch (error) {
    log.extend('MESSAGE').error('Update Device Token Failed', error);
  }
}

const NotificationSetup: FC = () => {
  useEffect(() => {
    requestNotificationPermission().then(permissionResp => {
      if (!permissionResp) return;
      messaging().getToken().then(handleTokenUpdate);
    });

    return messaging().onTokenRefresh(handleTokenUpdate);
  }, []);

  useEffect(() => {
    messaging().onNotificationOpenedApp(handleNotificationOpenedApp);
    messaging().getInitialNotification().then(handleNotificationOpenedApp);
    messaging().setBackgroundMessageHandler(onMessageReceived);
  }, []);

  useEffect(() => {
    return messaging().onMessage(onMessageReceived);
  }, []);

  useEffect(() => {
    return notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;

      if (type === EventType.ACTION_PRESS && pressAction?.id === 'mark-as-read') {
        try {
          if (notification?.id) {
            await notifee.cancelNotification(notification.id);
          }
        } catch (error) {
          log.extend('MESSAGE').error('Cancel Notification Failed', error);
        }
      }
    });
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type }) => {
      switch (type) {
        case EventType.DISMISSED:
          // Handle notification dismissed event
          break;
        case EventType.PRESS:
          // Handle notification pressed event
          break;
      }
    });
  }, []);

  return null;
};

export default NotificationSetup;
