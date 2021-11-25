var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('default', function () {
    return gulp.src(['js/**/*.js',
        ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('js'));
});