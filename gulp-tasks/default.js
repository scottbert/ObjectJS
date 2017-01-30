'use strict';
const gulp = require('gulp');

gulp.task('default', ['server']);

gulp.task('local', () => {
    gulp.start('clean', 'eslint');
});

gulp.task('build', ['clean', 'copy', /*'test',*/ 'sass', 'browserify']);
