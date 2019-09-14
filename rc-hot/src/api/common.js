import Instance from './instance'

const methods = ['get', 'post', 'put', 'delete']

const o = methods.reduce((res, nextMethod) => {
  res[nextMethod] = function(url, config = {}) {
    return new Promise((resolve, reject) => {
      Instance[nextMethod](url, config)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
  return res
}, {})

export default o
