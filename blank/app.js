const express = require('express')
const path = require('path')
const app = express()
const proxy = require('http-proxy-middleware')
const compression = require('compression')

app.use(compression())
app.use('/test', express.static(path.join(__dirname, 'dist')))
app.use('/static', express.static(path.join(__dirname, '/dist/static')))
app.use(
  proxy('/kkk', {
    target: 'http://IP:Port',
    changeOrigin: true
  })
)

app.listen(3000, () => {
  console.log(`server running at http://localhost:3000`)
})
