const path = require('path')

module.exports = {
  build: {
    assetsVersionMode: +new Date(),
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    pageAsDir: false,
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    devtool: 'source-map'
  },
  dev: {
    assetsVersionMode: 'hash',
    env: require('./dev.env'),
    host: 'localhost',
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false,
    devtool: 'cheap-module-eval-source-map'
  }
}
