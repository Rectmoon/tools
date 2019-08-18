const { resolve } = require('./alias')
const DllPlugin = require('webpack/lib/DllPlugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    vue: ['vue', 'vue-router']
  },
  output: {
    filename: 'dll.[name]_[hash:6].js',
    path: resolve('static/js/dll'),
    library: '[name]_[hash:6]'
  },
  plugins: [
    new DllPlugin({
      name: '[name]_[hash:6]',
      path: resolve('static/js/dll/[name]-manifest.json'),
      context: __dirname
    }),
    new CleanWebpackPlugin(['static/js/dll'], {
      root: resolve(''),
      verbose: true,
      dry: false
    })
  ]
}
