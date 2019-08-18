const { NODE_ENV, BABEL_ENV } = process.env
const cjs = NODE_ENV === 'test' || BABEL_ENV === 'commonjs'
const loose = true

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose,
        modules: false
        /**
         * 设置loose为true 的优点在于兼容旧引擎，可能会更加快，而且编译后的代码更加像是人手写的
         * 缺点在于如果我们需要将转换之后的代码重新转换为 native ES6 代码，可能会遇到问题
         */
        /**  false
         *   var person =
        /*#__PURE__*/
        /*   function () {
          function person() {
            _classCallCheck(this, person);
          }

          _createClass(person, [{
            key: "constractor",
            value: function constractor(name, age) {
              this.name = name;
              this.age = age;
            }
          }, {
            key: "getName",
            value: function getName() {
              return this.name;
            }
          }, {
            key: "getAge",
            value: function getAge() {
              return this.age;
            }
          }]);

          return person;
        }(); */
        /* loose: true    
        var person =
        function () {
          function person() {}
      
          var _proto = person.prototype;
      
          _proto.constractor = function constractor(name, age) {
            this.name = name;
            this.age = age;
          };
      
          _proto.getName = function getName() {
            return this.name;
          };
      
          _proto.getAge = function getAge() {
            return this.age;
          };
      
          return person;
        }(); */
        // modules: false
        // useBuiltIns: 'entry',
        // useBuiltIns: 'false',
        // corejs: 3
        /**
         * useBuiltIns: "usage" | "entry" | false, defaults to false
         * false => 只做语法转换
         * "usage" => 不需要任何处理, babel会自动检测代码中用到的功能并自动引入模块
         * "entry" => 需要在入口手动引入core-js 对应的模块 || (
         *  import 'core-js/stable'
         *  import 'regenerator-runtime/runtime'
         *)
         *
         * Babel > 7.4.0  =>  import @babel/polyfill === (
         *     import 'core-js/stable'
         *     import 'regenerator-runtime/runtime'
         * )
         */
      }
    ]
  ],
  plugins: [
    [
      '@babel/transform-runtime',
      {
        helpers: true,
        useESModules: !cjs,
        corejs: 3 // corejs: { version: 3, proposals: true }
        /** false => @babel/runtime
         *  2 => @babel/runtime-corejs2
         *  3 => @babel/runtime-corejs3
         */
      }
    ],
    cjs && ['@babel/transform-modules-commonjs', { loose }]
    /**
     *  @babel/runtime一般应用于两种场景：
     * 1. 开发类库/工具（生成不污染全局空间和内置对象原型的代码）
     * 2. 借助 @babel/runtime 中帮助函数（helper function如 @babel/runtime-corejs2/helpers/classCallCheck）移除冗余工具函数
     *
     */
  ].filter(Boolean)
}
