import { sleep } from './utils/sleep'

console.log(1)
sleep(2).then(() => {
  console.log(333)
  console.log(343)
})

async function fn() {
  await sleep(4)
  console.log(567)
}
function f() {
  console.log(123)
}
fn()
export default {
  add: (pre, next) => pre + next
}
