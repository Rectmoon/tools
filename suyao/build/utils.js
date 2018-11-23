const fs = require('fs')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const alias = require('./alias')
const resolve = dir => path.resolve(__dirname, '..', dir)

const entryDir = resolve('src/entries')
const outputDir = resolve('dist')
const templatePath = resolve('public/index.html')
const entryFiles = getFiles(entryDir)
const entryJs = entryFiles.filter(f => /\.js$/.test(f))

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

function initAilas() {
  Object.keys(alias).forEach(attr => {
    const val = alias[attr]
    alias[attr] = resolve(val)
  })
}

function initEntryAndOutput(env) {
  return entryJs.reduce(
    (res, next) => {
      let e = getFileName(next)
      res.entry[e] = resolve(`${entryDir}/${next}`)
      if (env === 'dev') res.output.filename = 'js/[name].js'
      else res.output.filename = 'js/[name].[chunkhash:6].js'
      res.output.path = outputDir
      return res
    },
    { entry: {}, output: {} }
  )
}

function initHtmlTemplate() {
  return entryJs.reduce((res, next) => {
    let tpl
    const f = getFileName(next)
    const h = new HTMLWebpackPlugin({
      filename: `${f}.html`,
      chunks: [f, 'vendor']
    })
    const entryTpl = entryFiles.filter(
      n => /\.(pug|html)$/.test(n) && getFileName(n) == f
    )
    if (entryTpl.length) tpl = { ...h, template: `${entryDir}/${entryTpl[0]}` }
    else tpl = { ...h, template: templatePath }
    res.push(new HTMLWebpackPlugin(tpl))
    return res
  }, [])
}

function initConfig(env) {
  return {
    alias,
    ...initEntryAndOutput(),
    htmlPlugins: initHtmlTemplate()
  }
}

module.exports = {
  initConfig,
  resolve
}
