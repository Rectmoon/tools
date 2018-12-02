const mode = process.env.NODE_ENV
const { analyze, zip } = require('./build/ying.config')
const compiler = require(`./build`)

module.exports = compiler(mode, { option: { analyze, zip } })
