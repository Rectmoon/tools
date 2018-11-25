const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  alias: {
    '@': resolve('src'),
    '@util': resolve('src/util'),
    '@shared': resolve('src/shared'),
    '@model': resolve('src/model'),
    '@assets': resolve('src/assets')
  },
  resolve
}
