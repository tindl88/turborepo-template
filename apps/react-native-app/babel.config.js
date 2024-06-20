module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    ['react-native-worklets-core/plugin'],
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          '~shared-validators': '../../packages/shared-validators/src',
          '~react-native-design-system': '../../packages/react-native-design-system/src'
        }
      }
    ]
  ]
};
