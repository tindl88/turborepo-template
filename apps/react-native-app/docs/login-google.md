# Login Google

## Setting

URL: https://console.firebase.google.com/u/0/project/react-native-template-dev/authentication/providers

1. Select Google Provider
2. Select Web SDK configuration
3. Copy Web client ID
4. Open file: src/modules/auth/components/google-sign-in.tsx change the value of webClientId.

```
GoogleSignin.configure({
  webClientId: <WEB CLIENT ID>
});

```
