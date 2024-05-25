// jest.mock('react-native-sound', () => {
//   class Sound {
//     constructor() {}
//   }
//   (Sound as any).setCategory = () => {};

//   return Sound;
// });
// jest.mock('./navigation/nav-container', () => () => null);
// jest.mock('react-native-code-push', () => {
//   const CodePush: any = () => jest.fn(a => a);

//   CodePush.CheckFrequency = {ON_APP_RESUME: ''};
//   CodePush.InstallMode = {IMMEDIATE: '', ON_NEXT_RESUME: ''};

//   return CodePush;
// });
// jest.mock('react-native-onesignal', () => ({
//   setAppId: jest.fn(),
//   clearHandlers: jest.fn()
// }));

export const a = 1;

jest.mock('react-native-bootsplash', () => jest.fn());
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
