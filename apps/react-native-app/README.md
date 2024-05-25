# 🚀 Getting started with React Native Typescript

## Requisite

```
NodeJs: 16 or higher (Should install `nvm` to install multiple node versions)
Ruby: 2.7.5 (Should install `rvm` to install multiple ruby versions)
Cocoapods: 1.11.3 or newer
Java SE Development Kit (JDK): 17 or higher: brew install --cask zulu@17
```

### CLIs

Must run before coding

```
  yarn install
  bundle install
  cd ios/ && pod install
```

### Notes

The debug signing certificate is optional to use Firebase with your app, but is required for Dynamic Links, Invites and
Phone Authentication. To generate a certificate `run cd android && ./gradlew signingReport`. This generates two variant
keys. You have to copy both `SHA1` and `SHA-256` keys that belong to the `debugAndroidTest` variant key option. Then,
you can add those keys to the `SHA certificate fingerprints` on your app in Firebase console.

```
> Task :app:signingReport
Variant: debug
Config: debug
Store: /Users/tintran/Documents/Dev/TIN/react-native-typescript/android/app/debug.keystore
Alias: androiddebugkey
MD5: 20:F4:61:48:B7:2D:8E:5E:5C:A2:3D:37:A4:F4:14:90
SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
SHA-256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C
Valid until: Wednesday, May 1, 2052
----------
Variant: release
Config: debug
Store: /Users/tintran/Documents/Dev/TIN/react-native-typescript/android/app/debug.keystore
Alias: androiddebugkey
MD5: 20:F4:61:48:B7:2D:8E:5E:5C:A2:3D:37:A4:F4:14:90
SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
SHA-256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C
Valid until: Wednesday, May 1, 2052
----------
Variant: debugAndroidTest
Config: debug
Store: /Users/tintran/Documents/Dev/TIN/react-native-typescript/android/app/debug.keystore
Alias: androiddebugkey
MD5: 20:F4:61:48:B7:2D:8E:5E:5C:A2:3D:37:A4:F4:14:90
SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
SHA-256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C
Valid until: Wednesday, May 1, 2052
----------
```

## Environments

### MacOs

`.zshrc`

```
export JAVA_HOME=$(/usr/libexec/java_home)
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

### Windows

```
...
```

## Folder structure

```shell
├── src
│   ├── api                 # RestAPI
│   ├── assets              # Images, Fonts, Json...
│   ├── components          # All common components such as
│   ├── core-ui             # UI components such as Button, TextBox, CheckBox...
│   ├── i18n                # Multi-languages
│   ├── navigation          # Manage screen and navigation
│   ├── screens             # All screens/pages...
│   ├── states              # State Management (Redux, Context)
│   ├── types               # Typescript types/interfaces...
│   └── utils               # Helper function
├── README.md               # Note and instruction file
├── tsconfig.json           # TypeScript configuration
└── types.d.ts              # TypeScript - Types
```

## Development

Start Android application

```
npm run android
# or
yarn android
```

Start IOs application

```
npm run ios
# or
yarn ios
```

## Testing

Test application

```
npm run test
# or
yarn test
```

## Linting

Check code for errors and warnings

```
npm run lint
# or
yarn lint
```

## References

https://rnfirebase.io/

https://invertase.io/blog/react-native-firebase-crashlytics-configuration

https://redux-toolkit.js.org/

https://redux-saga.js.org/docs/introduction/BeginnerTutorial

https://reactnative.dev/blog/2023/12/06/0.73-debugging-improvements-stable-symlinks#java-17-and-android-gradle-plugin-upgrade

# Miscs

## Old version

react-native-pager-view@6.2.3 react-native-safe-area-context@4.8.2 @shopify/flash-list@1.6.3 react-native-webview@13.6.3
react-native-gesture-handler@2.14.0 react-native-screens@3.29.0 react-native-vision-camera@3.8 react-native-mmkv@2.11.0
