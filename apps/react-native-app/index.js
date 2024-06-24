import { AppRegistry } from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import App from './App';

import { name as appName } from './app.json';

import '@/locales/i18n';

crashlytics().log('App begin.');

AppRegistry.registerComponent(appName, () => App);
