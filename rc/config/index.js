const path = require("path")

module.exports = {
  build: {
    assetsVersionMode: +new Date(),
    env: require("./prod.env"),
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    watch: !!process.env.npm_config_watch,
    bundleAnalyzerReport: process.env.npm_config_report,
    devtool: "#source-map"
  },
  dev: {
    assetsVersionMode: "hash",
    env: require("./dev.env"),
    host: "localhost",
    port: 8080,
    autoOpenBrowser: false,
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {},
    cssSourceMap: false,
    notifyOnErrors: true,
    devtool: "cheap-module-eval-source-map"
  }
}
