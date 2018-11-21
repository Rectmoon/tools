const path = require('path')
const config = require('../config')
const utils = require('../build/utils')
const vueLoaderConfig = require('./vue-loader.config')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 引入 DllReferencePlugin
// const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const isDev = process.env.NODE_ENV === 'development'

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: utils.getEntries(),
  // {
  //   // vendor: [''],
  //   ...utils.getEntries()
  // },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
    publicPath: isDev
      ? config.dev.assetsPublicPath
      : config.build.assetsPublicPath
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue', '.styl'],
    modules: [path.join(__dirname, '..', 'node_modules')],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: isDev
            }
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.pug$/,
        use: ['raw-loader', 'pug-html-loader']
      },
      {
        test: /.html$/,
        loader: 'raw-loader',
        exclude: /static/
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 40000,
          name: 'media/[name].[hash:6].[ext]'
        }
      },
      {
        test: /\.(gif|jpe?g|png|woff|svg|eot|ttf)\??.*$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[hash:6].[ext]',
            limit: 4096
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|htc)$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 4096,
            name: 'fonts/[name].[hash:6].[ext]'
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      }
    ]
  },
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    // new DllReferencePlugin({
    //   manifest: require('./dist/manifest/vendors.manifest.json')
    // }),
    // new DllReferencePlugin({
    //   manifest: require('./dist/manifest/echarts.manifest.json')
    // }),
    new VueLoaderPlugin()
  ]
}
