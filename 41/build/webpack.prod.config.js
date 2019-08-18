const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const env = require('../config/prod.env')
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
        new CleanWebpackPlugin(['dist'], {
            verbose: true,
            dry: false
        }), ...utils.getHtmlPlugins(),
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[chunkhash:6].css', true),
            chunkFilename: utils.assetsPath('css/[id].[chunkhash:6].css', true)
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsSubDirectory,
            ignore: ['.*']
        }])
    ],
    optimization: {
        runtimeChunk: {
          name: 'manifest'
        },
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
    webpackConfig.plugins.push(new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
    }))
}
if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig