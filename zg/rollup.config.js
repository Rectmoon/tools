import path from 'path'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import postcssPresetEnv from 'postcss-preset-env'
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import cssnano from 'cssnano'

const resolve = function(dir) {
  return path.join(__dirname, dir)
}

export default {
  input: resolve('src/entries/index.js'),
  output: {
    file: resolve('dist/js/index.js'),
    format: 'iife',
    name: 'test'
  },
  watch: {
    include: 'src/**',
    exclude: 'node_modules/**'
  },
  plugins: [
    commonjs(),

    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),

    nodeResolve(),

    json(),

    postcss({
      extract: resolve('dist/css/bundle.css'),
      extensions: ['.css'],
      plugins: [
        simplevars(),
        nested(),
        postcssPresetEnv({ browsers: 'last 2 versions' }),
        cssnano()
      ]
    })
  ]
}
