const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: 'production',
  entry: {
    rc: ['react', 'react-dom'],
    polyfill: ['es5-shim', 'es6-promise', 'fetch-ie8']
  },
  output: {
    filename: '[name]-[hash:6].dll.js',
    path: resolve('dll'),
    library: '[name]_[hash:6]'
  },
  plugins: [
    new DllPlugin({
      name: '[name]_[hash:6]',
      path: resolve('dll/[name]-manifest.json')
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*'],
      verbose: true,
      dry: false
    })
  ]
}
