import config from './server/local/config';

module.exports = {
  entry: 'src/index.js',
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        'transform-runtime',
        ['import', {libraryName: 'antd', style: true}]
      ]
    },
    production: {
      extraBabelPlugins: [
        'transform-runtime',
        ['import', {libraryName: 'antd', style: true}]
      ]
    }
  },
  publicPath: '/',
  proxy: {
    '/api': {
      // target: `http://192.168.0.154:8000/`,
      target: `http://ops.d.upvi.com/`,
      changeOrigin: true,
      // pathRewrite: {'^/api': ''}
    }
  },
  theme: {
    'primary-color': '#F4682A',
  }
};
