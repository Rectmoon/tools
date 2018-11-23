// import Vue from 'vue'
// import Main from '@/main.vue'
// require('@/assets/styles/app.styl')

var Vue = require('vue')
var Main = require('./main.vue')

new Vue({
  el: '#lzx',
  render: function(h) {
    return h(Main)
  }
})
