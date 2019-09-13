const path = require('path')
const express = require('express')
const app = express()

const compression = require('compression')

const port = process.env.port || 3000

const config = require('./build/config')

config.gzipOn && app.use(compression())

app.use(`${config.publicPath.slice(0, -1)}`, express.static(path.join(__dirname, config.outputDir), { maxAge: '10m' }))

app.listen(port, () => {
  console.log(`Application is listening at http://localhost:${port}`)
})
