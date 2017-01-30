const babelify = require('babelify');
const browserify = require('browserify');
const CONSTS = require('./CONSTS');
const gulp = require('gulp');
const gulpIf =require('gulp-if');
const gulpLivereload = require('gulp-livereload');
const gulpNotify = require('gulp-notify');
const gulpPlumber = require('gulp-plumber');
const gulpSourcemaps = require('gulp-sourcemaps');
const gulpUglify = require('gulp-uglify');
const gulpUtil = require('gulp-util');
const vinylBuffer = require('vinyl-buffer');
const vinylSourceStream = require('vinyl-source-stream');
const watchify = require('watchify');

const isDev = (CONSTS.NODE_ENV !== 'production');

function uberBundle() {
    return Promise.resolve(CONSTS.JS);
}

CONSTS.JS.forEach(function (C) {
    let options = {
        entries:  [].concat(C.JS_ENTRY),
        cache: {},
        packageCache: {},
        transform: [babelify.configure({
            presets: ['es2015', 'stage-2']
        })]
    };
    if (isDev) {
        options.plugin = [watchify];
    }

    let b = browserify(options);

    function doLR () {
        if (process.env.OVERRIDE_LR === 'true') {
            return false;
        }
        return isDev;
    }

    function bundle() {
        return b.bundle()
        .pipe(gulpPlumber({errorHandler: gulpNotify.onError('Bundle Error: <%= error.message %>')}))
        .pipe(vinylSourceStream(C.JS_OUTPUT))
        .pipe(vinylBuffer())
        .pipe(gulpSourcemaps.init({loadMaps: true}))
        .pipe(gulpIf(!isDev, gulpUglify()))
        .pipe(gulpIf(isDev, gulpSourcemaps.write()))
        .pipe(gulp.dest(CONSTS.JS_DEST))
        .pipe(gulpIf(doLR(), gulpLivereload({
            port: CONSTS.LIVERELOAD_PORT
        })));
    }
    b.on('update', bundle);
    b.on('log', gulpUtil.log);
    b.on('error', gulpUtil.log);

    return bundle();
});

gulp.task('browserify', uberBundle);