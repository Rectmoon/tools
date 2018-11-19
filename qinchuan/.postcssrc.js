module.exports = {
  plugins: {
    'postcss-cssnext': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'color-mod-function': { unresolved: 'warn' }
      }
    },
    'postcss-import': {}, //遵循@import规则，可以将导入的样式合并到你的主样式表中。
    cssnano: {
      // preset: 'advanced',
      // 'postcss-zindex': false
    } //相同css合并（例：.a{width:100px},.b{width:100px} => .a,.b{width:100px}）
  }
}
