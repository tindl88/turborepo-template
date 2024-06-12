import { FC, useEffect } from 'react';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { requestUserPermission } from '../utils/notifications.util';

async function onMessageReceived(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel'
  });

  await notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    android: {
      channelId,
      importance: AndroidImportance.HIGH
    }
  });
}

messaging().onNotificationOpenedApp((_remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
  // console.log('Notification caused app to open from background state:', remoteMessage.notification);
});
messaging()
  .getInitialNotification()
  .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
    if (remoteMessage) {
      // console.log('Notification caused app to open from quit state:', remoteMessage.notification);
    }
  });
messaging().setBackgroundMessageHandler(onMessageReceived);

type NotificationSetupProps = {};

const NotificationSetup: FC<NotificationSetupProps> = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    return messaging().onMessage(onMessageReceived);
  }, []);

  useEffect(() => {
    return notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;

      if (type === EventType.ACTION_PRESS && pressAction?.id === 'mark-as-read') {
        // Update external API
        // Remove the notification
        if (notification?.id) {
          await notifee.cancelNotification(notification.id);
        }
      }
    });
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type }) => {
      switch (type) {
        case EventType.DISMISSED:
          // console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          // console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  return null;
};

export default NotificationSetup;
