require('babel-polyfill')
// require('@/assets/styles/app.styl')
import $ from 'jquery'
import Vue from 'vue'
import { add } from '../assets/js/add'
import store from '../lzx/a'

console.log(add(1, 10))

const sleep = t => new Promise(resolve => setTimeout(resolve, t * 1000))

async function fn() {
  await sleep(4)
  console.log(9)
}

fn()
const o = {
  a: 1,
  b: {
    c: 3
  },
  jssss: 'ok'
}

let j = $.extend(true, {}, o)

console.log(j)
console.log(1)
console.log(3)
console.log(2)

const a = 123

export default new Vue({
  store,
  el: '#app',
  render: h => h('h1', 'hello world')
})
