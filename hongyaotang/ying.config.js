const path = require('path')

module.exports = {
  useExternals: false,
  useDll: false,
  extractEntries: {
    vue: ['vue']
    // ,vendor: ['jquery', 'axios'],
    // react: ['react', 'react-dom']
  },
  useSourceMap: false,
  analyze: false,
  useGzip: false,
  makeZip: {
    on: false,
    name: 'rectmoon',
    sourceMap: false
  },
  commonCss: ['https://cdn.bootcss.com/animate.css/3.7.0/animate.min.css'],
  outputDir: path.resolve(__dirname, 'web'),
  publicPath: '/web/',
  assetsSubDirectory: 'static'
}
