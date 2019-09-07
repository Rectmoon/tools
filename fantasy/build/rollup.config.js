/*
 * @Author: Rectmoon
 * @Date: 2019-08-14 20:46:26
 * @Last Modified by: Rectmoon
 * @Last Modified time: 2019-09-08 06:14:07
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
  input: 'src/main.js', // 入口\
  output: {
    format: 'umd', // amd, cjs, es, iife 和 umd
    name: pkg.name, // //当format为iife 和 umd时必须提供，将作为全局变量挂在window(浏览器环境)下：window.fantasy=...
    sourcemap: true
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
