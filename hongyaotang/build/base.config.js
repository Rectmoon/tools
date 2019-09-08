const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { resolve } = require('./alias')
const { initConfig } = require('./utils')
const initRules = require('./rules')
const { assetsSubDirectory } = require('../ying.config')

module.exports = function(mode) {
  const devtool = mode === 'development' ? 'cheap-module-eval-source-map' : 'source-map'
  const { entry, output, alias, htmlPlugins } = initConfig(mode)

  const loaders = initRules(mode)
  let plugins = [
    new webpack.DefinePlugin({
      'process.env': `${JSON.stringify(mode)}`
    }),
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from: resolve('static'),
        to: assetsSubDirectory,
        ignore: ['.*', '**/*-manifest.json']
      }
    ]),
    ...htmlPlugins
  ]

  return {
    mode,
    devtool,
    entry,
    output,
    resolve: {
      extensions: ['.js', 'jsx', '.json', '.vue', '.styl'],
      modules: [resolve('node_modules')],
      alias
    },
    module: {
      rules: [...loaders]
    },
    plugins
  }
}
