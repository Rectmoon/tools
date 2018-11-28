module.exports = {
  useExternals: true,
  extractEntries: {
    vue: ['vue', 'vue-router', 'vuex'],
    react: ['react', 'react-dom'],
    vendor: ['jquery', 'axios']
  }
}
