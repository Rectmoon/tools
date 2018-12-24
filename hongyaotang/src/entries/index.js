import Vue from 'vue'
import router from '@/router/index/index'

import App from './index.vue'

import '@/common/rem.js'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
