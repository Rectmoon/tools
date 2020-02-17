import 'babel-polyfill'
import Vue from 'vue'
import App from './app.vue'
import '/assets/scss/main.scss'

new Vue({
  el: '#app',
  render: h => h(App)
})

if (module.hot) {
  module.hot.dispose(function() {
    // 模块即将被替换时
  })

  module.hot.accept(function() {
    // 模块或其依赖项之一刚刚更新时
  })
}
