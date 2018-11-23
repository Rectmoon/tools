const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { initConfig, resolve } = require('./utils')
const { initLoader } = require('./loaders')

const config = {
  devtool: 'cheap-module-source-map',
  // 加载器
  module: {
    rules: []
  },
  resolve: {
    mainFields: ['jsnext:main', 'browser', 'main']
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: resolve(''),
      verbose: true,
      dry: false
    }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from: resolve('public'),
        to: resolve('dist'),
        ignore: ['*.html']
      }
    ])
  ]
}

module.exports = function(env) {
  const { entry, output, alias, htmlPlugins } = initConfig(env)
  const loaders = initLoader(env)
  config.entry = entry
  config.output = output
  config.resolve.alias = alias
  config.module.rules.push(...loaders)
  config.plugins = config.plugins.concat(htmlPlugins)
  return config
}
