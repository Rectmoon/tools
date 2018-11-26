const fs = require('fs')
const path = require('path')

const getDependencies = () =>
  JSON.parse(fs.readFileSync('package.json', 'utf-8')).dependencies
const vendors = Object.keys(getDependencies())

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

function getFiles(dir) {
  try {
    return fs.readdirSync(dir)
  } catch (e) {
    return []
  }
}

const entryDir = resolve('src/entries')
const entries = getFiles(entryDir)
  .filter(f => /\.js$/.test(f))
  .reduce((res, next) => {
    res.push(resolve(`${entryDir}/${next}`))
    return res
  }, [])

module.exports = {
  entries,
  browserify: {
    debug: true,
    external: vendors,
    plugin: [
      'browserify-derequire',
      [
        'standalonify',
        {
          name: 'ly',
          deps: {
            jquery: 'jQuery',
            lodash: '_'
          }
        }
      ]
    ],
    transform: [
      [
        'babelify',
        {
          babelrc: true,
          presets: [['@babel/preset-env']],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                corejs: false,
                helpers: true,
                regenerator: true,
                useESModules: false
              }
            ]
          ]
        }
      ],
      'browserify-versionify'
    ]
  },
  browserSync: {
    files: ['**'],
    server: {
      baseDir: './'
    },
    port: 8080,
    open: false
  },
  minify: {
    toplevel: true,
    mangle: true,
    compress: {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true
    },
    output: {
      beautify: false,
      preamble: '/* fantasy */'
    },
    sourceMap: { filename: 'bundle.js', url: 'bundle.js.map' }
  },
  dir: 'dist'
}
