export function pickOpts(obj, arr) {
  return arr.reduce((res, next) => {
    res[next] = obj[next]
    return res
  }, {})
}
