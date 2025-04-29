module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@shared': '../shared',
            '@components': './src/components',
            '@screens': './src/screens',
            '@navigation': './src/navigation',
            '@constants': './src/constants',
            '@utils': './src/utils',
            '@types': './src/types',
            '@assets': './assets'
          }
        }
      ]
    ]
  };
}; 