const del = require('del')
const gulp = require('gulp')
const gutil = require('gulp-util')
const spritesmith = require('gulp.spritesmith')
const $ = require('gulp-load-plugins')()
const browserify = require('browserify')
const browserSync = require('browser-sync').create()
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const watchify = require('watchify')
const merge = require('merge-stream')
const uglifyjs = require('uglify-js')
const composer = require('gulp-uglify/composer')
const minify = composer(uglifyjs, console)
const pump = require('pump')
const fileinclude = require('gulp-file-include')
const es = require('event-stream')
const DEFAULT_CONFIG = require('./config')

function logError(err) {
  gutil.log(gutil.colors.red('[Error]'), err.toString())
}

function getFileName(s) {
  let i = s.lastIndexOf('\\')
  return s.slice(i + 1, s.lastIndexOf('.'))
}

function watching(entry) {
  let opts = Object.assign({}, watchify.args, DEFAULT_CONFIG.browserify, {
    entries: [entry]
  })
  let b = watchify(browserify(opts))
  b.on('update', () =>
    doBindle(entry, b).on('end', browserSync.reload.bind(browserSync))
  )
  b.on('log', console.log.bind(console))
  return b
}

function doBindle(entry, b) {
  return b
    .bundle()
    .on('error', logError)
    .pipe(source(`${getFileName(entry)}.js`))
    .pipe(buffer())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js/'))
}

function doLint(paths, exit) {
  return gulp
    .src(paths)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe(exit ? $.eslint.failAfterError() : $.eslint.result(() => {}))
}

gulp.task('clean', () => del(['dist']))
gulp.task('lint', () => doLint(['gulpfile.js', 'src/**/*.js'], true))
gulp.task('build', ['clean', 'lint'], () => {
  const tasks = DEFAULT_CONFIG.entries.map(entry => {
    return doBindle(
      entry,
      browserify({ entries: [entry], ...DEFAULT_CONFIG.browserify })
    )
  })
  return es.merge.apply(null, tasks)
})
gulp.task('watch', () => {
  browserSync.init(DEFAULT_CONFIG.browserSync)
  require('opn')(`http://localhost:8080/${DEFAULT_CONFIG.dir}/index.html`)
  let w1 = gulp.watch(['gulpfile.js', 'src/**/*.js'])
  w1.on('change', e => {
    if (e.type === 'changed' || e.type === 'added') return doLint(e.path, false)
  })

  let w2 = gulp.watch(['src/**/*.html'])
  w2.on('change', e => {
    if (e.type === 'changed' || e.type === 'added') {
      gulp.start('html', browserSync.reload)
    }
  })

  const tasks = DEFAULT_CONFIG.entries.map(entry => {
    return doBindle(entry, watching(entry)).on('end', browserSync.reload)
  })
  return es.merge.apply(null, tasks)
})

gulp.task('sprite', () => {
  const spriteData = gulp.src('src/images/*.png').pipe(
    spritesmith({
      imgName: 'sprite.png', //合并后大图的名称
      cssName: 'sprite.css',
      padding: 4, // 每个图片之间的间距，默认为0px
      cssTemplate: data => {
        // data为对象，保存合成前小图和合成打大图的信息包括小图在大图之中的信息
        let arr = [],
          {
            sprites,
            spritesheet: {
              image,
              px: { width: w, height: h }
            }
          } = data
        sprites.forEach(sprite => {
          const {
            name,
            px: { offset_x, offset_y, width, height }
          } = sprite
          arr.push(
            `.icon-${name} {
               background: url('${image}') no-repeat ${offset_x} ${offset_y};
               background-size: ${w} ${h};
               width: ${width};
               height: ${height};
             }\n`
          )
        })
        return arr.join('')
      }
    })
  )
  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe($.imagemin())
    .pipe(gulp.dest('dist'))
  const cssStream = spriteData.css.pipe($.csso()).pipe(gulp.dest('dist'))
  return merge(imgStream, cssStream)
})

gulp.task('min', ['build'], cb => {
  pump(
    [
      gulp
        .src('dist/js/*.js')
        .pipe($.rename({ extname: '.min.js' }))
        .pipe($.sourcemaps.init({ loadMaps: true })),
      minify(DEFAULT_CONFIG.minify).on('error', logError),
      $.sourcemaps.write('./'),
      gulp.dest('dist/js')
    ],
    cb
  )
})

gulp.task('html', () => {
  gulp
    .src(['src/**/*.html', '!src/include/**.html'])
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file'
      })
    )
    .pipe(gulp.dest('dist'))
})

gulp.task('style', () => {
  gulp
    .src('src/style/index.styl')
    .pipe($.sourcemaps.init())
    .pipe($.stylus().on('error', logError))
    .pipe($.postcss())
    .pipe(gulp.dest('dist'))
})

gulp.task('default', ['build'])
