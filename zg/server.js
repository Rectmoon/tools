const liveServer = require('live-server')

const m1 = (req, res, next) => {
  next()
}

const params = {
  port: 9000, // Set the server port. Defaults to 8080.
  host: 'localhost', // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: 'dist', // Set root directory that's being served. Defaults to cwd.
  open: false, // When false, it won't load your browser by default.
  ignore: 'scss,my/templates', // comma-separated string for paths to ignore
  file: 'index.html', // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  wait: 500, // Waits for all changes, before reloading. Defaults to 0 sec.
  logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
  middleware: [m1],
  proxy: [['/api', 'http://aa.bb.cc.dd:80']]
}

liveServer.start(params)
