const path = require('path')
const express = require('express')
const app = express()

const compression = require('compression')

const port = process.env.port || 3000

const { gzipOn, publicPath, outputDir } = require('./build/config')

gzipOn && app.use(compression())

app.use(`${publicPath.slice(0, -1)}`, express.static(path.join(__dirname, outputDir), { maxAge: '10m' }))

app.get(`${publicPath}:path`, (req, res) => {
  res.sendFile(__dirname + `/${outputDir}/${req.params.path}.html`, { maxAge: '0' })
})

app.listen(port, () => {
  console.log(`Application is listening at http://localhost:${port}`)
})
