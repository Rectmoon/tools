const path = require('path')
const express = require('express')
const app = express()

const port = process.env.port || 3000
const { outputDir } = require('./ying.config')
const webDirName = path.relative(__dirname, outputDir)
console.log(webDirName)

app.use(`/${webDirName}`, express.static(path.join(__dirname, webDirName), { maxAge: '3d' }))

app.get(`/${webDirName}/:path`, (req, res) => {
  res.sendFile(__dirname + `/${webDirName}/${req.params.path}.html`, { maxAge: '0' })
})

app.listen(port, () => {
  console.log(`app is listening at port ${port}`)
})

/**
 * from memory cache:
 * 资源直接从内存中获取，当关闭该页面时，此资源就会被内存释放掉，
 * 再次重新打开相同页面时不会出现from memory cache的情况。
 *
 * from disk cache
 * 资源从磁盘当中取出的，不会请求服务器但是此资源不会随着该页面的关闭而释放掉，
 * 因为是存在硬盘当中的，下次打开仍会from disk cache
 */
