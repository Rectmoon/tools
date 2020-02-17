// require('/helpers/hot.js')(module)
import '/assets/scss/main.scss'

function init() {
  console.log('hello')
  console.log('hello')
}

init()

if (mod.hot) {
  mod.hot.dispose(function() {
    // 模块即将被替换时
  })

  mod.hot.accept(function() {
    // 模块或其依赖项之一刚刚更新时
  })
}
