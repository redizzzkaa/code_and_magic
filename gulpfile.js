var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();


gulp.task('less', function() {
    return gulp.src('less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('csss'))
    .pipe(browserSync.stream())
});

gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: './'
        },
        open: true,
		notify: false,
		browser: "chrome"
    })
});

gulp.task('watch', gulp.parallel('browserSync', 'less', function() {
	//gulp.watch('less/**/*.less', ['less']);
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
    
}));