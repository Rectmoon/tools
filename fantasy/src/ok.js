// export default class Person {}

import a1 from './js/importa'
import b1 from './js/requireb'

a1()
new b1()

export default function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms * 1000)
  })
}
