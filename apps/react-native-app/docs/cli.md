## Thêm hash khóa phát hành và hash khóa phát triển

```
keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64

keytool -list -v -alias androiddebugkey -keystore ~/.android/debug.keystore -storepass android -keypass android
```

## Get key SHA-1 and SHA-256 (SHA certificate fingerprints)

```
cd android/app/ && keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 && cd .. && ./gradlew signingReport && cd ..
```
