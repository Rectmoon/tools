module.exports = {
  useExternals: true, // 如果多页面所用技术栈不一致, 个人觉得使用externals比较合适, 否则多页面都需要引入dll.js会比较麻烦
  useDll: false,
  extractEntries: {
    vendor: ['jquery', 'axios'],
    vue: ['vue'],
    react: ['react', 'react-dom']
  },
  analyze: false,
  useGzip: false,
  makeZip: {
    on: false,
    name: 'rectmoon',
    sourceMap: false
  },
  commonCss: ['https://cdn.bootcss.com/animate.css/3.7.0/animate.min.css'],
  publicPath: '/',
  assetsSubDirectory: 'static'
}
