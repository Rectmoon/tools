const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const env = require('../config/prod.env')

const commonOptions = {
  chunks: 'all',
  reuseExistingChunk: true
}

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:6].js', true),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash:6].js', true)
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    ...utils.getHtmlPlugins(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[chunkhash:6].css', true),
      chunkFilename: utils.assetsPath('css/[id].[chunkhash:6].css', true)
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ],
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
        common: {
          test: /[\\/]src[\\/](common|components)[\\/]/,
          minChunks: 2,
          minSize: 2,
          name: 'common',
          priority: 10,
          enforce: true,
          ...commonOptions
        },
        styles: {
          name: 'styles',
          test: /(reset|common|base)\.(s?css|sass|styl|less)/,
          enforce: true,
          ...commonOptions
        }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ]
  },

  stats: {
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
    moduleTrace: false,
    source: false,
    children: false
  }
})
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
