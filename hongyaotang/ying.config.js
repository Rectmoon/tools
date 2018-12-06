module.exports = {
  useExternals: false,
  useDll: true,
  extractEntries: {
    vue: ['vue', 'vue-router', 'vuex'],
    react: ['react', 'react-dom'],
    vendor: ['jquery', 'axios']
  },
  analyze: false,
  useGzip: false,
  makeZip: {
    on: true,
    name: 'reactmoon',
    sourceMap: false
  },
  assetsToInclude: [
    {
      path: 'https://cdn.bootcss.com/animate.css/3.7.0/animate.min.css',
      type: 'css'
    }
  ]
}
