const fs = require('fs')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

const { alias, resolve } = require('./alias')
const externals = require('./externals')
const library = require('./library')

const packageConfig = require('../package.json')

const isDev = process.env.NODE_ENV === 'development'

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
const outputDir = resolve('dist')
const entryFiles = getFiles(entryDir)
const entryJs = entryFiles.filter(f => /\.js$/.test(f))

const defaultTemplatePath = resolve('public/index.html')

function initEntryAndOutput(env) {
  return entryJs.reduce(
    (res, next) => {
      let e = getFileName(next)
      res.entry[e] = resolve(`${entryDir}/${next}`)
      res.output.path = outputDir
      res.output.filename =
        env === 'development' ? 'js/[name].js' : 'js/[name].[chunkhash:6].js'
      return res
    },
    { entry: {}, output: {} }
  )
}

function initHtmlTemplate(env) {
  return entryJs.reduce((res, next) => {
    let tpl
    const f = getFileName(next)
    let title = env === 'development' ? '生平未见陈近南' : `这是${f}页`,
      minify =
        env === 'development'
          ? {}
          : {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true
            }
    const h = {
      filename: `${f}.html`,
      chunks: [f, 'vendor', 'manifest'],
      title,
      minify
    }
    const entryTpl = entryFiles.filter(
      n => /\.(pug|html)$/.test(n) && getFileName(n) == f
    )
    tpl = entryTpl.length
      ? { ...h, template: `${entryDir}/${entryTpl[0]}` }
      : { ...h, template: defaultTemplatePath }
    res.push(new HtmlWebpackPlugin(tpl))
    return res
  }, [])
}

function includeAssets(extraCdn = []) {
  return entryJs.map(n => {
    let cdnPaths = []
    const str = fs.readFileSync(`${entryDir}/${n}`, 'utf-8')
    Object.keys(externals).forEach(lib => {
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

function initConfig(env) {
  return {
    alias,
    ...initEntryAndOutput(env),
    htmlPlugins: initHtmlTemplate(env)
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

module.exports = {
  initConfig,
  resolve,
  includeAssets,
  createNotifierCallback
}
