import Instance from './instance'

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    Instance.get(url, {
      params: params
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    Instance.post(url, data).then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      }
    )
  })
}
