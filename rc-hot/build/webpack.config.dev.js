const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const { publicPath } = require('./config')

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
        include: /node_modules\/react-dom/,
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
    overlay: {
      errors: true
    },
    publicPath,
    // quiet: true,  // 终端是否关闭打包日志
    // clientLogLevel: 'none', // 浏览器控制台是否输出编译相关日志
    before(app) {
      app.get('/api/profile', (req, res) => {
        res.json({
          name: 'zhangsan',
          age: 20
        })
      })

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
      '/test/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/test': '' },
        bypass(req) {
          req.headers.Cookies = 'x=1'
          req.headers.aaa = '666'
        }
      }
    },

    historyApiFallback: {
      /**
       * @example
       * /rainbow/web => /rainbow/web.html
       * /rainbow/admin => /rainbow/admin.html
       */
      rewrites: Object.keys(baseConfig.entry)
        .map(entry => {
          const route = `${publicPath}${entry}`
          return {
            from: new RegExp(`^${route}$`),
            to: `${route}.html`
          }
        })
        .concat([
          {
            from: /.*/,
            to: path.posix.join(publicPath, 'index.html')
          }
        ])
    }
  },

  devtool: 'inline-source-map',

  plugins: [new webpack.NamedModulesPlugin()]
})
