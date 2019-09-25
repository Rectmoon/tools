const ENV = process.env.NODE_ENV

module.exports = ENV === 'development' ? require('./build/webpack.config.dev') : require('./build/webpack.config.prod')
