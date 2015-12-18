var jr      = require('../');
var gulp    = require('gulp');

gulp.task('json-replace', function() {
    return gulp.src('app/**/*.html')
        .pipe(jr({
            file: './config.json',
            identify: '%%'
        }))
        .pipe(gulp.dest('www/'))
})
