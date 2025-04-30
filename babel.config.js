module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@utils': './src/utils',
            '@constants': './src/constants',
            '@assets': './assets',
            '@hooks': './src/hooks',
            '@types': './src/types',
            '@services': './src/services',
            '@context': './src/context'
          }
        }
      ]
    ]
  };
}; 