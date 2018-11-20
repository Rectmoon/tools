const fs = require('fs')
const getDependencies = () =>
  JSON.parse(fs.readFileSync('package.json', 'utf-8')).dependencies
const vendors = Object.keys(getDependencies())

module.exports = {
  browserify: {
    entries: 'src/main.js',
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
  dir: 'demo'
}
