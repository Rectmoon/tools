const DllPlugin = require('webpack/lib/DllPlugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { resolve } = require('./utils')

module.exports = {
  mode: 'production',
  entry: {
    rc: ['react', 'react-dom']
  },
  output: {
    filename: '[name]_[hash:6].dll.js',
    path: resolve('static/dll'),
    library: '_dll_[name]'
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true
    }),

    new DllPlugin({
      name: '_dll_[name]',
      context: __dirname,
      path: resolve('static/dll/[name]_manifest.json')
    })
  ]
}
