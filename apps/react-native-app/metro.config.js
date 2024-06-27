const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */

const workspaceRoot = path.resolve(__dirname, '../..');
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot, { requireConfigFile: false });

config.watchFolders = [workspaceRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(workspaceRoot, 'node_modules'),
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(projectRoot, 'node_modules/@repo/shared-validators'),
  path.resolve(projectRoot, 'node_modules/@repo/shared-universal'),
  path.resolve(projectRoot, 'node_modules/@repo/react-native-design-system')
];

// config.resolver.disableHierarchicalLookup = true;

const customConfig = mergeConfig(getDefaultConfig(projectRoot), config);

module.exports = withNativeWind(customConfig, { input: './src/global.css' });
