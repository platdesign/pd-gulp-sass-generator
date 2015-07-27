'use strict';

var createGenerator = require('pd-gulp-task-generator-generator');

var watch = require('gulp-watch');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');



module.exports = createGenerator('Sass', function() {

	this.watchStarter(function(job, compile) {
		watch(job.config.watch===true ? job.config.src : job.config.watch, function() {
			compile(job);
		});
		livereload.listen();
	});

	this.compile(function(job, cb) {

		return this.gulp.src(job.config.src)
			.pipe( plumber({
				errorHandler: function(err) {
					cb(err);
					this.emit('end');
				}
			}) )

			.pipe( sass( job.config.sass || {} ) )
			.on('error', cb)
			.pipe( autoprefixer( job.config.autoprefixer || 'last 3 versions', '> 1%', 'ie 8') )
			.on('error', cb)
			.pipe( job.config.minify ? minifyCss(job.config.minify) : gutil.noop())
			.on('error', cb)
			.pipe( this.plugin('banner', job.options) )
			.on('error', cb)
			.pipe( this.gulp.dest( job.config.dest ) )
			.on('error', cb)
			.on('end', cb)
			.pipe( job.config.livereload ? livereload(job.config.livereload) : gutil.noop() )
			.on('error', cb)
			.on('end', cb);


	});

	this.appendTask('default', {
		sass:{
			outputStyle: 'nested'
		}
	});

	this.appendTask('build', {
		sass:{
			outputStyle: 'nested'
		},
		minify: {
			processImport: true
		}
	});

	this.appendTask('watch', {
		sass:{
			outputStyle: 'nested'
		},
		watch:true,
		livereload: true
	});

});








