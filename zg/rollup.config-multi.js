import glob from 'glob'
import path from 'path'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import postcssPresetEnv from 'postcss-preset-env'
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import cssnano from 'cssnano'

const isProd = process.env.NODE_ENV === 'production'

const resolve = function(dir) {
  return path.join(__dirname, dir)
}

const commonPlugins = [
  commonjs(),

  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true
  }),

  nodeResolve(),

  json(),

  isProd &&
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
]

function getEntries() {
  const entryDir = resolve('src/entries')
  const entries = glob.sync(`${entryDir}/**/*.js`)

  return entries.map(entry => {
    const p = path.relative(entryDir, entry).split(path.sep)
    const name = p.slice(-1)[0].split('.')[0]

    const plugins = [
      ...commonPlugins,
      postcss({
        extract: `dist/css/${p.join('/').replace('.js', '.css')}`,
        extensions: ['.css'],
        plugins: [
          simplevars(),
          nested(),
          postcssPresetEnv({ browsers: 'last 2 versions' }),
          cssnano()
        ]
      })
    ]

    return {
      input: entry,
      output: {
        file: `dist/js/${p.join('/')}`,
        format: 'iife',
        name,
        sourcemap: isProd
      },
      watch: {
        include: 'src/**',
        exclude: 'node_modules/**'
      },
      plugins
    }
  })
}

export default getEntries()
