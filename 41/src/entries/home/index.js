if (process.env.NODE_ENV == 'development') require('raw-loader!./index.html')

import '@/styles/reset.styl'
import '@/styles/home.styl'
import $ from 'jquery'
import BScroll from 'better-scroll'

$(() => {
  const ctr = $('#ctr')
  const bsi = new BScroll('#i', {
    probeType: 2,
    scrollY: true
  })
  bsi.on('scrollStart', onScroll)
  bsi.on('touchEnd', e => {})
  bsi.on('scrollEnd', e => {})

  initTouch(ctr)

  function initTouch(el) {
    el.on('touchstart', e => {
      var touch = e.originalEvent,
        startX = touch.changedTouches[0].pageX,
        startY = touch.changedTouches[0].pageY
      el.on('touchmove', e => {
        if (e.cancelable && !e.defaultPrevented) e.preventDefault()
        touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]
        var disy = touch.pageY - startY
        if (disy > 10) {
          $('.content').removeClass('top')
          setTimeout(() => {
            bsi.enable()
          }, 300)
        } else if (disy < -10) {
          $('.content').addClass('top')
          setTimeout(() => {
            bsi.enable()
          }, 300)
        }
      })
      return false
    }).on('touchend', () => {
      el.off('touchmove')
    })
  }

  function onScroll(e) {
    const flag = $('.content').hasClass('top')
    const direc = bsi.movingDirectionY
    if ((flag && direc < 0) || (!flag && direc > 0)) bsi.disable()
    else bsi.enable()

    if (direc >= 0) {
      $('.content').addClass('top')
      setTimeout(() => {
        bsi.enable()
      }, 300)
    } else {
      $('.content').removeClass('top')
      setTimeout(() => {
        bsi.enable()
      }, 300)
    }
  }
})
