import Vue from 'vue'
import '@/assets/styles/app.styl'
import '@/assets/styles/demo.css'
import Main from './main.vue'
console.log(123)

new Vue({
  render: h => h(Main)
}).$mount('#app')
