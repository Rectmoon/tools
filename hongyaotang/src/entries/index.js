import Vue from 'vue'
import axios from 'axios'
import router from '@/router/index/index'

import App from './index.vue'

import '@/common/rem.js'
import '@/assets/styles/reset.css'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
