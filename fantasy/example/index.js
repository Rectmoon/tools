// import 'core-js/stable'

// import 'core-js/modules/es.string.pad-start'
// import 'core-js/modules/es.string.pad-end'
// import 'regenerator-runtime/runtime'

// function EventBus() {
//   this.handlers = {}
// }

// EventBus.prototype = {
//   constructor: EventBus,

//   on: function(type, fn) {
//     var a = this.handlers[type] || []
//     a.push(fn)
//     this.handlers[type] = a
//     return this
//   },

//   off: function(type, fn) {
//     if (!fn) {
//       this.handlers[type] = []
//     } else {
//       if (fn instanceof Array) {
//         for (var i = 0, len = fn.length; i < len; i++) this.off(type, fn[i])
//       } else {
//         var a = this.handlers[type] || []
//         for (var i = 0, len = a.length; i < len; i++) if (a[i] === fn) break
//         a.splice(i, 1)
//       }
//     }
//     return this
//   },

//   once: function(type, fn) {
//     var z = this
//     var f = function() {
//       fn.apply(z, arguments)
//       z.off(type, f)
//     }
//     this.on(type, f)
//     return this
//   },

//   emit: function(type) {
//     var a = this.handlers[type] || []
//     var args = Array.prototype.slice.call(arguments, 1)
//     for (var i = 0, len = a.length; i < len; i++)
//       typeof a[i] === 'function' && a[i].apply(this, args)
//     return this
//   },

//   fire: function(event) {
//     if (!event.target) event.target = this
//     var a = this.handlers[event.type] || []
//     for (var i = 0, len = a.length; i < len; i++) {
//       typeof a[i] === 'function' && a[i](event)
//     }
//   }
// }

// export default EventBus

// export default class Person {}

// const foo = (a, i) => a.includes(i)

// export default foo

// const foo = function() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(1)
//     }, 300)
//   })
// }
// export default foo

// const path = require('path')

// export default function getDefaultAdapter() {
//   var adapter
//   // Only Node.JS has a process variable that is of [[Class]] process
//   if (
//     typeof process !== 'undefined' &&
//     Object.prototype.toString.call(process) === '[object process]'
//   ) {
//     // For node use HTTP adapter
//     const path = require('path')
//     adapter = function(dir) {
//       console.log(111)
//       return path.resolve(__dirname, '', dir)
//     }
//   } else if (typeof XMLHttpRequest !== 'undefined') {
//     // For browsers use XHR adapter
//     adapter = function() {
//       return 'ok'
//     }
//   }
//   return adapter
// }

// export default () => `es8`.padStart(2)

// export default class person {
//   constractor(name, age) {
//     this.name = name
//     this.age = age
//   }
//   getName() {
//     return this.name
//   }
//   getAge() {
//     return this.age
//   }
// }

fantasy()
