module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    ['react-native-worklets-core/plugin'],
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        alias: {
          '@': './src'
        }
      }
    ]
  ]
};
