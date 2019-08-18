import Vue from 'vue'
import router from '@/router/index/index'
// import axios from 'axios'
// import Vuex from 'vuex'
import App from './index.vue'

import '@/common/rem.js'
import '@/assets/styles/reset.css'

Promise.resolve(1).then(() => {
  console.log(2)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
