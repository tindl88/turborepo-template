# Errors

## **Case 1:**

```
Fatal Exception: java.lang.RuntimeException: Unable to load script. Make sure you're either running Metro (run 'npx react-native start') or that your bundle 'index.android.bundle' is packaged correctly for release.
       at com.facebook.react.bridge.CatalystInstanceImpl.jniLoadScriptFromAssets(CatalystInstanceImpl.java)
       at com.facebook.react.bridge.CatalystInstanceImpl.loadScriptFromAssets(CatalystInstanceImpl.java:248)
       at com.facebook.react.bridge.JSBundleLoader$1.loadScript(JSBundleLoader.java:29)
       at com.facebook.react.bridge.CatalystInstanceImpl.runJSBundle(CatalystInstanceImpl.java:277)
       at com.facebook.react.ReactInstanceManager.createReactContext(ReactInstanceManager.java:1402)
       at com.facebook.react.ReactInstanceManager.access$1200(ReactInstanceManager.java:136)
       at com.facebook.react.ReactInstanceManager$5.run(ReactInstanceManager.java:1108)
       at java.lang.Thread.run(Thread.java:1012)
```

**Fix:**

```bash
mkdir android/app/src/main/assets
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle
react-native run-android
```

---

## **Case 2:**

Command PhaseScriptExecution failed with nonzero exit code

**Fix:**

```bash
delete all lines containing EXCLUDED_ARCHS = arm64;
```

---

## **Case 3:**

```
java.util.concurrent.ExecutionException: com.android.builder.testing.api.DeviceException: com.android.ddmlib.InstallException: INSTALL_FAILED_VERSION_DOWNGRADE: Package Verification Result
```

**Fix:**

```
Remove old app on your device.
```

---

## **Case 4:**

Environment key "jest/globals" is unknown

**Fix:**

```
yarn add -D eslint-plugin-jest
```

---

## **Case 5: Google Sign In**

Crash in React Native app when authorizing via @react-native-google-signin/google-signin

**Fix:**

```
Go to my GoogleService-Info.plist file
Copy the value of the REVERSED_CLIENT_ID
Navigate to the project's TARGETS and select my app
Select the Info tab and navigate to the URL Types section
Add a new item to the URL Types section by tapping on the plus (+) icon
Paste the value of the REVERSED_CLIENT_ID in the URL Schemes field.
```

---

## **Case 6: Google Sign In**

A non-recoverable sign in failure occurred

**Fix:**

```
provide the SHA hash of your signing certificate
```

---

## **Case 7: React Native Vision Camera**

java.util.concurrent.ExecutionException: com.android.builder.testing.api.DeviceException:
com.android.ddmlib.InstallException: INSTALL_FAILED_USER_RESTRICTED: Install canceled by user

**Fix:**

```
Settings -> Additional Settings -> Developer options ->

Turn off “MIUI optimization” and Restart.
Turn On “USB Debugging“.
Turn On “Install via USB“.
Set USB Configuration to Charging.
Turn On “install via USB“.
```
