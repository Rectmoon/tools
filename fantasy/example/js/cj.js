;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('jquery')))
    : typeof define === 'function' && define.amd
    ? define(['jquery'], factory)
    : ((global = global || self), (global.ok = factory(global.jQuery)))
})(this, function($) {
  'use strict'

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $

  var version = '1.0.0'

  var Demo =
    /*#__PURE__*/
    (function() {
      function Demo() {
        this.version = version
        this.init()
      }

      var _proto = Demo.prototype

      _proto.init = function init() {
        console.log($.extend)
      }

      return Demo
    })()

  return Demo
})
//# sourceMappingURL=jq.main.min.js.map
