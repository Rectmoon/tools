import $ from 'jquery'

$(function() {
  $('#box').css({
    background: 'orange'
  })
})

if (module.hot) {
  module.hot.dispose(function() {
    // 模块即将被替换时
  })

  module.hot.accept(function() {
    // 模块或其依赖项之一刚刚更新时
  })
}
