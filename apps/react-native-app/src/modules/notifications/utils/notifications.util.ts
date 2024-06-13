import notifee, { AuthorizationStatus } from '@notifee/react-native';

export const requestNotificationPermission = async () => {
  try {
    const settings = await notifee.requestPermission();

    if (
      settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
      settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
    ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
