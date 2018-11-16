const path = require('path')
const webpack = require('webpack')
const DllPlugin = require('webpack/lib/DllPlugin')

module.exports = {
  mode: 'production',
  // 入口文件
  entry: {
    // 项目中用到该依赖库文件
    vendors: ['vue/dist/vue.esm.js', 'vue', 'vuex', 'vue-router'],
    echarts: ['echarts']
  },
  // 输出文件
  output: {
    // 文件名称
    filename: '[name].dll.[chunkhash:6].js',
    // 将输出的文件放到dist目录下
    path: path.resolve(__dirname, './dist/lib'),

    /*
     存放相关的dll文件的全局变量名称，比如对于jquery来说的话就是 _dll_jquery, 在前面加 _dll
     是为了防止全局变量冲突。
    */
    library: '_dll_[name]'
  },
  plugins: [
    new DllPlugin({
      name: '_dll_[name]',
      /* 生成manifest文件输出的位置和文件名称 */
      path: path.join(__dirname, './dist/manifest/[name].manifest.json')
    })
  ]
}
