const path = require('path')
const utils = require('./utils')
const config = require('../config')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: utils.getEntries(),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: utils.getAssetsPublicPath()
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.html', '.styl'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        oneOf: [
          {
            issuer: /\.html$/,
            loader: 'url-loader',
            options: {
              limit: 1,
              name: utils.assetsPath('images/[name].[hash:6].[ext]', true)
            }
          },
          {
            issuer: /\.(css|stylus)$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('images/[name].[hash:6].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:6].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:6].[ext]')
        }
      }
    ]
  }
}
