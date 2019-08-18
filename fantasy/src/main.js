import sleep from './ok'

export default function s(ms) {
  sleep(3).then(res => {
    console.log(1)
  })
}

export function* foo() {}
