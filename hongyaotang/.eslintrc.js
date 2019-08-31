const { getLibEntries } = require('./build/utils')

const globals = {}

// eslint忽略检测的变量， 如不需要可注释
Object.keys(getLibEntries()).forEach(entry => {
  globals[entry] = true
})

module.exports = {
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true
    }
  },
  env: {
    es6: true,
    worker: true,
    node: true,
    browser: true
  },
  globals,
  rules: {
    'keyword-spacing': [
      2,
      {
        overrides: {
          if: { after: true },
          for: { after: true },
          while: { after: true },
          switch: { after: true },
          catch: { after: true }
        }
      }
    ],
    'key-spacing': [2, { beforeColon: false, afterColon: true, mode: 'strict' }],
    'arrow-spacing': 2,
    'comma-spacing': 2,
    'comma-style': 2,
    'no-var': 0,
    'no-bitwise': 0,
    'no-alert': 2,
    'no-console': 0,
    'no-debugger': 1,
    'no-unused-vars': 0,
    'no-undef': 2,
    'no-mixed-spaces-and-tabs': 2,
    quotes: [2, 'single', 'avoid-escape'],
    semi: 0,
    'semi-spacing': 2,
    'space-before-blocks': 2,
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2
  }
}
