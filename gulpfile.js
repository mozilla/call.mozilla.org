var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var webserver = require('gulp-webserver');

gulp.task('minify-css', function() {
  gulp.src('./*.css').pipe(minifyCSS({
    keepBreaks: true
  })).pipe(gulp.dest('./dist/'))
});

// Watch
gulp.task('watch', ['minify-css'], function() {
  gulp.watch([
    './*.css',
    './*.html',
    './*.js',
  ], ['minify-css']);
});

gulp.task('default', ['minify-css']);
// Serve + Watch
gulp.task('dev', ['watch'], function() {
  gulp.src('.').pipe(webserver({
    livereload: true,
    fallback: 'index.html'
  }));
});
