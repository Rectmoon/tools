const mode = process.env.NODE_ENV.trim()
const analyze = process.env.npm_config_report
const zip = process.env.npm_config_zip

const compiler = require(`./build`)

module.exports = compiler(mode, { option: { analyze, zip } })
