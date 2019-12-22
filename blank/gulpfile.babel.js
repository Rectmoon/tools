import path from 'path'
import gulp from 'gulp'
import vlss from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import { pipeline } from 'readable-stream'

import gulpFileInclude from 'gulp-file-include'
import rev from 'gulp-rev'
import revCollector from 'gulp-rev-collector'

import cleanCSS from 'gulp-clean-css'
import gulpLess from 'gulp-less'
import cssmin from 'gulp-cssmin'
import autoprefixer from 'gulp-autoprefixer'

import browserify from 'browserify'

import es from 'event-stream'
import glob from 'glob'
import uglify from 'gulp-uglify'

import gzip from 'gulp-gzip'

import rename from 'gulp-rename'

import watchify from 'watchify'
import gulpConnect from 'gulp-connect'
import proxy from 'http-proxy-middleware'

const resolve = dir => path.join(__dirname, dir)

function getEntries() {
  const entryDir = resolve('src/entries')
  const entries = glob.sync(`${entryDir}/**/index.js`)
  return entries.map(entry =>
    path
      .relative(__dirname, entry)
      .split(path.sep)
      .join('/')
  )
}

const paths = {
  views: {
    src: ['src/views/**/*.html', '!src/views/include/**/*.html'],
    dest: 'tmp'
  },
  css: {
    src: 'src/styles/**/*.css',
    dest: 'tmp/static/stylesheets/'
  },
  less: {
    src: 'src/styles/**/*.less',
    dest: 'tmp/static/stylesheets/'
  },
  bundle: {
    src: getEntries(),
    dest: 'tmp/static/js'
  },
  srcStatic: {
    src: 'src/static/**/*',
    dest: 'tmp/static'
  },
  tmpStatic: {
    src: ['tmp/static/**/*'],
    dest: 'dist/static'
  },
  server: {
    root: 'tmp'
  }
}

const isDev = process.env.NODE_ENV === 'dev'

function watch() {
  gulp.watch(paths.css.src, css)
  gulp.watch(paths.less.src, less)
  gulp.watch(paths.views.src, html)

  const browserifyMap = paths.bundle.src.reduce((res, next) => {
    const filename = next
      .split('/')
      .slice(2, -1)
      .join('/')
    const b = browserify({ entries: [next], cache: {}, packageCache: {}, debug: true })
    b.vlssName = filename
    res[filename] = b
    return res
  }, {})

  const devBundle = (b, e) => {
    e &&
      console.log(
        `${path
          .relative(__dirname, e[0])
          .split(path.sep)
          .join('/')}正在编译`
      )

    return pipeline.apply(null, [
      b
        .transform('babelify', { presets: ['@babel/env'] })
        .bundle()
        .on('error', () => console.log('Browserify Error')),
      vlss(`${b.vlssName}.js`),
      buffer(),
      gulp.dest(paths.bundle.dest),
      gulpConnect.reload()
    ])
  }

  Object.keys(browserifyMap).forEach(key => {
    const watcher = watchify(browserifyMap[key])
    watcher.on('update', e => devBundle(browserifyMap[key], e))
    devBundle(browserifyMap[key])
  })
}

/** dev */
export const serve = () => {
  gulpConnect.server({
    root: paths.server.root,
    livereload: true,
    port: 9909,
    middleware: function() {
      return [
        proxy('/api', {
          target: 'http://localhost:8080',
          changeOrigin: true
        }),
        proxy('/kkk', {
          target: 'http://IP:Port',
          changeOrigin: true
        })
      ]
    }
  })
  watch()
}

/** build */
export const revHtml = () =>
  pipeline.apply(null, [
    gulp.src(['rev/**/*.json', 'tmp/**/*.html']),
    revCollector({
      replaceReved: true
    }),
    gulp.dest('dist')
  ])

export const jsmin = done => {
  var tasks = paths.bundle.src.map(function(entry) {
    const filename = entry
      .split('/')
      .slice(2, -1)
      .join('/')

    return pipeline.apply(
      null,
      [
        browserify({
          entries: [entry]
        })
          .transform('babelify', { presets: ['@babel/env'] })
          .bundle()
          .on('error', () => console.log('Browserify Error')),
        vlss(`${filename}.js`),
        buffer()
      ]
        .concat(
          isDev
            ? [gulp.dest(paths.bundle.dest), gulpConnect.reload()]
            : [uglify(), rev(), gulp.dest(paths.bundle.dest), rev.manifest(), gulp.dest(`rev/js/${filename}`)]
        )
        .filter(Boolean)
    )
  })
  done()
  return es.merge.apply(null, tasks)
}

/** common */
export const html = () =>
  pipeline.apply(
    null,
    [
      gulp.src(paths.views.src),
      gulpFileInclude({
        prefix: '@@',
        basepath: '@file',
        context: {
          env: process.env.NODE_ENV
        }
      }),
      gulp.dest(paths.views.dest),
      isDev && gulpConnect.reload()
    ].filter(Boolean)
  )

export const css = () =>
  pipeline.apply(
    null,
    [
      gulp.src(paths.css.src),
      autoprefixer({
        cascade: true
      }),
      cleanCSS()
    ]
      .concat(
        isDev
          ? [gulp.dest(paths.css.dest), gulpConnect.reload()]
          : [cssmin(), rev(), gulp.dest(paths.css.dest), rev.manifest(), gulp.dest(`rev/css`)]
      )
      .filter(Boolean)
  )

export const less = () =>
  pipeline.apply(
    null,
    [
      gulp.src(paths.less.src),
      gulpLess(),
      autoprefixer({
        cascade: true
      }),
      cleanCSS(),
      rename({ extname: '.less.css' })
    ]
      .concat(
        isDev
          ? [gulp.dest(paths.less.dest), gulpConnect.reload()]
          : [cssmin(), rev(), gulp.dest(paths.less.dest), rev.manifest(), gulp.dest(`rev/less`)]
      )
      .filter(Boolean)
  )

export const styles = gulp.series(gulp.parallel(css, less))

export const copySrcStatic = () =>
  pipeline.apply(null, [gulp.src(paths.srcStatic.src), gulp.dest(paths.srcStatic.dest)])

export const copyTmpStatic = () =>
  pipeline.apply(null, [gulp.src(paths.tmpStatic.src), gulp.dest(paths.tmpStatic.dest)])

export const copy = () => pipeline.apply(null, [gulp.src(['tmp/**/*']), gulp.dest('dist')])

export const gz = () =>
  gulp
    .src(paths.tmpStatic.src)
    .pipe(gzip())
    .pipe(gulp.dest(`${paths.tmpStatic.dest}`))

const run = gulp.series.apply(
  null,
  [html, copySrcStatic, jsmin, styles]
    .concat(isDev ? [serve] : [copy, revHtml, copyTmpStatic, process.env.npm_config_gz && gz])
    .filter(Boolean)
)

export default run
