const DllPlugin = require('webpack/lib/DllPlugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('./alias')

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
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    })
  ]
}
