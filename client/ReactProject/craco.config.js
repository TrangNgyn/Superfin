const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#EB6E00', '@font-family': 'Helvetica Neue' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};