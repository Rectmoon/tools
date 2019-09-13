const ENV = process.env.NODE_ENV

module.exports = ENV === 'development' ? require('./build/webpack.conifg.dev') : require('./build/webpack.conifg.prod')
