// export default class Person {}

import a1 from './js/importa'
import b1 from './js/requireb'

export default function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
      a1()
      new b1()
    }, ms)
  })
}
