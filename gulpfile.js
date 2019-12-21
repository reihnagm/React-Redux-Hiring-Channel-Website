const gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass')

gulp.task('styles', function () {
    gulp.src('public/assets-dev/css/**/*')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(concat('App.css'))
        .pipe(gulp.dest('src'))
})

gulp.task('watch', function () {
    gulp.watch('public/assets-dev/css/**/*', gulp.parallel('styles'))
})

gulp.task('default', gulp.parallel('styles', 'watch'));
