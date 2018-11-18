// require('./lzx.pug')
import '../assets/styles/app.styl'
import $ from 'jquery'
import {
  add
} from '../assets/js/add'

console.log(add(1, 10));
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

export default {
  a: 1
}