/*
 * @Author: Rectmoon
 * @Date: 2019-08-15 02:04:53
 * @Last Modified by: Rectmoon
 * @Last Modified time: 2019-08-15 05:26:11
 */

import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'

import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import pkg from '../package.json'

const NODE_ENV = process.env.NODE_ENV

export default {
  input: 'src/jq.main.js', // 入口\
  external: Object.keys(pkg.peerDependencies || {}), //有时候一些外部引用的库我们并不想一并打包在我们的库中，如：jquery，可以在配置文件中使用 external 字段来告诉rollup不要将这些库打包
  output: {
    file: 'dist/jq.main.min.js',
    format: 'umd', // amd, cjs, es, iife 和 umd
    sourcemap: true,
    name: 'ok',
    globals: {
      jquery: 'jQuery'
    }
  },
  plugins: [
    nodeResolve(),

    commonjs(),

    json(),

    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true // 配置runtime，不设置会报错
    }),

    replace({
      ENV: JSON.stringify(NODE_ENV || 'development')
    }),

    NODE_ENV === 'production' &&
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
  ]
}
