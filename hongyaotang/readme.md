- 在项目中，注意要把 babel 设置 modules: false，避免 babel 将模块转为 CommonJS 规范。引入的模块包，也必须是符合 ES6 规范，并且在最新的 webpack 中加了一条限制，即在 package.json 中定义 sideEffect: false，这也是为了避免出现 import xxx 导致模块内部的一些函数执行后影响全局环境，却被去除掉的情况。
-
-

1. common：将被多个页面同时引用的依赖包打到一个 common chunk 中。网上大部分教程是被引入两次即打入 common。我建议可以根据自己页面数量来调整，在我的工程中，我设置引入次数超过页面数量的 1/3 时，才会打入 common 包。
2. dll: 将每个页面都会引用的且基本不会改变的依赖包，如 react/react-dom 等再抽离出来，不让其他模块的变化污染 dll 库的 hash 缓存。
3. manifest: webpack 运行时(runtime)代码。每当依赖包变化，webpack 的运行时代码也会发生变化，如若不将这部分抽离开来，增加了 common 包 hash 值变化的可能性。
   4 .页面入口文件对应的 page.js
   可以使用 externals 配合 cdn 加速
   也可以使用 dll 预先打包

-
