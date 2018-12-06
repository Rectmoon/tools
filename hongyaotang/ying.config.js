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
  makeZip: true
}
