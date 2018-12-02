if (process.env == 'development') require('raw-loader!./main.html')

import '@/assets/styles/main.css'

const add = (pre, next) => pre + next

const sleep = t => new Promise(resolve => setTimeout(resolve, t * 1000))

async function main() {
  console.log(2)
  await sleep(5)
  console.log(10)
}

console.log(234)
main()
