'use strict';

var gulp = require('gulp');

var concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	runsequence = require('gulp-run-sequence'),
	gutil = require('gulp-util');
 


gulp.task('test', function() {
	//return runsequence(['testserver', 'testclient']);
	return runsequence(['testclient']);
});


gulp.task('testclient', function (done) {
	var Server = require('karma').Server;

	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: false
	}, done).start();
});


// gulp.task('testserver', function (done) {
// 	var jasmine = require('gulp-jasmine');
// 	return gulp.src('server/**/*.test.js')
//      .pipe(jasmine());
// });


gulp.task('clean', function() {
	var del = require('del');
	return del('build');
});


gulp.task('ngtemplates', function () {

	var templateCache = require('gulp-angular-templatecache');
	var minifier = require('gulp-minify-html');

	return gulp.src('app/**/*.htm')
	//.pipe(minifier())
	.pipe(templateCache({ 
		module : 'app'
	}))
	.pipe(gulp.dest('build'));
});


gulp.task('js', function() {

	var babelify = require("babelify");
	var browserify = require('browserify');
	var source = require('vinyl-source-stream');
	var buffer = require('vinyl-buffer');

	var b = browserify({
		entries: [
			'./app/app.module.js',
			'./build/templates.js'
		],
		extensions: ['.js'],
        paths: [
        	'./node_modules',
	        './app/'
	    ],
	    debug : true
	});

	return b.transform(
		babelify.configure({
		  only: './app/'
	}))
	.bundle()
	.on('error', handleErrors)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/'));

});

gulp.task('js_minimize', function() {
	return gulp.src([
		'./build/app.js'
	])
	.pipe(uglify())
    .on('error', gutil.log)
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./build/'));
});



gulp.task('jshint', function() {

	var jshint = require('gulp-jshint');

	return gulp.src([
		'./app/**/*.js',
		'!./assets/vendor/**/*.js',
		'./build/templates.js'
	])
	.pipe(jshint({ node: true,  esnext: true}))
	.pipe(jshint.reporter('default'));
});


gulp.task('sass', function () {

	var sass = require('gulp-sass'),
		minifyCss = require('gulp-minify-css');

	gulp.src('./assets/sass/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(concat('style.css'))
	.pipe(gulp.dest('./build'))
	.pipe(minifyCss())
	.pipe(rename('style.min.css'))
	.pipe(gulp.dest('./build'));

});

function swallowError(err) {
	console.log(err.toString());
	 this.emit('end');
}



gulp.task('watch', function() {
	gulp.watch('./assets/sass/**/*.scss', ['sass']).on('error', swallowError);
	gulp.watch('./app/**/*.htm', ['ngtemplates', ['js']]).on('error', swallowError);
	gulp.watch('./app/**/*.js', ['jshint', 'js', ['js_minimize']]).on('error', swallowError);

	//runsequence(['sass', 'ngtemplates'], 'jshint', 'js');
});


gulp.task('gzip', function() {

	var gzip = require('gulp-gzip');

	gulp.src([
		'./build/app.js',
		'./build/style.min.css',
	])
	.pipe(gzip())
    .pipe(gulp.dest('./build'));

});


gulp.task('build', function() {
	runsequence('test', 'clean', ['sass', 'ngtemplates'], 'buildjs', 'gzip');
});


function handleErrors() {

	var notify = require('gulp-notify');

	var args = Array.prototype.slice.call(arguments);

	// Send error to notification center with gulp-notify
	notify.onError({
		title: "Compile Error",
		message: "<%= error.message %>"
	}).apply(this, args);

	// Keep gulp from hanging on this task
	this.emit('end');
};