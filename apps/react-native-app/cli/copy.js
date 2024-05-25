var fs = require('fs');
var path = require('path');

var ENV = process.env.NODE_ENV || 'development';
var TARGET_ENV = ENV === 'development' ? 'dev' : 'prod';

// ANDROID
// google-services.json
var androidSrcPath = path.join(__dirname, '../keystores/android/' + TARGET_ENV + '/google-services.json');
var androidDesPath = path.join(__dirname, '../android/app/google-services.json');
// string.xml
var androidStringSrcPath = path.join(__dirname, '../keystores/android/' + TARGET_ENV + '/strings.xml');
var androidStringDesPath = path.join(__dirname, '../android/app/src/main/res/values/strings.xml');
// debug.keystore
var androidDebugKeystoreSrcPath = path.join(__dirname, '../keystores/android/' + TARGET_ENV + '/debug.keystore');
var androidDebugKeystoreDesPath = path.join(__dirname, '../android/app/debug.keystore');
// IOS
// GoogleService-Info.plist
var iosSrcPath = path.join(__dirname, '../keystores/ios/' + TARGET_ENV + '/GoogleService-Info.plist');
var iosDesPath = path.join(__dirname, '../ios/GoogleService-Info.plist');
// Info.plist
var iosInfoSrcPath = path.join(__dirname, '../keystores/ios/' + TARGET_ENV + '/Info.plist');
var iosInfoDesPath = path.join(__dirname, '../ios/Bully/Info.plist');

copyFile(androidSrcPath, androidDesPath);
copyFile(androidStringSrcPath, androidStringDesPath);
copyFile(androidDebugKeystoreSrcPath, androidDebugKeystoreDesPath);
copyFile(iosSrcPath, iosDesPath);
copyFile(iosInfoSrcPath, iosInfoDesPath);

function copyFile(sourceFilePath, destinationFilePath) {
  try {
    // Read the contents of the source file
    var data = fs.readFileSync(sourceFilePath);

    // Write the contents to the destination file
    fs.writeFileSync(destinationFilePath, data);

    console.log(ENV.toUpperCase() + '::' + path.basename(sourceFilePath) + ' copied successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}
