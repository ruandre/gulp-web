/* eslint-disable no-console, no-param-reassign */

import fs from 'fs'
import path from 'path'

import gulp, { task, dest, series, parallel } from 'gulp'
import plumber from 'gulp-plumber'
import gulpIf from 'gulp-if'

import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import rollup from 'gulp-better-rollup'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { babel } from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import data from 'gulp-data'
import pug from 'gulp-pug'
import replace from 'gulp-replace'
import beautify from 'gulp-jsbeautifier'
import lec from 'gulp-line-ending-corrector'
import through2 from 'through2'
import he from 'he'

import browserSync from 'browser-sync'

const sass = gulpSass(dartSass)

const server = browserSync.create()

const src = './src'
const dist = './dist'

function copy() {
  return gulp.src(`${src}/copy/**/*`).pipe(dest(dist))
}

function css() {
  return gulp
    .src(`${src}/sass/main.scss`)
    .pipe(plumber({ errorHandler: console.error }))
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(dest(dist))
}

function js() {
  const plugins = [resolve(), commonjs(), babel(), terser()]
  return gulp
    .src(`${src}/js/bundle.js`)
    .pipe(rollup({ plugins }, 'iife'))
    .pipe(dest(dist))
}

function jsDev() {
  const opts = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['last 1 Chrome version', 'last 1 Firefox version'],
          },
        },
      ],
    ],
  }
  const plugins = [resolve(), commonjs(), babel(opts)]
  return gulp
    .src(`${src}/js/bundle.js`)
    .pipe(rollup({ plugins }, 'iife'))
    .pipe(dest(dist))
}

function html() {
  const b = true // beautify
  const e = true // encode special characters
  const i = false // inline js and css bundles
  const l = false // normalize end of line to crlf

  const config = fs.readFileSync(path.join(__dirname, 'config.json'))

  const main = fs.readFileSync(`${dist}/main.css`)
  const bundle = fs.readFileSync(`${dist}/bundle.js`)

  const encode = (file, _, cb) => {
    if (file.isBuffer()) {
      const out = he.encode(file.contents.toString(), {
        strict: true,
        allowUnsafeSymbols: true,
      })
      file.contents = Buffer.from(out)
    }
    cb(null, file)
  }

  const beautifyOpts = {
    indent_size: 2,
    editorconfig: true,
    html: {
      wrap_line_length: 0,
      extra_liners: [],
      inline: [],
      unformatted: ['script', 'style'],
    },
  }

  return gulp
    .src(`${src}/pug/*.pug`)
    .pipe(plumber({ errorHandler: console.error }))
    .pipe(data(() => JSON.parse(config)))
    .pipe(pug())
    .pipe(gulpIf(b, beautify(beautifyOpts)))
    .pipe(gulpIf(e, through2.obj(encode)))
    .pipe(gulpIf(i, replace('<!--inline-css-->', `<style>${main}</style>`)))
    .pipe(gulpIf(i, replace('<!--inline-js-->', `<script>${bundle}</script>`)))
    .pipe(gulpIf(l, lec({ verbose: true, eolc: 'CRLF', encoding: 'utf8' })))
    .pipe(dest(dist))
}

function reload(cb) {
  server.reload()
  cb()
}

function serve(cb) {
  server.init({ server: { baseDir: dist } })
  cb()
}

function watch() {
  gulp.watch('src/**/*', series(copy, parallel(css, jsDev), html, reload))
}

task('default', series(copy, parallel(css, js), html))
task('dev', series(copy, parallel(css, jsDev), html, serve, watch))
