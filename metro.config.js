const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Forzar que use App.tsx como punto de entrada
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;