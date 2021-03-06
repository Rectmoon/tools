const { publicPath, assetsSubDirectory } = require('./ying.config')

module.exports = {
  plugins: {
    'postcss-preset-env': {
      browsers: ['last 5 version', 'Android >= 4.0'],
      //是否美化属性值 默认：true
      cascade: true,
      //是否去掉不必要的前缀 默认：true
      remove: true,
      stage: 3,
      features: {
        'color-mod-function': { unresolved: 'warn' }
      }
    },
    'postcss-import': {}, //遵循@import规则，可以将导入的样式合并到你的主样式表中。
    cssnano: {}, //相同css合并（例：.a{width:100px},.b{width:100px} => .a,.b{width:100px})
    'postcss-sprites': {
      spritePath: `${publicPath}${assetsSubDirectory}/images`
    },
    'postcss-pxtorem': {
      rootValue: 50,
      unitPrecision: 5,
      propWhiteList: [],
      selectorBlackList: [/header$/, /footer$/, '.ignore', '.vux-', '.weui-', '.mt-', '.mint-']
    }
  }
}
