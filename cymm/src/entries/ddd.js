import Vue from 'vue'
import Main from '@/main.vue'
require('@/assets/styles/app.styl')

new Vue({
  el: '#app',
  render: h => h(Main)
})
