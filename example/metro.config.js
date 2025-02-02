const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  getLinkedPackagesConfig,
} = require('@mgcrea/metro-plugin-linked-packages');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(
  getDefaultConfig(__dirname),
  getLinkedPackagesConfig(__dirname),
  config,
);
