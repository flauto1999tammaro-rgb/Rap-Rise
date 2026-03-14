const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { resolve } = require('metro-resolver');

const config = getDefaultConfig(__dirname);
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'react-native-is-edge-to-edge' && platform === 'web') {
    return {
      filePath: path.resolve(
        __dirname,
        'src/shims/react-native-is-edge-to-edge.web.js'
      ),
      type: 'sourceFile',
    };
  }

  return resolve(context, moduleName, platform);
};

module.exports = config;
