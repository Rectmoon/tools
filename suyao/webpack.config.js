const env = process.env.ENVIROMENT.trim()
const option = process.env.OPTION ? process.env.OPTION.trim() : ''
const compiler = require(`./build/webpack.config.${env}`)

module.exports = compiler(env, { option })
