const path = require('path')
const axios = require('axios')
const { entryJs } = require('./utils')

const apiList = [
  {
    path: '/api/getDiscList',
    remote: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  },
  {
    path: '/api/getSongList',
    remote: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  }
]

const data1 = require('../src/mock/data.json')

module.exports = {
  proxy: {},
  before(app) {
    apiList.forEach(api => {
      app.get(api.path, (req, res) => {
        axios
          .get(api.remote, {
            headers: {
              referer: 'https://c.y.qq.com/',
              host: 'c.y.qq.com'
            },
            params: req.query
          })
          .then(response => {
            res.json(response.data)
          })
          .catch(e => {
            console.log(e)
          })
      })
    })
    app.get('/api/data1', (req, res) => {
      res.json(data1)
    })
    app.post('/api/data1', (req, res) => {
      res.json({
        err: 0,
        msg: 'success'
      })
    })
  },
  after(app) {},
  hot: true,
  contentBase: false,
  compress: true,
  host: process.env.HOST || 'localhost',
  port: (process.env.PORT && Number(process.env.PORT)) || 9000,
  open: true,
  overlay: { warnings: false, errors: true },
  quiet: true,
  watchOptions: {
    poll: false
  },
  publicPath: '/',
  historyApiFallback: {
    rewrites: entryJs
      .map(entry => {
        const route = entry.split('.')[0]
        return {
          from: new RegExp(`^/${route}$`),
          to: `/${route}.html`
        }
      })
      .concat([
        {
          from: /.*/,
          to: path.posix.join('/', 'index.html')
        }
      ])
  },
  clientLogLevel: 'warning'
}
