const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { getLibEntries } = require('./utils')
const { resolve } = require('./alias')
const { useSourceMap } = require('../ying.config')

module.exports = {
  entry: getLibEntries(),
  output: {
    path: resolve('static/js/libs'),
    filename: '[name].[chunkhash:6].js',
    library: '[name]', // 暴露出的变量名 (libs中的文件名不要包括"-、."等字符， 文件名最好为驼峰格式)
    libraryTarget: 'umd', //var (默认值，发布为全局变量)、commonjs、commonjs2、amd、umd等
    globalObject: 'this',
    libraryExport: 'default',
    umdNamedDefine: true //(umd规范中输出amd的命名)
  },
  mode: 'production',
  devtool: useSourceMap ? 'source-map' : 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/transform-runtime',
                {
                  helpers: true,
                  corejs: 3
                }
              ]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true
    }),
    new webpack.ProgressPlugin()
  ]
}
