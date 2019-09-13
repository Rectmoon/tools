const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')

const { name, author, description, version } = require('../package.json')
const baseConfig = require('./webpack.conifg.base')
const config = require('./config')

const { resolve, assetsPath } = require('./utils')

const commonOptions = {
  chunks: 'all',
  reuseExistingChunk: true
}

module.exports = webpackMerge(baseConfig, {
  mode: 'production',

  devtool: 'source-map' && false,

  output: {
    filename: assetsPath('js/[name].[chunkhash:6].min.js'),
    chunkFilename: assetsPath('js/[name].[chunkhash:6].min.js'),
    publicPath: config.publicPath,
    path: resolve(config.outputDir)
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: true
    }),

    new DllReferencePlugin({
      context: __dirname,
      manifest: require('../static/dll/rc_manifest.json')
    }),

    new MiniCssExtractPlugin({
      filename: assetsPath('css/[name].[contenthash:6].css'),
      chunkFilename: assetsPath('css/[id].[contenthash:6].css')
    }),

    new webpack.BannerPlugin({
      banner: [
        `@project: ${name}`,
        `@author: ${author}`,
        `@date: ${new Date()}`,
        `@description: ${description}`,
        `@version: ${version}`
      ].join('\n'),
      entryOnly: true,
      exclude: /manifest|polyfill|styles/
    }),

    config.gzipOn &&
      new CompressionPlugin({
        compressionOptions: {
          numiterations: 20
        },
        algorithm(input, compressionOptions, callback) {
          return zopfli.gzip(input, compressionOptions, callback)
        }
      }),

    new AddAssetHtmlPlugin([
      {
        filepath: resolve('static/dll/*.dll.js'),
        outputPath: assetsPath(`js`),
        publicPath: `${config.publicPath}${assetsPath('js')}`
      }
      /**
       *  第一种方式：
       * 使用dll预打包
       * { filepath: resolve('static/dll/*_dll.js') }
       *
       *  第二种方式
       *  配置 externals, 并在html ！！直接！！ 引入 polyfill.min.js
       *  externals: {
       *    react: 'React',
       *   'react-dom': 'ReactDOM'
       *  }
       *  { filepath: require.resolve('../node_modules/@babel/polyfill/dist/polyfill.min.js') },
       *  { filepath: require.resolve('react/umd/react.production.min.js') },
       *  { filepath: require.resolve('react-dom/umd/react-dom.production.min') }
       *
       *  第三种方式
       *  直接将入口和 react、react-dom混在一起, 并在入口按需引入相关依赖
       */
    ]),
    config.report && new BundleAnalyzerPlugin()
  ].filter(Boolean),

  optimization: {
    moduleIds: 'hashed',

    runtimeChunk: {
      name: 'manifest'
    },

    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,

        polyfill: {
          test: /[\\/]node_modules[\\/](core-js|raf|@babel|babel)[\\/]/,
          name: 'polyfill',
          priority: 30,
          ...commonOptions
        },

        styles: {
          name: 'styles',
          test: /(reset|common|base|widget)\.(s?css|sass|styl|less)/,
          minSize: 1,
          ...commonOptions
        }
      }
    },

    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: {
            drop_debugger: false,
            drop_console: false
          }
        }
      })
    ]
  }
})
