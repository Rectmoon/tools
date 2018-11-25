import Vue from 'vue'

import Home from '@/page/index.vue'

function fn() {
  console.log(123)
}

new Vue({
  render: h => h(Home)
}).$mount('#app')
