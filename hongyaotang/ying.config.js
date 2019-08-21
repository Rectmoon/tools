module.exports = {
  useExternals: true,
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
  publicPath: '/dist/',
  assetsSubDirectory: 'static'
}
