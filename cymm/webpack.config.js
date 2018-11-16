const path = require('path')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ClearWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 引入 DllReferencePlugin
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
// 引入 webpack-deep-scope-plugin 优化
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin')
  .default
/***
 *
 * 在项目中，注意要把babel设置module: false，避免babel将模块转为CommonJS规范。引入的模块包，也必须是符合ES6规范，并且在最新的webpack中加了一条限制，即在package.json中定义sideEffect: false，这也是为了避免出现import xxx导致模块内部的一些函数执行后影响全局环境，却被去除掉的情况。
 *
 * */

const isDev = process.env.NODE_ENV === 'development'
function resolve(dir) {
  return path.resolve(__dirname, dir)
}

const config = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'eval-source-map' : 'source-map',
  entry: {
    main: './cymm/main.js'
  },
  output: {
    filename: isDev ? 'bundle.js' : '[name].[hash:6].js',
    path: resolve('dist')
    // publicPath: '/public/'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue', '.styl']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: isDev }
          },
          { loader: 'eslint-loader' }
        ]
      },
      {
        test: /\.(sa|sc)ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: !isDev,
              sourceMap: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: !isDev,
              sourceMap: true
            }
          },
          'postcss-loader'
        ]
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
        options: {
          extractCSS: true, // 会把vue中的样式文件提取出来
          loaders: {
            css: [
              'vue-style-loader',
              MiniCssExtractPlugin.loader,
              'css-loader'
            ],
            styl: [
              'vue-style-loader',
              MiniCssExtractPlugin.loader,
              'css-loader',
              'stylus-loader'
            ]
          },
          postLoaders: {
            html: 'babel-loader'
          }
        }
      }
    ]
  },
  devServer: {
    port: 8000,
    hot: true,
    noInfo: true,
    publicPath: '/cymm',
    inline: true,
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      // 跨域代理转发
      '/comments': {
        target: 'https://m.weibo.cn',
        changeOrigin: true,
        headers: {
          Cookie: ''
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
      template: './public/index.html', // 模版文件
      filename: 'index.html',
      title: '穿越'
    }),

    new ClearWebpackPlugin(['dist/assets']),

    // 设置环境变量信息
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    // new DllReferencePlugin({
    //   manifest: require('./dist/manifest/vendors.manifest.json')
    // }),
    // new DllReferencePlugin({
    //   manifest: require('./dist/manifest/echarts.manifest.json')
    // }),
    new MiniCssExtractPlugin({
      filename: isDev ? 'css/[name].css' : '[name].[hash:6].css',
      chunkFilename: isDev ? 'css/[id].css' : '[id].[hash:6].css'
    }),
    // new WebpackDeepScopeAnalysisPlugin(),
    new VueLoaderPlugin()
  ]
}

if (isDev) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  config.plugins.push(new webpack.NoEmitOnErrorsPlugin())
}

module.exports = config
