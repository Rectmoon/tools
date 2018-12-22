const path = require('path')
const fs = require('fs')
const glob = require('glob')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageConfig = require('../package.json')

const isProd = process.env.NODE_ENV === 'production'

exports.getAssetsPublicPath = function() {
  return isProd ? config.build.assetsPublicPath : config.dev.assetsPublicPath
}

exports.assetsPath = function(_path, innerHtml) {
  const envConfig = isProd ? config.build : config.dev
  const assetsSubDirectory = envConfig.assetsSubDirectory
  if (innerHtml && envConfig.assetsVersionMode !== 'hash') {
    _path = _path
      .split('.')
      .filter(p => p.indexOf('[hash') === -1 && p.indexOf('hash]') === -1)
      .join('.')
    _path += `?v=${envConfig.assetsVersionMode}`
  }
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders(loader, loaderOptions) {
    const loaders = ['style-loader', cssLoader]
    if (loader) {
      if (loader !== 'postcss') {
        loaders.push({
          loader: 'postcss-loader',
          options: Object.assign({}, loaderOptions, {
            sourceMap: options.sourceMap
          })
        })
      }
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    if (options.extract) {
      loaders.splice(0, 1, {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      })
    }
    return loaders
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders('postcss'),
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

exports.getPages = function() {
  const pagesDir = path.resolve(__dirname, '../src/entries')
  const pages = glob.sync(`${pagesDir}/**/index.html`)
  return pages.map(p => [
    path
      .relative(pagesDir, p)
      .split(path.sep)
      .slice(0, -1)
      .join('/'),
    p
  ])
}

exports.getEntries = function() {
  const entries = {}
  exports.getPages().forEach(p => {
    entries[p[0]] = p[1].replace('.html', '.js')
  })
  return entries
}

exports.getHtmlPlugins = function() {
  return exports.getPages().map(p => {
    const chunks = isProd ? ['manifest', 'vendor', p[0]] : [p[0]]
    return new HtmlWebpackPlugin({
      template: p[1],
      filename: isProd
        ? path.resolve(__dirname, `../dist/${p[0]}.html`)
        : `${p[0]}.html`,
      chunks,
      inject: true,
      chunksSortMode: 'manual'
    })
  })
}

exports.createNotifierCallback = function() {
  const notifier = require('node-notifier')
  return (severity, errors) => {
    if (severity !== 'error') return
    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()
    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, '')
    })
  }
}
