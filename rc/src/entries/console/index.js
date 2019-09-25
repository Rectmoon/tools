import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

ReactDOM.render(<App a="1" />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept(['./app'], () => {
    // require('./app').default
    const NextApp = require('./app').default
    ReactDOM.render(<NextApp a="1" />, document.getElementById('root'))
  })
}
