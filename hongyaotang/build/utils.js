const fs = require('fs')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const { alias, resolve } = require('./alias')
const library = require('./library')
const {
  useExternals,
  useDll,
  extractEntries,
  publicPath,
  commonCss,
  assetsSubDirectory
} = require('../ying.config')

const packageConfig = require('../package.json')

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

const entryDir = resolve('src/entries')
const libsDir = resolve('src/libs')
const outputDir = resolve('dist')
const entryFiles = getFiles(entryDir)
const libsJs = getFiles(`${libsDir}/`)
const entryJs = entryFiles.filter(f => /\.js$/.test(f))

const defaultTemplatePath = resolve('public/index.html')

function assetsPath(_path) {
  const assetsSD = process.env.NODE_ENV === 'production' ? assetsSubDirectory : 'static'
  return path.posix.join(assetsSD, _path)
}

function initEntryAndOutput(mode) {
  const result = entryJs.reduce(
    (res, next) => {
      let e = getFileName(next)
      res.entry[e] = resolve(`${entryDir}/${next}`)
      return res
    },
    { entry: {} }
  )
  if (!useExternals && !useDll && extractEntries) {
    Object.keys(extractEntries).forEach(key => {
      result.entry[key] = extractEntries[key]
    })
  }
  result.output = {
    path: outputDir,
    filename: assetsPath('js/[name].js'),
    publicPath
  }
  if (mode !== 'development') {
    result.output.filename = assetsPath('js/[name].[chunkhash:6].js')
    // result.output.chunkFilename = assetsPath('js/[id].[chunkhash:6].js')
  }
  return result
}

function initHtmlTemplate(mode) {
  let commonJs = []
  if (libsJs.length) {
    commonJs = commonJs.concat(
      libsJs.map(j => `${path.posix.join(publicPath, assetsPath('js/libs'))}/${j}`)
    )
  }
  if (useExternals) {
    const externals = require('./externals')
    Object.keys(externals).forEach(lib => {
      if (library[lib]) {
        commonJs = commonJs.concat(library[lib])
      }
    })
  } else if (useDll) {
    const dllJs = getFiles(resolve('static/js/dll')).filter(f => /\.js$/.test(f))
    commonJs = commonJs.concat(
      dllJs.map(j => `${path.posix.join(publicPath, assetsPath('js/dll'))}/${j}`)
    )
  }

  return entryJs.reduce((res, next) => {
    let tpl
    const f = getFileName(next)
    let title = mode === 'development' ? '生平未见陈近南' : `这是${f}页`,
      minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    let chunks = ['manifest', 'polyfill', 'styles', 'common', f]
    if (!useExternals && !useDll) {
      Object.keys(extractEntries).forEach(key => {
        chunks.unshift(key)
      })
    }

    const h = {
      filename: `${f}.html`,
      chunks,
      title,
      commonJs,
      commonCss,
      favicon: resolve('public/favor.png'),
      minify: false
    }

    const entryTpl = entryFiles.filter(n => /\.(pug|html)$/.test(n) && getFileName(n) == f)

    tpl = entryTpl.length
      ? { ...h, template: `${entryDir}/${entryTpl[0]}` }
      : { ...h, template: defaultTemplatePath, minify }
    res.push(new HtmlWebpackPlugin(tpl))
    return res
  }, [])
}

function initConfig(mode) {
  return {
    alias,
    ...initEntryAndOutput(mode),
    htmlPlugins: initHtmlTemplate(mode)
  }
}

function createNotifierCallback() {
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

function getLibEntries() {
  return libsJs.reduce((res, next) => {
    const n = next.substring(next.lastIndexOf('/') + 1, next.lastIndexOf('.'))
    res[n] = resolve(`${libsDir}/${next}`)
    return res
  }, {})
}

module.exports = {
  initConfig,
  assetsPath,
  createNotifierCallback,
  entryJs,
  getLibEntries
}
