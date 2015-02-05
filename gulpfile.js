var gulp = require('gulp'),
  minifyCSS = require('gulp-minify-css');
gulp.task('minify-css', function() {
  gulp.src('./*.css').pipe(minifyCSS({
    keepBreaks: true
  })).pipe(gulp.dest('./dist/'))
});
gulp.task('default', ['minify-css']);
