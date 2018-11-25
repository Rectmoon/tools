const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { resolve } = require('./alias')
const { initConfig } = require('./utils')
const initRules = require('./rules')

module.exports = function(mode) {
  const devtool =
    mode === 'development' ? 'cheap-module-eval-source-map' : '#source-map'
  const { entry, output, alias, htmlPlugins } = initConfig(mode)
  const loaders = initRules(mode)

  return {
    mode,
    devtool,
    entry,
    output,
    resolve: {
      extensions: ['*', '.js', 'jsx', '.json', '.vue', '.styl'],
      modules: [resolve('node_modules')],
      alias
    },
    module: {
      rules: [...loaders]
    },
    plugins: [
      // new DllReferencePlugin({
      //   manifest: require('./dist/manifest/vendors.manifest.json')
      // }),
      // new DllReferencePlugin({
      //   manifest: require('./dist/manifest/echarts.manifest.json')
      // }),
      new webpack.DefinePlugin({
        'process.env': `${mode}`
      }),
      new VueLoaderPlugin(),
      new CopyWebpackPlugin([
        {
          from: resolve('public'),
          to: resolve('dist'),
          ignore: ['.*']
        }
      ]),
      ...htmlPlugins
    ]
  }
}
