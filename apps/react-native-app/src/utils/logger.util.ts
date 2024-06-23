import { InteractionManager } from 'react-native';
import RNFS from 'react-native-fs';
import { configLoggerType, consoleTransport, fileAsyncTransport, logger } from 'react-native-logs';

const config: configLoggerType = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  },
  async: true,
  asyncFunc: InteractionManager.runAfterInteractions,
  transport: __DEV__ ? consoleTransport : fileAsyncTransport,
  severity: __DEV__ ? 'debug' : 'error',
  enabledExtensions: ['ROOT', 'HOME', 'PROFILE', 'AUTH'],
  transportOptions: {
    colors: {
      info: 'cyan',
      warn: 'orange',
      error: 'red',
      debug: 'yellow'
    },
    extensionColors: {
      ROOT: 'magenta',
      HOME: 'gray',
      PROFILE: 'slate',
      AUTH: 'green',
      MESSAGE: 'amber'
    },
    FS: RNFS,
    fileName: 'bully-log.txt'
  }
};

const log = logger.createLogger<'info' | 'warn' | 'error' | 'debug'>(config);

export default log;
