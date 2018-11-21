'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 引入 webpack-deep-scope-plugin 优化
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin')
  .default
/***
 *
 * 在项目中，注意要把babel设置modules: false，避免babel将模块转为CommonJS规范。引入的模块包，也必须是符合ES6规范，并且在最新的webpack中加了一条限制，即在package.json中定义sideEffect: false，这也是为了避免出现import xxx导致模块内部的一些函数执行后影响全局环境，却被去除掉的情况。
 *
 *   
  1. common：将被多个页面同时引用的依赖包打到一个 common chunk 中。网上大部分教程是被引入两次即打入 common。我建议可以根据自己页面数量来调整，在我的工程中，我设置引入次数超过页面数量的 1/3 时，才会打入 common 包。
  2. dll: 将每个页面都会引用的且基本不会改变的依赖包，如 react/react-dom 等再抽离出来，不让其他模块的变化污染 dll 库的 hash 缓存。
  3. manifest: webpack 运行时(runtime)代码。每当依赖包变化，webpack 的运行时代码也会发生变化，如若不将这部分抽离开来，增加了 common 包 hash 值变化的可能性。
  4 .页面入口文件对应的page.js
  
  可以使用 externals 配合 cdn 加速
  也可以使用 dll预先打包

 * 
 * */

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
    filename: utils.assetsPath('js/[name].[chunkhash:6].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash:6].js')
  },
  externals: config.build.externals,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[chunkhash:6].css'),
      chunkFilename: utils.assetsPath('css/[id].[chunkhash:6].css')
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? {
            safe: true,
            map: {
              inline: false
            }
          }
        : {
            safe: true
          }
    }),
    ...utils.htmlPlugins(baseWebpackConfig),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),

    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*', '*.html']
      }
    ]),
    new WebpackDeepScopeAnalysisPlugin(),
    ...utils.includeAssets([
      {
        path: 'https://cdn.bootcss.com/animate.css/3.7.0/animate.min.css',
        type: 'css'
      }
    ]),
    new VueLoaderPlugin()
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimize: true,
    noEmitOnErrors: true,
    splitChunks: {
      chunks: 'async', // 必须三选一： "initial" | "all" | "async"
      minSize: 30000, // 最小尺寸
      minChunks: 1, //must be greater than or equal 2. The minimum number of chunks which need to contain a module before it's moved into the commons chunk.
      maxAsyncRequests: 5, // 最大异步请求数
      maxInitialRequests: 3, // 最大初始化请求书
      name: true, // 名称，此选项可接收 function
      cacheGroups: {
        // 这里开始设置缓存的 chunks
        vendor: {
          // key 为entry中定义的 入口名称
          name: 'vendor', // 要缓存的 分隔出来的 chunk 名称
          chunks: 'all', //all-异步加载快，但初始下载量较大，文件共用性好； initial-初始下载量较小，但异步加载量较大，文件间有重复内容
          priority: -10,
          reuseExistingChunk: false, // 选项用于配置在模块完全匹配时重用已有的块，而不是创建新块
          // test: /node_modules\/(.*)/,
          test: /(react|react-dom)/
        },
        common: {
          name: 'common',
          priority: 11,
          test: /assets/,
          minSize: 0
        }
      }
    }
  }
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin({
      //  可以是`server`，`static`或`disabled`。
      //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
      //  在“静态”模式下，会生成带有报告的单个HTML文件。
      //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
      analyzerMode: 'server',
      //  将在“服务器”模式下使用的主机启动HTTP服务器。
      analyzerHost: '127.0.0.1',
      //  将在“服务器”模式下使用的端口启动HTTP服务器。
      analyzerPort: 8888,
      //  路径捆绑，将在`static`模式下生成的报告文件。
      //  相对于捆绑输出目录。
      reportFilename: 'report.html',
      //  模块大小默认显示在报告中。
      //  应该是`stat`，`parsed`或者`gzip`中的一个。
      //  有关更多信息，请参见“定义”一节。
      defaultSizes: 'parsed',
      //  在默认浏览器中自动打开报告
      openAnalyzer: false,
      //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
      generateStatsFile: false,
      //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
      //  相对于捆绑输出目录。
      statsFilename: 'stats.json',
      //  stats.toJson（）方法的选项。
      //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
      //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      logLevel: 'info' //日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
    })
  )
}

module.exports = webpackConfig
