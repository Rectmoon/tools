'use strict'
const fs = require('fs')
const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const packageConfig = require('../package.json')
const library = require('./library')
const ENTRIESDIR = './src/entries'
const isDev = process.env.NODE_ENV === 'development'

exports.assetsPath = function(_path) {
  const assetsSubDirectory = isDev
    ? config.dev.assetsSubDirectory
    : config.build.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
  options = options || {}
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: !isDev,
      sourceMap: options.sourceMap
    }
  }
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders(loader, loaderOptions) {
    const loaders = ['vue-style-loader', cssLoader]
    options.usePostCSS && loaders.push(postcssLoader)
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    if (options.extract) loaders.splice(1, 0, MiniCssExtractPlugin.loader)
    return loaders
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

exports.styleLoaders = function(options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')
  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

exports.getEntries = function() {
  const entrieFiles = fs.readdirSync(ENTRIESDIR).filter(f => /\.js$/.test(f))
  return entrieFiles.reduce((res, next) => {
    let name = next.slice(0, next.lastIndexOf('.'))
    res[name] = `${ENTRIESDIR}/${next}`
    return res
  }, {})
}

exports.htmlPlugins = function(webackConfig) {
  const extraChunks = isDev ? [] : ['manifest', 'vendor']
  return Object.keys(webackConfig.entry).map(name =>
    htmlPlugin({
      filename: `${name}.html`,
      chunks: [...extraChunks, name],
      title: `这是${name}页`
    })
  )
}

exports.includeAssets = function(webackConfig, extraCdn = []) {
  const cdnPaths = []
  Object.keys(webackConfig.externals).forEach(name => {
    if (library[name]) {
      cdnPaths.push(library[name])
    }
  })
  return new HtmlWebpackIncludeAssetsPlugin({
    assets: extraCdn.concat(cdnPaths),
    append: false,
    publicPath: ''
  })
}

function htmlPlugin(extraConfig) {
  return new HtmlWebpackPlugin(
    Object.assign(
      {
        template: 'tpl.html',
        inject: true,
        minify: {
          // removeComments: true,
          // collapseWhitespace: true,
          // removeAttributeQuotes: false
        },
        title: '生平未见陈近南'
      },
      {
        themeColor: '#f67a17',
        themeFile: 'css/theme-colors.css'
      },
      extraConfig
    )
  )
}
