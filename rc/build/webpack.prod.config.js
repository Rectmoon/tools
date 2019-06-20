const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")

const utils = require("./utils")
const config = require("../config")
const baseWebpackConfig = require("./webpack.base.config")
const env = require("../config/prod.env")

const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",

  watch: config.build.watch,

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
    filename: utils.assetsPath(
      config.build.watch ? "js/[name].js" : "js/[name].[chunkhash:6].js",
      true
    ),
    chunkFilename: utils.assetsPath(
      config.build.watch ? "js/[id].js" : "js/[id].[chunkhash:6].js",
      true
    )
  },

  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        default: false,
        common: {
          test: /[\\/]src[\\/](common|components)[\\/]/,
          minChunks: 2,
          minSize: 2,
          chunks: "initial",
          name: "common",
          priority: 10,
          enforce: true,
          reuseExistingChunk: true
        },
        styles: {
          name: "styles",
          test: /(reset|common|base)\.(s?css|sass|styl|less)/,
          chunks: "initial",
          enforce: true
        }
      }
    }
  },
  stats: {
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
    moduleTrace: false,
    source: false,
    children: false
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": env
    }),

    new webpack.HashedModuleIdsPlugin(),

    new webpack.optimize.ModuleConcatenationPlugin(),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"],
      verbose: true,
      dry: false
    }),

    ...utils.getHtmlPlugins(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath(
        config.build.watch ? "css/[name].css" : "css/[name].[chunkhash:6].css",
        true
      ),
      chunkFilename: utils.assetsPath(
        config.build.watch ? "css/[id].css" : "css/[id].[chunkhash:6].css",
        true
      )
    }),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.build.assetsSubDirectory,
        ignore: [".*"]
      }
    ]),

    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, "../dll/*.dll.js")
    }),

    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "..", "dll/rc-manifest.json")
    }),

    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "..", "dll/polyfill-manifest.json")
    })
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require("compression-webpack-plugin")

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp("\\.(" + config.build.productionGzipExtensions.join("|") + ")$"),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
