const fs = require('fs')
const path = require('path')
const glob = require('glob')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const ENV = process.env.NODE_ENV
const isProd = ENV === 'production'

const config = require('./config')

exports.resolve = function(dir) {
  return path.resolve(__dirname, '..', dir)
}

const defaultTemplatePath = exports.resolve('index.html')

exports.assetsPath = function(_path) {
  return path.posix.join(config.assetsSubDirectory, _path)
}

exports.getPages = function() {
  const pagesDir = path.resolve(__dirname, '../src/entries')
  const pages = glob.sync(`${pagesDir}/**/index.js`)
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
  return exports.getPages().reduce((entries, next) => {
    entries[next[0]] = next[1]
    return entries
  }, {})
}

exports.getHtmlPlugins = function() {
  return exports.getPages().map(p => {
    const chunks = isProd ? ['manifest', 'polyfill', 'styles', p[0]] : [p[0]]
    const tpName = p[1].replace('.js', '.html')
    const template = fs.existsSync(tpName) ? tpName : defaultTemplatePath

    return new HtmlWebpackPlugin({
      template: template,
      filename: `${p[0]}.html`,
      chunks,
      inject: true,
      chunksSortMode: 'manual'
    })
  })
}
