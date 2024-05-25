import crashlytics from '@react-native-firebase/crashlytics';
import {AppRegistry} from 'react-native';

import App from './App';
import {name as appName} from './app.json';

import '@/i18n/config';

crashlytics().log('App begin.');

AppRegistry.registerComponent(appName, () => App);
