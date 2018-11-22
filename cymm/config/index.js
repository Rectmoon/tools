'use strict'

const path = require('path')

module.exports = {
  dev: {
    assetsSubDirectory: '',
    assetsPublicPath: '/',
    proxyTable: {},
    host: 'localhost',
    port: 9000,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    assetsPublicPath: '',
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    externals: {
      vue: 'window.Vue',
      vuex: 'Vuex',
      'vue-router': 'window.VueRouter',
      jquery: 'jQuery',
      'babel-polyfill': 'window'
    }
  }
}
