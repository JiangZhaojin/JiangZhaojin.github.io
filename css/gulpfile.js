var gulp = require('gulp');

var sass = require('gulp-sass');

gulp.task('sass', function(){
	gulp.src('./sass/main.scss')
	    .pipe(sass())
	    .pipe(gulp.dest('./'));
});

gulp.task('default', function(){
	gulp.run('sass');
	gulp.watch('./sass/*.scss', function(){
		gulp.run('sass');
	});
});