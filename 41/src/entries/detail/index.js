console.log(1)

new Vue({
  el: '#app',
  created() {
    console.log(222)
  },
  render(h) {
    return h('span', 'hello')
  }
})
