const path = require('path')
const express = require('express')
const app = express()

app.use(
  express.static(path.join(__dirname, 'dist'), {
    maxage: 0
  })
)

app.use('*', (req, res, next) => {
  res.end('404')
})

app.listen(3000, () => {
  console.log('app is listening at port 3000')
})
