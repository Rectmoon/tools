import { sleep } from './utils/sleep'

console.log(1)
sleep(2).then(() => {
  console.log(333)
  console.log(343)
})

function f() {
  console.log(123)
}

export default {
  add: (pre, next) => pre + next
}
