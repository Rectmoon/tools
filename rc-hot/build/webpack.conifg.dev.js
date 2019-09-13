const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.conifg.base')

module.exports = webpackMerge(baseConfig, {
  mode: 'development',

  module: {
    rules: [
      {
        exclude: /node_modules|packages/,
        test: /\.jsx?$/,
        use: ['react-hot-loader/webpack', 'babel-loader']
      },
      {
        include: /node_modules/,
        test: /\.jsx?$/,
        use: {
          loader: 'react-hot-loader/webpack'
        }
      }
    ]
  },

  devServer: {
    hot: true,
    open: false,
    port: 9000,
    contentBase: false,
    overlay: true,
    // quiet: true,  // 终端是否关闭打包日志
    // clientLogLevel: 'none', // 浏览器控制台是否输出编译相关日志
    before(app) {
      app.use('*', (req, res, next) => {
        /**
         * do Somthing
         */
        next()
      })
    },
    proxy: {
      /**
       * proxy setting
       * 详细配置：https://github.com/chimurai/http-proxy-middleware
       */
    }
  },

  devtool: 'inline-source-map',

  plugins: [new webpack.NamedModulesPlugin()]
})
