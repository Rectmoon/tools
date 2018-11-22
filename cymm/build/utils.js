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
const entryJs = getFiles(ENTRIESDIR).filter(f => /\.js$/.test(f))

function getFiles(dir) {
  try {
    return fs.readdirSync(dir)
  } catch (e) {
    return []
  }
}

function getFileName(s) {
  return s.slice(0, s.lastIndexOf('.'))
}

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
    if (options.usePostCSS) loaders.push(postcssLoader)
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    if (options.extract) {
      // loaders.splice(0, 1, MiniCssExtractPlugin.loader)
      loaders.splice(1, 0, MiniCssExtractPlugin.loader)
    }
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
      icon: path.join(__dirname, '')
    })
  }
}

exports.getEntries = function() {
  const entry = {}
  entryJs.forEach(js => {
    entry[getFileName(js)] = `${ENTRIESDIR}/${js}`
  })
  return entry
}

exports.htmlPlugins = function(webackConfig) {
  const extraChunks = isDev
    ? []
    : ['manifest'].concat(
        Object.keys(webackConfig.entry).filter(
          k => !entryJs.includes(`${k}.js`)
        )
      )
  return entryJs.map(name => {
    let n = getFileName(name)
    let entryTpl = getFiles(ENTRIESDIR).filter(f => {
      return /\.(pug|html)$/.test(f) && getFileName(f) == n
    })
    if (entryTpl.length)
      return htmlPlugin({
        filename: `${n}.html`,
        template: `${ENTRIESDIR}/${entryTpl[0]}`,
        chunks: [...extraChunks, n],
        title: `这是${n}页`
      })
    return htmlPlugin({
      filename: `${n}.html`,
      chunks: [...extraChunks, n],
      title: `这是${n}页`
    })
  })
}

function htmlPlugin(extraConfig) {
  return new HtmlWebpackPlugin(
    Object.assign(
      {
        template: './static/tpl.html',
        inject: true,
        minify: isDev
          ? {}
          : {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
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

exports.includeAssets = function(extraCdn = []) {
  return entryJs.map(n => {
    let cdnPaths = []
    const str = fs.readFileSync(`${ENTRIESDIR}/${n}`, 'utf-8')
    Object.keys(config.build.externals).forEach(lib => {
      if (library[lib] && str.indexOf(lib) > -1) {
        cdnPaths.push(library[lib])
      }
    })
    return new HtmlWebpackIncludeAssetsPlugin({
      files: `${getFileName(n)}.html`,
      assets: extraCdn.concat(cdnPaths),
      append: false,
      publicPath: ''
    })
  })
}
